import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarNavItem from "./SidebarNavItem";

const SidebarSettings = ({ isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.includes("admin");
  const settingsPath = isAdmin ? "/admin/profile" : "/user/profile";

  const handleLogoutClick = () => {
    // Mark app-initiated logout
    sessionStorage.setItem("logoutIntent", "1");
    navigate("/logout", { replace: true, state: { logout: true } });
  };

  return (
    <section
      className={`${isCollapsed ? "px-0" : "px-5"} mt-48 w-full text-sm tracking-tight leading-none text-neutral-300 transition-all duration-300`}
    >
      <div className={`w-full bg-blue-700 bg-opacity-20 ${isCollapsed ? "" : "rounded-lg"} transition-all duration-300`}>
        <SidebarNavItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/07a0d539f713485c89d8da6a2747ca95b272ad66?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
          text={isAdmin ? "Admin Settings" : "Settings"}
          isActive={location.pathname === settingsPath}
          isCollapsed={isCollapsed}
          path={settingsPath}
          disabled={false}
        />

        <button
          onClick={handleLogoutClick}
          className={`w-full text-left ${isCollapsed ? "px-2 py-2" : "px-4 py-3"} hover:bg-blue-700/30 transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d43d8b7ed8032487e0f92789ffe35970813b903a?placeholderIfAbsent=true&apiKey=a02d722199b0461aa7ba98c60ba9c66b"
              alt=""
              className="w-4 h-4"
            />
            <span className={`${isCollapsed ? "hidden" : "inline"} text-neutral-100`}>Log Out</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default SidebarSettings;
