import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TicketsListTable from "./TicketsListTable";
import Pagination from "./Pagination";
import {
  selectTickets,
  selectTotalTickets,
  selectLoading,
  selectError,
  selectSelectedStatus,
  selectSelectedPriority,
  selectSelectedCategory,
  selectShowStatusFilter,
  selectShowPriorityFilter,
  selectShowCategoryFilter,
  selectSearchQuery,
} from "@/redux/slices/ticketsSlice";
import {
  loadTickets,
  setSelectedStatus,
  setSelectedPriority,
  setSelectedCategory,
  toggleStatusFilter,
  togglePriorityFilter,
  toggleCategoryFilter,
  setSearchQuery,
  clearError,
} from "@/redux/actions/ticketsActions";

const statusOptions = ["All", "Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["All", "High", "Medium", "Low"];
const categoryOptions = ["All", "General Inquiry", "Technical Issue", "Feature Request", "Billing", "Account Access"];

const MainForm = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const tickets = useSelector(selectTickets);
  const totalTickets = useSelector(selectTotalTickets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedStatus = useSelector(selectSelectedStatus);
  const selectedPriority = useSelector(selectSelectedPriority);
  const selectedCategory = useSelector(selectSelectedCategory);
  const showStatusFilter = useSelector(selectShowStatusFilter);
  const showPriorityFilter = useSelector(selectShowPriorityFilter);
  const showCategoryFilter = useSelector(selectShowCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);
  
  // Local state
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);

  // Load tickets on component mount
  useEffect(() => {
    console.log('[MainForm] Loading tickets...');
    dispatch(loadTickets());
  }, [dispatch]);

  // Sync local search query with Redux state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      console.error("Tickets error:", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Debug logging for Redux state
  useEffect(() => {
    console.log('[MainForm] Redux state updated:', {
      tickets: tickets.length,
      totalTickets,
      selectedStatus,
      selectedPriority,
      selectedCategory,
      searchQuery,
      loading,
      error
    });
  }, [tickets, totalTickets, selectedStatus, selectedPriority, selectedCategory, searchQuery, loading, error]);

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    setSelectedDate(format(date, "dd/MM/yyyy"));
    setShowCalendar(false);
  };

  const toggleCalendar = () => setShowCalendar(prev => !prev);
  
  const handleFilterSelect = (filterType, value) => {
    switch (filterType) {
      case 'status':
        dispatch(setSelectedStatus(value));
        dispatch(toggleStatusFilter());
        break;
      case 'priority':
        dispatch(setSelectedPriority(value));
        dispatch(togglePriorityFilter());
        break;
      case 'category':
        dispatch(setSelectedCategory(value));
        dispatch(toggleCategoryFilter());
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery));
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter data based on selected filters and search query
  const filteredData = tickets.filter((ticket) => {
    // Status filter
    if (selectedStatus !== "All" && ticket.status !== selectedStatus) {
      return false;
    }
    
    // Priority filter
    if (selectedPriority !== "All" && ticket.priority !== selectedPriority) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== "All" && ticket.category !== selectedCategory) {
      return false;
    }
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.subject?.toLowerCase().includes(query) ||
        ticket.description?.toLowerCase().includes(query) ||
        ticket.userName?.toLowerCase().includes(query) ||
        ticket.userEmail?.toLowerCase().includes(query) ||
        ticket.category?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading && tickets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 pt-6 font-semibold text-[14px]">
        List of support tickets submitted by users
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
              placeholder="Search tickets..."
              className="flex-1 p-2.5 text-sm text-[#4D5158]"
            />
            {localSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearchQuery('');
                  dispatch(setSearchQuery(''));
                  setCurrentPage(1);
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

          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => dispatch(toggleStatusFilter())}
              className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
            >
              <img
                src="/page/visitorIpManagement/main-form-10.svg"
                className="w-5"
                alt="Filter"
              />
              Status: {selectedStatus}
            </button>
            {showStatusFilter && (
              <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                    onClick={() => handleFilterSelect('status', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => dispatch(togglePriorityFilter())}
              className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
            >
              <img
                src="/page/visitorIpManagement/main-form-10.svg"
                className="w-5"
                alt="Filter"
              />
              Priority: {selectedPriority}
            </button>
            {showPriorityFilter && (
              <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                {priorityOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                    onClick={() => handleFilterSelect('priority', option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => dispatch(toggleCategoryFilter())}
              className="flex items-center gap-2 text-sm text-blue-800 border-2 border-blue-800 px-3 py-2.5 rounded-[6px] hover:bg-blue-100"
            >
              <img
                src="/page/visitorIpManagement/main-form-10.svg"
                className="w-5"
                alt="Filter"
              />
              Category: {selectedCategory}
            </button>
            {showCategoryFilter && (
              <div className="absolute z-10 mt-2 bg-white shadow-md rounded w-40">
                {categoryOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-slate-900 text-sm"
                    onClick={() => handleFilterSelect('category', option)}
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
              {selectedDate ? selectedDate : "Select Date"}
              <img
                src="/page/visitorIpManagement/main-form-11.svg"
                className="w-5"
                alt="Calendar"
              />
            </button>
            {showCalendar && (
              <div className="absolute z-10 mt-2">
                <DatePicker
                  selected={calendarDate}
                  onChange={handleCalendarChange}
                  inline
                />
              </div>
            )}
          </div>
        </div>

        <button className="px-6 py-2.5 text-base font-semibold rounded-md bg-slate-900 text-neutral-50 max-md:px-5">
          Create New Ticket
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

      {/* Summary Cards */}
      <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-blue-600 text-sm font-medium">Total Tickets</div>
          <div className="text-2xl font-bold text-blue-900">{totalTickets}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-yellow-600 text-sm font-medium">Open</div>
          <div className="text-2xl font-bold text-yellow-900">
            {tickets.filter(t => t.status === 'Open').length}
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-orange-600 text-sm font-medium">In Progress</div>
          <div className="text-2xl font-bold text-orange-900">
            {tickets.filter(t => t.status === 'In Progress').length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-600 text-sm font-medium">Resolved</div>
          <div className="text-2xl font-bold text-green-900">
            {tickets.filter(t => t.status === 'Resolved').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <TicketsListTable data={paginatedData} loading={loading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-end px-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default MainForm;
