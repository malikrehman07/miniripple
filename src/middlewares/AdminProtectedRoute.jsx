// src/components/AdminProtectedRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "@/redux/slices/userProfileSlice";
import { useEffect } from "react";
import { loadUserProfile } from "@/redux/actions/userProfileActions";

const AdminProtectedRoute = ({ children }) => {
    const location = useLocation();
    const profile = useSelector(selectUserProfile);
    const loading = profile.firstName === ""; // or add a "loading" flag from your auth state if available
    const dispatch = useDispatch();
    console.log(profile)
    // Show loader while profile is being checked

    useEffect(() => {
        console.log("🟢 ProfileDetails mounted");
        // Load user profile on component mount
        dispatch(loadUserProfile());

        return () => {
            console.log("🔴 ProfileDetails unmounted");
        };
    }, [dispatch]);
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="text-base text-gray-600">Loading...</span>
                </div>
            </div>
        );
    }

    // If no profile or role is not admin, block access
    if (!profile || profile.role !== "admin") {
        return (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        );
    }

    // ✅ User is authenticated as admin → render children
    return children;
};

export default AdminProtectedRoute;