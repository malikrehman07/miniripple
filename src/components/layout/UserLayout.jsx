import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Topnav from "@/components/navbar/Topnav";

// ⛔️ Remove the global CSS import:
// import "@/styles/old-app.css";

// ✅ Load the built CSS file URL and attach it at runtime for this layout only
import oldAppCssUrl from "@/styles/old-app.css?url";

function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const topnavRef = useRef();
  const location = useLocation();

  // Inject old-app (Tailwind base) stylesheet only while this layout is mounted
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = oldAppCssUrl;
    link.dataset.oldAppStyles = "true";
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        (!topnavRef.current || !topnavRef.current.contains(e.target))
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-svh flex items-start">
      <Sidebar ref={sidebarRef} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1">
        <Topnav ref={topnavRef} onMenuClick={() => setSidebarOpen(true)} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
