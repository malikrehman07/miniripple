import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/sidebar/Sidebar";
import Topnav from "@/components/navbar/Topnav";

// ⛔️ Remove the global CSS import:
// import "@/styles/old-app.css";

// ✅ Dynamically attach old-app CSS while this layout is mounted
import oldAppCssUrl from "@/styles/old-app.css?url";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const topnavRef = useRef();
  const location = useLocation();

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
        {/* Force re-render on route change if you need it */}
        <div key={`${location.pathname}-${location.search}`} className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
