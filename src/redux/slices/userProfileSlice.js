// src/redux/slices/userProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getIdTokenSafe, delay } from "@/helper/authHelper";
import { resetAppState } from "@/redux/appReset";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch user profile with bootstrap-on-401 and controlled backoff.
 */
export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const maxAttempts = 4;
    const backoffs = [200, 500, 1000];

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const token = await getIdTokenSafe(true);
        const res = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = res.data?.profile || res.data?.user || res.data || {};
        return {
          firstName: raw.firstName || "",
          lastName: raw.lastName || "",
          email: raw.email || "",
          phone: raw.phone || "",
          country: raw.country || "",
          state: raw.state || "",
          billingAddress: raw.billingAddress || "",
          zipCode: raw.zipCode || "",
          picture: raw.picture || "",
          role: raw.role || "",
          isEmailVerified: raw.isEmailVerified || false,
          createdAt: raw.createdAt || "",
          providers: raw.providers || [],
          authProvider: raw.authProvider || "",
        };
      } catch (e) {
        const status = e?.response?.status;
        if (status === 401 || status === 404 || status === 409) {
          try {
            const idToken = await getIdTokenSafe(true);
            await fetch(`${API_BASE_URL}/api/v1/users/verify-token`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            });
          } catch {}
          if (attempt < maxAttempts - 1) {
            await delay(backoffs[attempt] || 1200);
            continue;
          }
        }
        const message = e?.response?.data?.message || "Failed to fetch profile data";
        return rejectWithValue(message);
      }
    }
    return rejectWithValue("Failed to fetch profile data");
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "userProfile/uploadProfilePicture",
  async (file, { rejectWithValue }) => {
    try {
      const allowed = ["image/jpeg", "image/png", "image/gif"];
      if (!allowed.includes(file.type)) {
        return rejectWithValue("Please select a valid image file (JPEG, PNG, or GIF)");
      }
      if (file.size > 5 * 1024 * 1024) {
        return rejectWithValue("Image size should be less than 5MB");
      }

      const token = await getIdTokenSafe(true);
      const formData = new FormData();
      formData.append("photo", file);

      const res = await axios.post(
        `${API_BASE_URL}/api/v1/users/profile/upload-photo`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.success) return res.data.picture;
      return rejectWithValue("Failed to upload profile picture");
    } catch (e) {
      const message = e?.response?.data?.message || "Failed to upload profile picture";
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "userProfile/updateUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = await getIdTokenSafe(true);
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/users/update-profile`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (e) {
      const message = e?.response?.data?.message || "Failed to update profile";
      return rejectWithValue(message);
    }
  }
);

export const fetchUserDataByEmail = createAsyncThunk(
  "userProfile/fetchUserDataByEmail",
  async (email, { rejectWithValue }) => {
    try {
      if (!email) return rejectWithValue("Email is required");
      const token = await getIdTokenSafe(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/v1/users/get-user-data?email=${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (e) {
      const message = e?.response?.data?.message || "Failed to fetch user data";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    billingAddress: "",
    zipCode: "",
    picture: "",
    role: "",
    isEmailVerified: false,
    createdAt: "",
    providers: [],
    authProvider: "",
  },
  editMode: false,
  uploading: false,
  previewImage: null,
  dragActive: false,
  loading: false,
  error: null,
  lastFetched: null,
  userDataByEmail: null,
};

const slice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setEditMode: (s, a) => void (s.editMode = a.payload),
    setPreviewImage: (s, a) => void (s.previewImage = a.payload),
    setDragActive: (s, a) => void (s.dragActive = a.payload),
    clearPreviewImage: (s) => void (s.previewImage = null),
    updateProfileField: (s, a) => {
      const { field, value } = a.payload;
      if (Object.prototype.hasOwnProperty.call(s.profile, field)) {
        s.profile[field] = value;
      }
    },
    removeProfilePicture: (s) => {
      s.profile.picture = "";
      s.previewImage = null;
    },
    clearError: (s) => void (s.error = null),
    clearUserProfileState: () => ({ ...initialState }),
  },
  extraReducers: (b) => {
    b.addCase(fetchUserProfile.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchUserProfile.fulfilled, (s, a) => {
      s.loading = false;
      s.profile = a.payload;
      s.lastFetched = Date.now();
    });
    b.addCase(fetchUserProfile.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });

    b.addCase(uploadProfilePicture.pending, (s) => {
      s.uploading = true;
      s.error = null;
    });
    b.addCase(uploadProfilePicture.fulfilled, (s, a) => {
      s.uploading = false;
      s.profile.picture = a.payload;
      s.previewImage = null;
    });
    b.addCase(uploadProfilePicture.rejected, (s, a) => {
      s.uploading = false;
      s.error = a.payload;
    });

    b.addCase(updateUserProfile.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(updateUserProfile.fulfilled, (s, a) => {
      s.loading = false;
      s.editMode = false;
      if (a.payload?.user) {
        const u = a.payload.user;
        s.profile = {
          ...s.profile,
          firstName: u.firstName ?? s.profile.firstName,
          lastName: u.lastName ?? s.profile.lastName,
          email: u.email ?? s.profile.email,
          phone: u.phone ?? s.profile.phone,
          country: u.country ?? s.profile.country,
          state: u.state ?? s.profile.state,
          billingAddress: u.billingAddress ?? s.profile.billingAddress,
          zipCode: u.zipCode ?? s.profile.zipCode,
          picture: u.picture ?? s.profile.picture,
          role: u.role ?? s.profile.role,
          isEmailVerified: u.isEmailVerified ?? s.profile.isEmailVerified,
          createdAt: u.createdAt ?? s.profile.createdAt,
          providers: u.providers ?? s.profile.providers,
          authProvider: u.authProvider ?? s.profile.authProvider,
        };
      }
    });
    b.addCase(updateUserProfile.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });

    b.addCase(fetchUserDataByEmail.fulfilled, (s, a) => {
      s.userDataByEmail = a.payload;
    });

    // 👇 reset the slice whenever app/reset is dispatched
    b.addCase(resetAppState, () => ({ ...initialState }));
  },
});

export const {
  setEditMode,
  setPreviewImage,
  setDragActive,
  clearPreviewImage,
  updateProfileField,
  removeProfilePicture,
  clearError,
  clearUserProfileState,
} = slice.actions;

export const selectUserProfile = (s) => s.userProfile.profile;
export const selectEditMode = (s) => s.userProfile.editMode;
export const selectUploading = (s) => s.userProfile.uploading;
export const selectPreviewImage = (s) => s.userProfile.previewImage;
export const selectDragActive = (s) => s.userProfile.dragActive;
export const selectLoading = (s) => s.userProfile.loading;
export const selectError = (s) => s.userProfile.error;
export const selectUserDataByEmail = (s) => s.userProfile.userDataByEmail;

export default slice.reducer;
