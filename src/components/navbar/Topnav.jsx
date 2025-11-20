import React, { forwardRef } from "react";
import NotificationIcon from "./NotificationIcon";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { useAuth } from "../../middlewares/authContext";

const Topnav = forwardRef(({ title, onMenuClick }, ref) => {
    const location = useLocation();
    const { user: authUser } = useAuth();
    
    // Get user data from Redux userProfile state
    const { profile } = useSelector((state) => state.userProfile);
    
    // Combine auth user data with profile data
    // Profile data takes precedence as it's more up-to-date
    const userData = {
        ...authUser,
        ...profile,
        // Ensure we have the latest name from profile
        firstName: profile?.firstName || authUser?.firstName,
        lastName: profile?.lastName || authUser?.lastName,
        displayName: profile?.firstName && profile?.lastName 
            ? `${profile.firstName} ${profile.lastName}`
            : authUser?.displayName
    };
    
    // Get username with proper fallbacks
    const username = userData?.firstName && userData?.lastName 
        ? `${userData.firstName} ${userData.lastName}`
        : userData?.displayName || userData?.name || "Unnamed";

    // Function to construct profile picture URL
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const getProfilePictureUrl = (picture) => {
        if (!picture) return "";
        
        if (picture.startsWith('https://')) {
            // Google profile picture
            return picture;
        } else if (picture.startsWith('/uploads/')) {
            // Hosted picture - construct full URL
            return `${API_BASE_URL}${picture}`;
        } else if (picture.startsWith('data:')) {
            // Data URL (for preview)
            return picture;
        } else {
            // Fallback
            return picture;
        }
    };

    const pathMap = {
        "/dashboard": "Dashboard Overview",
        "/traffic-analytics": "Traffic Analytics",
        "/security-threat-detection": "Security & Threat Detection",
        "/visitor-ip-management": "Visitor & IP Management",
        "/device-browser-insights": "Device & Browser Insights",
        "/blocked-suspicious-activity": "Blocked & Suspicious Activity Log",
        "/account-subscription": "Account & Subscription Management",
        "/user/profile": "Settings",
        "/admin/dashboard": "Admin Dashboard Overview",
        "/admin/user-management": "User Management",
        "/admin/access-control": "Access Control",
        "/admin/tickets": "Tickets",
        "/admin/system-logs": "System Logs",
        "/admin/profile": "Admin Settings"
    };

    const cleanPath = location.pathname.replace(/\/$/, "");
    title = pathMap[cleanPath] || "";

    return (
        <div ref={ref} className="flex sticky top-0 z-[30]">
            {/* Sidebar toggle for small screens */}
            <nav
                className="lg:hidden flex items-center px-2 py-2 bg-slate-900"
                onClick={onMenuClick}
            >
                <img
                    src="/landing/top-navbar-1.svg"
                    alt="Menu icon"
                    className="object-contain w-6 h-6"
                />
            </nav>

            <header className="flex flex-1 flex-wrap items-center justify-between px-4 py-3 lg:py-6 bg-white/20 backdrop-blur-md shadow-md">
                <h1 className="text-lg lg:text-xl font-bold text-slate-900 font-['Amble'] text-center w-full lg:w-auto mb-2 lg:mb-0">
                    {title}
                </h1>

                <section className="flex gap-4 items-center w-full lg:w-auto justify-end">
                    <UserProfile
                        avatarSrc={getProfilePictureUrl(userData?.picture)}
                        userName={username}
                        userRole={userData?.role || "User"}
                        dropdownIconSrc=""
                    />
                </section>
            </header>
        </div>
    );
});

export default Topnav;
