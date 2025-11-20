import React from 'react';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPrevPage, 
    onNextPage, 
    itemsPerPage = 10, 
    totalItems = 0,
    loading = false 
}) => {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // ✅ hide pagination if no items OR total items fit on one page
    const showPagination = totalItems > itemsPerPage;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-700">
                    {loading ? (
                        <span>Loading...</span>
                    ) : totalItems === 0 ? (
                        <span>No items to display</span>
                    ) : (
                        <span>
                            Showing <span className="font-medium">{startItem}</span> to{' '}
                            <span className="font-medium">{endItem}</span> of{' '}
                            <span className="font-medium">{totalItems}</span> results
                        </span>
                    )}
                </div>

                {/* ✅ Only show when needed */}
                {showPagination && (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onPrevPage}
                            disabled={currentPage === 1 || loading}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        <span className="px-3 py-1 text-sm font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        
                        <button
                            onClick={onNextPage}
                            disabled={currentPage === totalPages || loading}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pagination;
