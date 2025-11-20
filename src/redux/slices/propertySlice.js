// src/redux/slices/propertySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth } from "firebase/auth";

/**
 * Fetches:
 *  1) /domain/status  -> { domainStatus, propertyId, subscriptionInfo, snippet }
 *  2) /properties/:id -> property details (domain, propertyName, etc.)
 * Stores merged result in state.property.data
 *
 * Will NOT refetch if data already exists unless { force: true } is passed.
 */
export const fetchPropertyData = createAsyncThunk(
  "property/fetchPropertyData",
  async ({ force = false } = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      if (!force && state.property.data) {
        // already loaded
        return state.property.data;
      }

      // const auth = getAuth();
      // const currentUser = auth.currentUser;
      // if (!currentUser) {
      //   return rejectWithValue("No authenticated user");
      // }
      const token = localStorage.getItem("token")

      // 1) Get domain status
      const statusRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const statusData = statusRes?.data?.data || null;
      if (!statusData || !statusData.propertyId) {
        // No property connected yet
        return {
          domainStatus: statusData?.domainStatus ?? "none",
          propertyId: null,
          subscriptionInfo: statusData?.subscriptionInfo ?? null,
          snippet: statusData?.snippet ?? null,
          property: null, // no property details
        };
      }

      // 2) Get property details if we have id
      const propRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/properties/${statusData.propertyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const property = propRes?.data?.property ?? null;

      return {
        domainStatus: statusData.domainStatus,   // "active" | "pending" | ...
        propertyId: statusData.propertyId,       // e.g., "MR-39bf1844"
        subscriptionInfo: statusData.subscriptionInfo ?? null,
        snippet: statusData.snippet ?? null,     // { status, lastChecked }
        property,                                // full property doc (domain, propertyName, etc.)
      };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch property data";
      return rejectWithValue(msg);
    }
  },
  {
    // Avoid duplicate in-flight requests and skip if already present
    condition: ({ force = false } = {}, { getState }) => {
      const { loading, data } = getState().property || {};
      if (loading) return false;
      if (!force && data) return false;
      return true;
    },
  }
);

const initialState = {
  data: null,       // { domainStatus, propertyId, subscriptionInfo, snippet, property }
  loading: false,
  error: null,
  lastFetched: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    // Optional: clear everything (e.g., on logout)
    clearPropertyState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchPropertyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch property data";
      });
  },
});

export const { clearPropertyState } = propertySlice.actions;

export default propertySlice.reducer;

/** -------- Selectors -------- */
export const selectPropertyState = (state) => state.property;
export const selectPropertyData = (state) => state.property.data;

export const selectPropertyId = (state) => state.property.data?.propertyId ?? null;
export const selectDomainStatus = (state) => state.property.data?.domainStatus ?? "none";
export const selectSubscriptionInfo = (state) => state.property.data?.subscriptionInfo ?? null;
export const selectSnippetInfo = (state) => state.property.data?.snippet ?? null;

// common fields from property details (if present)
export const selectProperty = (state) => state.property.data?.property ?? null;
export const selectPropertyDomain = (state) => state.property.data?.property?.domain ?? null;
export const selectPropertyName = (state) => state.property.data?.property?.propertyName ?? null;
