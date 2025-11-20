import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../middlewares/authContext";

const SidebarNavItem = ({
    icon,
    text,
    isActive = false,
    isCollapsed = false,
    path = "#",
    disabled = true,
}) => {
    const navigate = useNavigate();
    // const logout = useAuth().logout();
    const { logout } = useAuth();
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/login");
    };


    if (path === "/login") {
        return (
            <a
                href="/login"
                onClick={handleLogout}
                className={`flex gap-2 items-center ${isCollapsed ? "justify-start" : "justify-start"} 
            px-4 py-2.5 cursor-pointer mt-2 w-full text-sm tracking-tight leading-none border-l-4 
            font-['Amble'] transition-all duration-300 ease-in-out
            text-neutral-300 ease-in-out hover:bg-gradient-to-r hover:from-[rgba(36,91,209,0.20)] hover:to-transparent hover:border-[#245BD1]`}
                title={isCollapsed ? text : ""}
            >
                <div
                    className={`flex ${isCollapsed ? "justify-start" : "flex-1"} shrink gap-2 items-center self-stretch my-auto ${isCollapsed ? "w-auto" : "w-full"} ${!isCollapsed && text.length > 20 ? "min-w-60" : ""} ${isCollapsed ? "basis-auto" : "basis-0"} transition-all duration-300 ease-in-out`}
                >
                    <img
                        src={icon}
                        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square transition-all duration-300"
                        alt=""
                    />
                    <p
                        className={`self-stretch my-auto transition-all duration-300 text-nowrap ease-in-out ${isCollapsed ? "w-0 max-w-0 opacity-0 overflow-hidden" : "w-auto max-w-full opacity-100"}`}
                    >
                        {text}
                    </p>
                </div>
            </a>
        );
    }

    return (
        <NavLink
            to={disabled ? "#" : path}
            className={({ isActive: active }) => `flex gap-2 items-center ${isCollapsed ? "justify-start" : "justify-start"} 
            px-4 py-2.5 cursor-pointer mt-2 w-full text-sm tracking-tight leading-none border-l-4 
            font-['Amble'] transition-all duration-300 ease-in-out
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${active ? "border-[#245BD1] bg-[rgba(36,91,209,0.20)] font-semibold text-white" : "border-[#0000]"} text-neutral-300 ease-in-out hover:bg-gradient-to-r hover:from-[rgba(36,91,209,0.20)] hover:to-transparent hover:border-[#245BD1]`}
            title={isCollapsed ? text : ""}
            onClick={(e) => { if (disabled) e.preventDefault(); }}
        >
            <div
                className={`flex ${isCollapsed ? "justify-start" : "flex-1"} shrink gap-2 items-center self-stretch my-auto ${isCollapsed ? "w-auto" : "w-full"} ${!isCollapsed && text.length > 20 ? "min-w-60" : ""} ${isCollapsed ? "basis-auto" : "basis-0"} transition-all duration-300 ease-in-out`}
            >
                <img
                    src={icon}
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square transition-all duration-300"
                    alt=""
                />
                <p
                    className={`self-stretch my-auto transition-all duration-300 text-nowrap ease-in-out ${isCollapsed ? "w-0 max-w-0 opacity-0 overflow-hidden" : "w-auto max-w-full opacity-100"}`}
                >
                    {text}
                </p>
            </div>
        </NavLink>
    );
};

export default SidebarNavItem;
