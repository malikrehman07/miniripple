import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import TopNavBar from "./TopNavBar";
import MobileNav from "./MobileNav";
import { useAuth } from "@/middlewares/authContext";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showTopNav, setShowTopNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const topNavRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileToggleButtonRef = useRef(null);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItemClass = (matchPath) =>
    `gap-3 self-stretch px-4 md:py-8 lg:py-8 h-full whitespace-nowrap max-md:px-5 ${
      path === matchPath
        ? "text-white font-semibold bg-blue-700 bg-opacity-20 border-b-[6px] border-b-[#245BD1]"
        : "text-neutral-50 hover:bg-blue-600 hover:bg-opacity-10"
    }`;

  // Close mobile menu on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (
        showMobileMenu &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target) &&
        mobileToggleButtonRef.current &&
        !mobileToggleButtonRef.current.contains(e.target)
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showMobileMenu]);

  // Close top nav on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (
        showTopNav &&
        topNavRef.current &&
        !topNavRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setShowTopNav(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showTopNav]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (
        showProfileDropdown &&
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showProfileDropdown]);

  const avatarSrc = user?.photoURL || "";
  const displayName = user?.displayName || user?.name || "User";

  return (
    <nav className="flex flex-wrap w-full md:w-full lg:w-[95%] sm:gap-0 md:gap-6 lg:gap-10 justify-center items-center md:px-5 lg:px-6 md:mx-0 lg:mx-6 text-base rounded-none md:rounded-none border-b-[#FBD020] border-b-[2px] md:border-b-[#FBD020] md:border-b-[2px] lg:border-none lg:rounded-3xl shadow-md shadow-[#0007] bg-[#011732B3] backdrop-blur-xl fixed top-0 md:top-0 lg:top-[38px] z-[100] font-['Jost'] max-w-[1240px] max-md:px-5 max-md:max-w-full">
      {/* Top-nav toggle for md */}
      <div
        ref={toggleButtonRef}
        className="hidden sm:hidden md:block lg:hidden"
        onClick={() => setShowTopNav((p) => !p)}
      >
        {/* your existing SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
          <path
            d="M37.5 32.8125C38.2223 32.8129..."
            fill="#DFEDFA"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex-1 md:flex-1 lg:flex-grow-0">
        <Link to="/">
          <img
            src="/landing/logo.png"
            className="object-contain shrink-0 my-auto mr-[94px] aspect-[3.88] max-w-[120px]"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex overflow-hidden flex-wrap pr-6 h-full rounded-3xl border-2 border-solid border-[#FBD020] min-w-60 max-md:max-w-full">
        <div className="flex my-auto whitespace-nowrap min-w-60">
          <Link to="/" className={navItemClass("/")}>
            Home
          </Link>
          <Link to="/pricing" className={navItemClass("/pricing")}>
            Pricing
          </Link>
          <Link to="/support" className={navItemClass("/support")}>
            Support
          </Link>
        </div>

        {/* PROFILE DROPDOWN */}
        {user ? (
          <div className="relative flex items-center ml-auto">
            <button
              ref={profileButtonRef}
              onClick={() => setShowProfileDropdown((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-600 hover:bg-opacity-10 rounded"
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-neutral-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
              <span className="text-neutral-50">{displayName}</span>
              {/* down arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-neutral-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showProfileDropdown && (
              <div
                ref={profileRef}
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 overflow-hidden"
              >
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-6 h-full ml-auto">
            <Link to="/login" className={navItemClass("/login")}>
              Login
            </Link>
            <Link to="/register" className="self-stretch my-auto text-600 text-[#011732]">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Tablet View Buttons */}
      <div className="hidden sm:hidden md:flex lg:hidden gap-6 h-full">
        {user ? (
          <>
            <Link to="/dashboard" className={navItemClass("/dashboard")}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="self-stretch my-auto text-neutral-50 hover:bg-blue-600 hover:bg-opacity-10 whitespace-nowrap px-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={navItemClass("/login")}>
              Login
            </Link>
            <Button variant="primary" className="self-stretch my-auto text-600 text-[#011732]">
              Sign Up
            </Button>
          </>
        )}
      </div>

      {/* TopNavBar Dropdown */}
      <div
        ref={topNavRef}
        className={`transition-all duration-300 ease-in-out absolute top-[100%] left-0 z-50 ${
          showTopNav ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <TopNavBar />
      </div>

      {/* Mobile toggle */}
      <div
        ref={mobileToggleButtonRef}
        className="block md:hidden py-4"
        onClick={() => setShowMobileMenu((p) => !p)}
      >
        {/* your existing mobile SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M23.3332 20.4168C23.7826 20.4171..."
            fill="#F5FAFF"
          />
        </svg>
      </div>

      {/* MobileNav */}
      <div
        ref={mobileNavRef}
        className={`transition-all duration-300 ease-in-out fixed top-[100%] right-0 z-50 w-full max-w-[242px] ${
          showMobileMenu
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-[-242px] pointer-events-none"
        }`}
      >
        <MobileNav onClose={() => setShowMobileMenu(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
