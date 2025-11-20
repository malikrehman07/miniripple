import React, { useState } from "react";
import { useAuth } from "../../middlewares/authContext";
import { useNotifications } from "@/hooks/useNotifications";

function SetPassword({ authProvider }) {
    const { authToken } = useAuth();
    const { notify } = useNotifications();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const API = import.meta.env.VITE_API_URL;

    // if (!authProvider || authProvider === "local") {
    //     // Only show for Google/Facebook social accounts
    //     return null;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            return notify.error("Both fields are required");
        }
        if (password !== confirmPassword) {
            return notify.error("Passwords do not match");
        }
        if (password.length < 6) {
            return notify.error("Password must be at least 6 characters");
        }

        try {
            setLoading(true);
            const res = await fetch(`${API}/api/v1/users/set-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();
            console.log("Response status:", res.status);
            console.log("Response body:", data);
            if (!res.ok) {
                throw new Error(data.message || "Failed to set password");
            }

            notify.saveSuccess("Password has been set successfully!");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Set password error:", err);
            notify.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col mx-3 sm:mx-4 md:mx-6 rounded-lg max-w-full p-4 md:p-6 border border-gray-100 shadow-sm bg-neutral-50 mt-6">
            <h2 className="text-[14px] font-['Amble'] font-semibold mb-4">Set a Password</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3 py-3 border border-gray-300 rounded-sm font-['Jost']"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-3 py-3 border border-gray-300 rounded-sm font-['Jost']"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="self-end px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Set Password"}
                </button>
            </form>
        </div>
    );
}

export default SetPassword;