import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import UserListTable from "./UserListTable";
import Pagination from "./Pagination";
import {
  selectUsers,
  selectTotalUsers,
  selectCurrentPage,
  selectPageSize,
  selectSearchQuery,
  selectLoading,
  selectError,
  selectSelectedFilter,
  selectShowFilterDropdown,
  selectSelectedDate,
  selectShowCalendar,
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedFilter,
  toggleFilterDropdown,
  setSelectedDate,
  toggleCalendar,
} from "@/redux/slices/userManagementSlice";
import {
  loadUsers,
  clearError,
  handlePageChange,
  handleSearch,
} from "@/redux/actions/userManagementActions";

const filterOptions = ["All", "Name", "Email", "Role", "Phone Number", "Added Date", "Status"];

const MainForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  
  // Local state for search input (for immediate feedback)
  const [localSearchQuery, setLocalSearchQuery] = React.useState('');
  
  // Flag to prevent infinite loops during URL updates
  const [isUpdatingURL, setIsUpdatingURL] = React.useState(false);
  
  // Redux selectors
  const users = useSelector(selectUsers);
  const totalUsers = useSelector(selectTotalUsers);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const searchQuery = useSelector(selectSearchQuery);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedFilter = useSelector(selectSelectedFilter);
  const showFilterDropdown = useSelector(selectShowFilterDropdown);
  const selectedDate = useSelector(selectSelectedDate);
  const showCalendar = useSelector(selectShowCalendar);

  // Sync local search query with Redux state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Sync URL with Redux state (only on mount or URL change)
  useEffect(() => {
    if (isUpdatingURL) return; // Skip if we're updating URL
    
    const urlPage = parseInt(searchParams.get('page')) || 1;
    const urlPageSize = parseInt(searchParams.get('pageSize')) || 20;
    const urlSearch = searchParams.get('search') || '';
    const urlFilter = searchParams.get('filter') || 'All';
    
    // Only update Redux if URL values are different
    if (urlPage !== currentPage || urlPageSize !== pageSize || urlSearch !== searchQuery || urlFilter !== selectedFilter) {
      console.log('[MainForm] URL params detected, updating Redux state:', { urlPage, urlPageSize, urlSearch, urlFilter });
      dispatch(setCurrentPage(urlPage));
      dispatch(setPageSize(urlPageSize));
      dispatch(setSearchQuery(urlSearch));
      dispatch(setSelectedFilter(urlFilter));
    }
  }, [searchParams]); // Only depend on searchParams

  // Update URL when Redux state changes (but prevent infinite loops)
  useEffect(() => {
    if (isUpdatingURL) return; // Skip if we're updating URL
    
    const newSearchParams = new URLSearchParams();
    if (currentPage > 1) newSearchParams.set('page', currentPage.toString());
    if (pageSize !== 20) newSearchParams.set('pageSize', pageSize.toString());
    if (searchQuery) newSearchParams.set('search', searchQuery);
    if (selectedFilter !== 'All') newSearchParams.set('filter', selectedFilter);
    
    const newUrl = newSearchParams.toString();
    const currentUrl = searchParams.toString();
    
    if (newUrl !== currentUrl) {
      console.log('[MainForm] Updating URL params:', newUrl);
      setIsUpdatingURL(true);
      setSearchParams(newSearchParams);
      // Reset flag after a short delay
      setTimeout(() => setIsUpdatingURL(false), 100);
    }
  }, [currentPage, pageSize, searchQuery, selectedFilter, setSearchParams, searchParams]);

  // Load users on component mount or when URL params change
  useEffect(() => {
    console.log('[MainForm] useEffect triggered - loading users:', { currentPage, pageSize, searchQuery });
    dispatch(loadUsers(currentPage, pageSize, searchQuery));
  }, [dispatch, currentPage, pageSize, searchQuery]);

  // Show error toast if there's an error
    useEffect(() => {
    if (error) {
      console.error("User management error:", error);
      // You can add toast notification here if you have react-toastify
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Debug logging for Redux state
    useEffect(() => {
    console.log('[MainForm] Redux state updated:', {
      users: users.length,
      totalUsers,
      currentPage,
      pageSize,
      searchQuery,
      loading,
      error
    });
  }, [users, totalUsers, currentPage, pageSize, searchQuery, loading, error]);

    const handleCalendarChange = (date) => {
    dispatch(setSelectedDate(date));
    dispatch(toggleCalendar());
    };

  const toggleFilterDropdown = () => dispatch(toggleFilterDropdown());
  
    const handleFilterSelect = (option) => {
    // Update Redux state directly first to prevent infinite loops
    dispatch(setSelectedFilter(option));
    dispatch(toggleFilterDropdown());
    
    // Update URL once
    const newSearchParams = new URLSearchParams(searchParams);
    if (option !== 'All') {
      newSearchParams.set('filter', option);
    } else {
      newSearchParams.delete('filter');
    }
    setSearchParams(newSearchParams);
  };

  const toggleCalendar = () => dispatch(toggleCalendar());
  
    const handleSearchChange = (e) => {
    const query = e.target.value;
    // Don't dispatch here - let the URL sync handle it
    // This prevents infinite loops
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update Redux state directly first to prevent infinite loops
    dispatch(setSearchQuery(localSearchQuery));
    dispatch(setCurrentPage(1));
    
    // Update URL once
    const newSearchParams = new URLSearchParams(searchParams);
    if (localSearchQuery) {
      newSearchParams.set('search', localSearchQuery);
      newSearchParams.set('page', '1'); // Reset to first page on search
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (page) => {
    // Update Redux state directly first to prevent infinite loops
    dispatch(setCurrentPage(page));
    
    // Update URL once
    const newSearchParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newSearchParams.set('page', page.toString());
    } else {
      newSearchParams.delete('page');
    }
    setSearchParams(newSearchParams);
  };

  // Filter data based on selected filter and search query
  const filteredData = users.filter((user) => {
    if (!searchQuery) return true;
    
        const query = searchQuery.toLowerCase();
    
        if (selectedFilter === "All") {
      return (
        user.firstName?.toLowerCase().includes(query) ||
        user.lastName?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query) ||
        user.phoneNumber?.toLowerCase().includes(query) ||
        user.createdAt?.toLowerCase().includes(query) ||
        user.isActive?.toString().toLowerCase().includes(query)
      );
    } else if (selectedFilter === "Name") {
      return (
        user.firstName?.toLowerCase().includes(query) ||
        user.lastName?.toLowerCase().includes(query)
      );
    } else if (selectedFilter === "Email") {
      return user.email?.toLowerCase().includes(query);
    } else if (selectedFilter === "Role") {
      return user.role?.toLowerCase().includes(query);
    } else if (selectedFilter === "Phone Number") {
      return user.phoneNumber?.toLowerCase().includes(query);
    } else if (selectedFilter === "Added Date") {
      return user.createdAt?.toLowerCase().includes(query);
    } else if (selectedFilter === "Status") {
      return user.isActive?.toString().toLowerCase().includes(query);
    }
    
        return true;
    });

    const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

    return (
        <>
            <div className="px-6 pt-6 font-semibold text-[14px]">
                List of users added to the system
            </div>
      
            {/* Search & Filter */}
      <div className="flex flex-wrap gap-5 justify-between mt-5 px-6 w-full max-md:max-w-full">
                <div className="flex flex-wrap gap-6 items-start self-start max-md:max-w-full">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex rounded-[6px] overflow-hidden border-2 border-blue-800">
                        <div className="flex items-center justify-center rounded-br-[4px] rounded-tr-[4px] px-4 bg-blue-800">
                            <img
                                src="/page/visitorIpManagement/main-form-9.svg"
                                className="w-[15px]"
                                alt="Search"
                            />
                        </div>
                        <input
                            type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder="Search users..."
                            className="flex-1 p-2.5 text-sm text-[#4D5158]"
                        />
            {localSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  // Update local state first
                  setLocalSearchQuery('');
                  
                  // Update Redux state directly to prevent infinite loops
                  dispatch(setSearchQuery(''));
                  dispatch(setCurrentPage(1));
                  
                  // Update URL once
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.delete('search');
                  newSearchParams.delete('page');
                  setSearchParams(newSearchParams);
                }}
                className="px-3 py-2.5 bg-gray-500 text-white text-sm hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-3 py-2.5 bg-blue-800 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleFilterDropdown}
                            className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
                        >
                            <img
                                src="/page/visitorIpManagement/main-form-10.svg"
                                className="w-5"
                                alt="Filter"
                            />
                            {selectedFilter}
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                                        onClick={() => handleFilterSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Calendar Button with Date Selector */}
                    <div className="relative">
                        <button
                            onClick={toggleCalendar}
                            className="flex items-center gap-2 text-sm text-blue-800 px-3.5 py-2.5 border-2 border-blue-800 rounded-md hover:bg-blue-100"
                        >
              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select Date"}
                            <img
                                src="/page/visitorIpManagement/main-form-11.svg"
                                className="w-5"
                                alt="Calendar"
                            />
                        </button>
                        {showCalendar && (
                            <div className="absolute z-10 mt-2">
                                <DatePicker
                  selected={selectedDate}
                                    onChange={handleCalendarChange}
                                    inline
                                />
                            </div>
                        )}
                    </div>
                </div>

                <button className="px-6 py-2.5 text-base font-semibold rounded-md bg-slate-900 text-neutral-50 max-md:px-5">
                    Add New User
                </button>
            </div>

      {/* Error Display */}
      {error && (
        <div className="px-6 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

            {/* Table */}
      <UserListTable data={paginatedData} loading={loading} />

            {/* Pagination */}
            <div className="w-full flex justify-end">
                <Pagination
          totalPages={Math.ceil(totalUsers / pageSize)}
                    currentPage={currentPage}
          onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default MainForm;
