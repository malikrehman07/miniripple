// src/redux/slices/ticketsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getIdTokenSafe } from "@/helper/authHelper";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || '1';

/**
 * Fetch tickets list
 */
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      console.log('[fetchTickets] Starting API call');
      
      const token = await getIdTokenSafe();
      console.log('[fetchTickets] Got token:', token ? 'Token received' : 'No token');
      
      const response = await axios.get(
        `${API_BASE_URL}/api/v${API_VERSION}/tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('[fetchTickets] API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('[fetchTickets] API error:', error.response?.data || error.message);
      const message = error?.response?.data?.message || "Failed to fetch tickets";
      return rejectWithValue(message);
    }
  }
);

/**
 * Fetch single ticket details
 */
export const fetchTicketDetails = createAsyncThunk(
  "tickets/fetchTicketDetails",
  async (ticketId, { rejectWithValue }) => {
    try {
      console.log('[fetchTicketDetails] Starting API call for ticket:', ticketId);
      
      const token = await getIdTokenSafe();
      console.log('[fetchTicketDetails] Got token:', token ? 'Token received' : 'No token');
      
      const response = await axios.get(
        `${API_BASE_URL}/api/v${API_VERSION}/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('[fetchTicketDetails] API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('[fetchTicketDetails] API error:', error.response?.data || error.message);
      const message = error?.response?.data?.message || "Failed to fetch ticket details";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  // Tickets list data
  tickets: [],
  totalTickets: 0,
  
  // Selected ticket details
  selectedTicket: null,
  
  // UI states
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
  
  // Filter states
  selectedStatus: "All",
  selectedPriority: "All",
  selectedCategory: "All",
  showStatusFilter: false,
  showPriorityFilter: false,
  showCategoryFilter: false,
  
  // Search state
  searchQuery: "",
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    // Filter management
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    
    setSelectedPriority: (state, action) => {
      state.selectedPriority = action.payload;
    },
    
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    
    toggleStatusFilter: (state) => {
      state.showStatusFilter = !state.showStatusFilter;
    },
    
    togglePriorityFilter: (state) => {
      state.showPriorityFilter = !state.showPriorityFilter;
    },
    
    toggleCategoryFilter: (state) => {
      state.showCategoryFilter = !state.showCategoryFilter;
    },
    
    // Search management
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    // Clear selected ticket
    clearSelectedTicket: (state) => {
      state.selectedTicket = null;
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
    clearTicketsState: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.data || [];
        state.totalTickets = action.payload.count || 0;
        state.error = null;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch ticket details
      .addCase(fetchTicketDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchTicketDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedTicket = action.payload.data || null;
        state.detailsError = null;
      })
      .addCase(fetchTicketDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });
  },
});

// Export actions
export const {
  setSelectedStatus,
  setSelectedPriority,
  setSelectedCategory,
  toggleStatusFilter,
  togglePriorityFilter,
  toggleCategoryFilter,
  setSearchQuery,
  clearSelectedTicket,
  clearError,
  clearDetailsError,
  clearTicketsState,
} = ticketsSlice.actions;

// Export selectors
export const selectTickets = (state) => state.tickets.tickets;
export const selectTotalTickets = (state) => state.tickets.totalTickets;
export const selectSelectedTicket = (state) => state.tickets.selectedTicket;
export const selectLoading = (state) => state.tickets.loading;
export const selectDetailsLoading = (state) => state.tickets.detailsLoading;
export const selectError = (state) => state.tickets.error;
export const selectDetailsError = (state) => state.tickets.detailsError;
export const selectSelectedStatus = (state) => state.tickets.selectedStatus;
export const selectSelectedPriority = (state) => state.tickets.selectedPriority;
export const selectSelectedCategory = (state) => state.tickets.selectedCategory;
export const selectShowStatusFilter = (state) => state.tickets.showStatusFilter;
export const selectShowPriorityFilter = (state) => state.tickets.showPriorityFilter;
export const selectShowCategoryFilter = (state) => state.tickets.showCategoryFilter;
export const selectSearchQuery = (state) => state.tickets.searchQuery;

export default ticketsSlice.reducer;
