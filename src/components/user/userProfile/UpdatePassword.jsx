import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../../middlewares/authContext";
import { useNotifications } from "@/hooks/useNotifications";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

function EyeIcon({ hidden = false }) {
  // Eye when visible=false, Eye-off when visible=true
  if (hidden) {
    // Eye-off
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M3 3l18 18" />
        <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" />
        <path d="M9.88 5.08A9.71 9.71 0 0112 5c5.05 0 9.27 3.11 10.94 7.5a12.32 12.32 0 01-3.22 4.61" />
        <path d="M6.61 6.61A12.21 12.21 0 001.06 12.5 12.3 12.3 0 006.5 17.39" />
      </svg>
    );
  }
  // Eye
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-['Amble'] text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={visible ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-sm text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          aria-label={visible ? "Show password" : "Hide password"}
          title={visible ? "Show password" : "Hide password"}
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-600 hover:text-gray-900"
        >
          <EyeIcon hidden={visible} />
        </button>
      </div>
    </div>
  );
}

function UpdatePassword() {
  const { authToken } = useAuth();
  const { notify } = useNotifications();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [hasPassword, setHasPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch user profile to determine login provider
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setHasPassword(res.data?.profile?.authProvider === "local");
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) fetchUserProfile();
  }, [authToken, fetchUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // 🧩 Validation
    if (!newPassword || !confirmPassword) {
      return notify.error("Please fill out all password fields.");
    }
    if (newPassword !== confirmPassword) {
      return notify.error("New password and Confirm password do not match.");
    }
    if (hasPassword && !currentPassword) {
      return notify.error("Current password is required.");
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in to Firebase.");

      const providerId = user.providerData[0]?.providerId;

      // 🔐 Reauthenticate if password-based login
      if (providerId === "password" && hasPassword) {
        const credential = EmailAuthProvider.credential(
          user.email || "",
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
      }

      // ✅ Update password in Firebase
      await updatePassword(user, newPassword);
      notify.success("Password updated successfully in Firebase!");

      // ✅ Update in backend (best-effort)
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/update-password`,
          { newPassword },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        notify.success("Password updated successfully in database!");
      } catch (backendErr) {
        console.warn("⚠ Backend update failed:", backendErr);
        // Don’t surface an error if Firebase succeeded
      }

      // ✅ Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Password update error:", err);
      if (err?.code === "auth/invalid-credential") {
        notify.error("Invalid current password. Please try again.");
      } else {
        notify.error(err?.message || "Failed to update password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-6 mx-6 rounded-lg max-w-full p-6 border border-gray-100 shadow-sm bg-neutral-50"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-[16px] sm:text-[18px] font-semibold font-['Amble']">
          Update Password
        </h2>
        <button
          type="submit"
          disabled={loading || !authToken}
          className={`mt-4 sm:mt-0 px-6 py-2 text-sm sm:text-base rounded-md text-white font-['Jost'] ${
            !authToken
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#011732] hover:bg-[#022349]"
          }`}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Current Password */}
        {hasPassword && (
          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            required
            autoComplete="current-password"
          />
        )}

        {/* New Password */}
        <PasswordField
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          required
          autoComplete="new-password"
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter new password"
          required
          autoComplete="new-password"
        />
      </div>
    </form>
  );
}

export default UpdatePassword;
