import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
  memo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, X } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "../../../middlewares/authContext";

import {
  selectUserProfile,
  selectEditMode,
  selectUploading,
  selectPreviewImage,
  selectDragActive,
  selectLoading,
  selectError,
  updateUserProfile as updateUserProfileThunk,
} from "@/redux/slices/userProfileSlice";

import {
  loadUserProfile,
  toggleEditMode,
  setDragState,
  handleFileSelect,
  handleDragDrop,
  removeImage,
  clearProfileError,
} from "@/redux/actions/userProfileActions";

/* ------------------------------ */
/* Utility: stable ref map        */
/* ------------------------------ */
const useInputRefs = (keys) => {
  const mapRef = useRef({});
  keys.forEach((k) => {
    if (!mapRef.current[k]) mapRef.current[k] = React.createRef();
  });
  return mapRef.current;
};

function ProfileDetails() {
  const dispatch = useDispatch();
  const { updateUserData } = useAuth();
  const fileInputRef = useRef(null);
  const { notify } = useNotifications();

  // Redux selectors
  const profile = useSelector(selectUserProfile);
  const editMode = useSelector(selectEditMode);
  const uploading = useSelector(selectUploading);
  const previewImage = useSelector(selectPreviewImage);
  const dragActive = useSelector(selectDragActive);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Local edit form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    billingAddress: "",
    zipCode: "",
    picture: "",
  });

  // Track active field + caret to keep focus stable
  const [activeField, setActiveField] = useState(null);
  const caretRef = useRef({ start: null, end: null });
  const fieldKeys = useMemo(
    () => [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "state",
      "billingAddress",
      "zipCode",
    ],
    []
  );
  const inputRefs = useInputRefs(fieldKeys);

  // Field errors
  const [fieldErrors, setFieldErrors] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Bootstrap profile
  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  /**
   * Seed local form ONLY when:
   *  - entering edit mode, or
   *  - not editing and profile changes.
   */
  const prevEditModeRef = useRef(false);
  useEffect(() => {
    const enteringEdit = !prevEditModeRef.current && editMode;
    const notEditing = !editMode;

    if ((enteringEdit || notEditing) && profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        country: profile.country || "",
        state: profile.state || "",
        billingAddress: profile.billingAddress || "",
        zipCode: profile.zipCode || "",
        picture: profile.picture || "",
      });
      setFieldErrors({});
    }

    prevEditModeRef.current = editMode;
  }, [profile, editMode]);

  // Show server errors
  useEffect(() => {
    if (error) {
      const msg =
        typeof error === "string" ? error : error.message || "An error occurred";
      notify.error(msg);
      dispatch(clearProfileError());
    }
  }, [error, dispatch, notify]);

  /* ---------------------------------------------------- */
  /* Focus + caret preservation (fixes “must-click again”) */
  /* ---------------------------------------------------- */
  const rememberCaret = (e) => {
    setActiveField(e.target.name);
    // save caret for that field
    caretRef.current = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    };
  };

  // after every render that changes `form`, restore focus+caret
  useLayoutEffect(() => {
    if (!editMode || !activeField) return;
    const ref = inputRefs[activeField];
    const el = ref?.current;
    if (!el) return;
    // Re-focus and restore selection
    el.focus({ preventScroll: true });
    const { start, end } = caretRef.current;
    if (start != null && end != null) {
      try {
        el.setSelectionRange(start, end);
      } catch {
        // ignore for types that don't support selection (e.g. number)
      }
    }
  }, [form, editMode, activeField, inputRefs]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    // remember caret before state change
    rememberCaret(e);

    setForm((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFocus = (e) => {
    setActiveField(e.target.name);
    rememberCaret(e);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(handleFileSelect(file));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") dispatch(setDragState(true));
    else if (e.type === "dragleave") dispatch(setDragState(false));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDragState(false));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      dispatch(handleDragDrop([e.dataTransfer.files[0]]));
    }
  };

  const handleRemoveImage = () => {
    dispatch(removeImage());
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getImageUrl = (picture) => {
    if (!picture) return "/page/userProfile/profile_image.png";
    if (picture.startsWith("https://")) return picture;
    if (picture.startsWith("/uploads/")) return `${API_BASE_URL}${picture}`;
    return "/page/userProfile/profile_image.png";
  };

  const isFirstNameValid = !!(editMode ? form.firstName?.trim() : profile.firstName);

  const handleSubmit = async () => {
    const errs = {};
    if (!form.firstName || !form.firstName.trim()) {
      errs.firstName = "First name is required.";
    }
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      notify.error("Please fix the highlighted fields.");
      return;
    }

    try {
      const payload = {
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName ? form.lastName.trim() : form.lastName,
      };

      await dispatch(updateUserProfileThunk(payload)).unwrap();
      notify.saveSuccess("Profile");

      updateUserData({
        firstName: payload.firstName,
        lastName: payload.lastName,
        displayName:
          payload.firstName && payload.lastName
            ? `${payload.firstName} ${payload.lastName}`
            : payload.firstName || payload.lastName,
        picture: previewImage || payload.picture,
      });

      setFieldErrors({});
    } catch (err) {
      const msg =
        typeof err === "string" ? err : err?.message || "Failed to update profile";
      notify.error(msg);
    }
  };

  const handleToggleEditMode = () => {
    if (!editMode && profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        country: profile.country || "",
        state: profile.state || "",
        billingAddress: profile.billingAddress || "",
        zipCode: profile.zipCode || "",
        picture: profile.picture || "",
      });
    }
    setFieldErrors({});
    setActiveField(null);
    dispatch(toggleEditMode(!editMode));
  };

  // fixed hooks above any return
  const personalFields = useMemo(
    () => [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone" },
    ],
    []
  );

  const addressFields = useMemo(
    () => [
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "zipCode", label: "Zip Code" },
      { key: "billingAddress", label: "Billing Address", type: "textarea", full: true },
    ],
    []
  );

  if (loading && !editMode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // Read-only cell
  const ReadOnlyCell = memo(({ label, value, full }) => (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <p className="text-[13px] sm:text-[14px] font-['Amble'] text-gray-700 mb-1">{label}</p>
      <div className="px-3 py-3 sm:py-3.5 border border-gray-200 rounded-md bg-gray-50 text-[15px] sm:text-[16px] font-['Jost']">
        {value || "Not provided"}
      </div>
    </div>
  ));

  // Editable cell
  const EditableCell = memo(({ field }) => {
    const { key, label, type, full } = field;

    const common = {
      name: key,
      value: form[key],
      onChange: handleChange,
      onInput: rememberCaret, // track caret even on IME/input
      onFocus: handleFocus,
      "aria-invalid": !!fieldErrors[key],
      "aria-describedby": fieldErrors[key] ? `${key}-error` : undefined,
      placeholder: `Enter your ${label.toLowerCase()}`,
      className: [
        "text-[15px] sm:text-[16px] font-['Jost'] px-3 py-3 sm:py-3.5 border-2 rounded-sm w-full",
        fieldErrors[key] ? "border-red-500" : "border-gray-300",
      ].join(" "),
      autoComplete: "off",
      ref: inputRefs[key],
    };

    return (
      <div className={`${full ? "md:col-span-2" : ""}`}>
        <p className="text-[13px] sm:text-[14px] font-['Amble'] text-gray-700 mb-1">{label}</p>
        {field.type === "textarea" ? (
          <textarea rows={3} {...common} />
        ) : (
          <input type={type === "email" ? "email" : "text"} {...common} />
        )}
        {fieldErrors[key] && (
          <p id={`${key}-error`} className="mt-1 text-sm text-red-600">
            {fieldErrors[key]}
          </p>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col mx-3 sm:mx-4 md:mx-6 rounded-lg max-w-full p-4 md:p-6 border border-gray-100 shadow-sm bg-neutral-50">
      {/* Header */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex-1 text-[14px] font-['Amble'] font-semibold py-2">
          Profile Details
        </span>
        <button
          onClick={handleToggleEditMode}
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-md bg-[#011732] text-white font-['Jost']"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex w-full justify-start mt-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]">
          <div
            className={`relative w-full h-full rounded-full shadow-sm overflow-hidden group ${
              dragActive ? "ring-2 ring-blue-500 ring-opacity-50" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <img
              src={previewImage || getImageUrl(profile.picture)}
              alt="profile"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "/page/userProfile/profile_image.png";
              }}
            />
            {editMode && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="text-center text-white">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="text-white hover:text-blue-200 transition-colors mb-2"
                    title="Upload new photo"
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                    ) : (
                      <Upload className="h-6 w-6 mx-auto" />
                    )}
                  </button>
                  <p className="text-xs">Click to upload or drag & drop</p>
                </div>
              </div>
            )}
          </div>

          {editMode && profile.picture && (
            <button
              onClick={handleRemoveImage}
              aria-label="Remove photo"
              className="absolute -top-2 -right-2 z-20 grid place-items-center h-7 w-7 rounded-full bg-white shadow ring-1 ring-black/10 hover:ring-red-300"
              title="Remove photo"
              type="button"
            >
              <X className="h-4 w-4 text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* PERSONAL INFO */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">
          Personal Info
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editMode
            ? personalFields.map((f) => <EditableCell key={f.key} field={f} />)
            : personalFields.map((f) => (
                <ReadOnlyCell key={f.key} label={f.label} value={profile[f.key]} />
              ))}
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">
          Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editMode
            ? addressFields.map((f) => <EditableCell key={f.key} field={f} />)
            : addressFields.map((f) => (
                <ReadOnlyCell
                  key={f.key}
                  label={f.label}
                  value={profile[f.key]}
                  full={f.full}
                />
              ))}
        </div>
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="flex flex-col sm:flex-row sm:justify-end mt-4 gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || !isFirstNameValid}
            title={!isFirstNameValid ? "First name is required" : ""}
            className={[
              "w-full sm:w-auto px-6 py-2 text-white rounded-md transition-colors",
              loading || !isFirstNameValid
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800",
            ].join(" ")}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;