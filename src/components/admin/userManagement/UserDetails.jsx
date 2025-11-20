import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { X, Building, CreditCard, User, Calendar, Mail, Phone } from "lucide-react";
import {
  selectSelectedUser,
  selectUserProperties,
  selectUserSubscription,
  selectDetailsLoading,
  selectDetailsError,
} from "@/redux/slices/userManagementSlice";
import { clearUser } from "@/redux/actions/userManagementActions";

const UserDetails = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const selectedUser = useSelector(selectSelectedUser);
  const userProperties = useSelector(selectUserProperties);
  const userSubscription = useSelector(selectUserSubscription);
  const detailsLoading = useSelector(selectDetailsLoading);
  const detailsError = useSelector(selectDetailsError);

  const handleClose = () => {
    dispatch(clearUser());
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy, HH:mm");
    } catch (error) {
      return dateString || "N/A";
    }
  };

  const getStatusBadge = (isActive) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        isActive 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800"
      }`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: "bg-purple-100 text-purple-800",
      "super admin": "bg-red-100 text-red-800",
      user: "bg-blue-100 text-blue-800",
      "power user": "bg-yellow-100 text-yellow-800",
      "support agent": "bg-green-100 text-green-800",
      "guest user": "bg-gray-100 text-gray-800",
    };

    const color = roleColors[role?.toLowerCase()] || "bg-gray-100 text-gray-800";
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        {role || "N/A"}
      </span>
    );
  };

  if (!selectedUser) {
    return null;
  }

  if (detailsLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg">Loading user details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-red-600">Error Loading User Details</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-red-600 mb-4">{detailsError}</p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Information */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{selectedUser.email}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">Role:</span>
                  {getRoleBadge(selectedUser.role)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">Status:</span>
                  {getStatusBadge(selectedUser.isActive)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">
                    Joined: {formatDate(selectedUser.createdAt)}
                  </span>
                </div>
                
                {selectedUser.updatedAt && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">
                      Updated: {formatDate(selectedUser.updatedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Additional Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">User ID:</span>
                  <span className="text-gray-700 font-mono text-sm">
                    {selectedUser._id}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">Phone:</span>
                  <span className="text-gray-700">
                    {selectedUser.phoneNumber || "Not provided"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">Country:</span>
                  <span className="text-gray-700">
                    {selectedUser.country || "Not provided"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-20">State:</span>
                  <span className="text-gray-700">
                    {selectedUser.state || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Properties ({userProperties.length})
            </h3>
            
            {userProperties.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userProperties.map((property, index) => (
                    <div key={property._id || index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Property ID</span>
                          <span className="text-sm font-mono text-gray-900">{property.propertyId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Domain</span>
                          <span className="text-sm text-gray-900">{property.domain}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Status</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No properties found for this user</p>
              </div>
            )}
          </div>

          {/* Subscription Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Subscription
            </h3>
            
            {userSubscription ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Plan</span>
                        <span className="text-sm font-medium text-gray-900">
                          {userSubscription.planName || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          userSubscription.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {userSubscription.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Start Date</span>
                        <span className="text-sm text-gray-900">
                          {userSubscription.startDate ? formatDate(userSubscription.startDate) : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">End Date</span>
                        <span className="text-sm text-gray-900">
                          {userSubscription.endDate ? formatDate(userSubscription.endDate) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No active subscription found</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
