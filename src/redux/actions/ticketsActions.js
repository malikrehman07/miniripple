// src/redux/actions/ticketsActions.js
import { 
  fetchTickets, 
  fetchTicketDetails,
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
  clearTicketsState
} from '../slices/ticketsSlice';

// Ticket data actions
export const loadTickets = () => async (dispatch) => {
  try {
    const result = await dispatch(fetchTickets()).unwrap();
    return result;
  } catch (error) {
    console.error('Failed to load tickets:', error);
    throw error;
  }
};

export const loadTicketDetails = (ticketId) => async (dispatch) => {
  try {
    const result = await dispatch(fetchTicketDetails(ticketId)).unwrap();
    return result;
  } catch (error) {
    console.error('Failed to load ticket details:', error);
    throw error;
  }
};

// Filter actions
export const updateStatusFilter = (status) => (dispatch) => {
  dispatch(setSelectedStatus(status));
  dispatch(toggleStatusFilter());
};

export const updatePriorityFilter = (priority) => (dispatch) => {
  dispatch(setSelectedPriority(priority));
  dispatch(togglePriorityFilter());
};

export const updateCategoryFilter = (category) => (dispatch) => {
  dispatch(setSelectedCategory(category));
  dispatch(toggleCategoryFilter());
};

export const toggleStatusFilterDropdown = () => (dispatch) => {
  dispatch(toggleStatusFilter());
};

export const togglePriorityFilterDropdown = () => (dispatch) => {
  dispatch(togglePriorityFilter());
};

export const toggleCategoryFilterDropdown = () => (dispatch) => {
  dispatch(toggleCategoryFilter());
};

// Search actions
export const updateSearchQuery = (query) => (dispatch) => {
  dispatch(setSearchQuery(query));
};

export const performSearch = (query) => async (dispatch) => {
  try {
    dispatch(setSearchQuery(query));
    // You can add additional search logic here if needed
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

// Ticket selection actions
export const selectTicket = (ticketId) => async (dispatch) => {
  try {
    await dispatch(loadTicketDetails(ticketId));
  } catch (error) {
    console.error('Failed to select ticket:', error);
    throw error;
  }
};

export const clearTicket = () => (dispatch) => {
  dispatch(clearSelectedTicket());
};

// Error handling actions
export const clearTicketError = () => (dispatch) => {
  dispatch(clearError());
};

export const clearTicketDetailsError = () => (dispatch) => {
  dispatch(clearDetailsError());
};

// Reset actions
export const resetTickets = () => (dispatch) => {
  dispatch(clearTicketsState());
};

// Combined actions for better UX
export const refreshTickets = () => async (dispatch) => {
  try {
    await dispatch(loadTickets());
  } catch (error) {
    console.error('Failed to refresh tickets:', error);
    throw error;
  }
};

export const handleTicketSearch = (query) => async (dispatch) => {
  try {
    dispatch(setSearchQuery(query));
    // You can add additional search logic here if needed
  } catch (error) {
    console.error('Ticket search failed:', error);
    throw error;
  }
};

// Export all actions
export {
  fetchTickets,
  fetchTicketDetails,
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
  clearTicketsState
};
