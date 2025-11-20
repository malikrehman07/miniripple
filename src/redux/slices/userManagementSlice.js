// src/redux/slices/userManagementSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getIdTokenSafe } from "@/helper/authHelper";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch users list with pagination and search
 */
export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async ({ page = 1, pageSize = 20, search = "" }, { rejectWithValue }) => {
    try {
      console.log('[fetchUsers] Starting API call with params:', { page, pageSize, search });
      
      const token = await getIdTokenSafe();
      console.log('[fetchUsers] Got token:', token ? 'Token received' : 'No token');
      
      const response = await axios.get(
        `${API_BASE_URL}/api/v2/admin/users`,
        {
          params: {
            page,
            pageSize,
            search,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('[fetchUsers] API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('[fetchUsers] API error:', error.response?.data || error.message);
      const message = error?.response?.data?.message || "Failed to fetch users";
      return rejectWithValue(message);
    }
  }
);

/**
 * Fetch single user details with properties and subscription
 */
export const fetchUserDetails = createAsyncThunk(
  "userManagement/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const token = await getIdTokenSafe();
      
      const response = await axios.get(
        `${API_BASE_URL}/api/v2/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch user details";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  // Users list data
  users: [],
  totalUsers: 0,
  currentPage: 1,
  pageSize: 20,
  searchQuery: "",
  
  // Selected user details
  selectedUser: null,
  userProperties: [],
  userSubscription: null,
  
  // UI states
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
  
  // Filter states
  selectedFilter: "All",
  showFilterDropdown: false,
  
  // Date filter
  selectedDate: null,
  showCalendar: false,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    // Pagination and search
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    // Filter management
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    
    toggleFilterDropdown: (state) => {
      state.showFilterDropdown = !state.showFilterDropdown;
    },
    
    // Date filter
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    
    toggleCalendar: (state) => {
      state.showCalendar = !state.showCalendar;
    },
    
    // Clear selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.userProperties = [];
      state.userSubscription = null;
      state.detailsError = null;
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
    
    clearDetailsError: (state) => {
      state.detailsError = null;
    },
    
    // Clear all state
    clearUserManagementState: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.totalUsers = action.payload.totalUsers || 0;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedUser = action.payload.user || null;
        state.userProperties = action.payload.properties || [];
        state.userSubscription = action.payload.subscription || null;
        state.detailsError = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });
  },
});

// Export actions
export const {
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedFilter,
  toggleFilterDropdown,
  setSelectedDate,
  toggleCalendar,
  clearSelectedUser,
  clearError,
  clearDetailsError,
  clearUserManagementState,
} = userManagementSlice.actions;

// Export selectors
export const selectUsers = (state) => state.userManagement.users;
export const selectTotalUsers = (state) => state.userManagement.totalUsers;
export const selectCurrentPage = (state) => state.userManagement.currentPage;
export const selectPageSize = (state) => state.userManagement.pageSize;
export const selectSearchQuery = (state) => state.userManagement.searchQuery;
export const selectSelectedUser = (state) => state.userManagement.selectedUser;
export const selectUserProperties = (state) => state.userManagement.userProperties;
export const selectUserSubscription = (state) => state.userManagement.userSubscription;
export const selectLoading = (state) => state.userManagement.loading;
export const selectDetailsLoading = (state) => state.userManagement.detailsLoading;
export const selectError = (state) => state.userManagement.error;
export const selectDetailsError = (state) => state.userManagement.detailsError;
export const selectSelectedFilter = (state) => state.userManagement.selectedFilter;
export const selectShowFilterDropdown = (state) => state.userManagement.showFilterDropdown;
export const selectSelectedDate = (state) => state.userManagement.selectedDate;
export const selectShowCalendar = (state) => state.userManagement.showCalendar;

export default userManagementSlice.reducer;
