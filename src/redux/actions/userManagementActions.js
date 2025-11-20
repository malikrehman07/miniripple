// src/redux/actions/userManagementActions.js
import { 
  fetchUsers, 
  fetchUserDetails,
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
  clearUserManagementState
} from '../slices/userManagementSlice';
import { selectPageSize } from '../slices/userManagementSlice';

// User data actions
export const loadUsers = (page = 1, pageSize = 20, search = "") => async (dispatch) => {
  try {
    const result = await dispatch(fetchUsers({ page, pageSize, search })).unwrap();
    return result;
  } catch (error) {
    console.error('Failed to load users:', error);
    throw error;
  }
};

export const loadUserDetails = (userId) => async (dispatch) => {
  try {
    const result = await dispatch(fetchUserDetails(userId)).unwrap();
    return result;
  } catch (error) {
    console.error('Failed to load user details:', error);
    throw error;
  }
};

// Pagination actions
export const changePage = (page) => (dispatch) => {
  dispatch(setCurrentPage(page));
};

export const changePageSize = (pageSize) => (dispatch) => {
  dispatch(setPageSize(pageSize));
};

// Search actions
export const updateSearchQuery = (query) => (dispatch) => {
  dispatch(setSearchQuery(query));
};

export const performSearch = (query, page = 1) => async (dispatch, getState) => {
  try {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(page));
    
    const state = getState();
    const currentPageSize = selectPageSize(state);
    await dispatch(loadUsers(page, currentPageSize, query));
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

// Filter actions
export const updateFilter = (filter) => (dispatch) => {
  dispatch(setSelectedFilter(filter));
  dispatch(toggleFilterDropdown());
};

export const toggleFilter = () => (dispatch) => {
  dispatch(toggleFilterDropdown());
};

// Date filter actions
export const updateDate = (date) => (dispatch) => {
  dispatch(setSelectedDate(date));
  dispatch(toggleCalendar());
};

export const toggleDatePicker = () => (dispatch) => {
  dispatch(toggleCalendar());
};

// User selection actions
export const selectUser = (userId) => async (dispatch) => {
  try {
    await dispatch(loadUserDetails(userId));
  } catch (error) {
    console.error('Failed to select user:', error);
    throw error;
  }
};

export const clearUser = () => (dispatch) => {
  dispatch(clearSelectedUser());
};

// Error handling actions
export const clearUserError = () => (dispatch) => {
  dispatch(clearError());
};

export const clearUserDetailsError = () => (dispatch) => {
  dispatch(clearDetailsError());
};

// Reset actions
export const resetUserManagement = () => (dispatch) => {
  dispatch(clearUserManagementState());
};

// Combined actions for better UX
export const refreshUsers = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { currentPage, pageSize, searchQuery } = state.userManagement;
    
    await dispatch(loadUsers(currentPage, pageSize, searchQuery));
  } catch (error) {
    console.error('Failed to refresh users:', error);
    throw error;
  }
};

export const handlePageChange = (newPage) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { pageSize, searchQuery } = state.userManagement;
    
    dispatch(setCurrentPage(newPage));
    await dispatch(loadUsers(newPage, pageSize, searchQuery));
  } catch (error) {
    console.error('Failed to change page:', error);
    throw error;
  }
};

export const handleSearch = (query) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { pageSize } = state.userManagement;
    
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1)); // Reset to first page on search
    
    await dispatch(loadUsers(1, pageSize, query));
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

// Export all actions
export {
  fetchUsers,
  fetchUserDetails,
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
  clearUserManagementState
};
