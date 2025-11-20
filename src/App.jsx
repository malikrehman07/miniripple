import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { ConfigProvider } from "antd";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import NotFoundPage from "./pages/NotFound";

import Dashboard from "./pages/User/Dashboard";
import VisitorIPManagement from "./pages/User/VisitorIPManagement";
import TrafficAnalytics from "./pages/User/TrafficAnalytics";
import SecurityThreatDetection from "./pages/User/SecurityThreatDetection";
import DeviceBrowserInsights from "./pages/User/DeviceBrowserInsights";
import BlockedSuspiciousActivityLog from "./pages/User/BlockedSuspiciousActivityLog";
import AccountSubscriptionManagement from "./pages/User/AccountSubscriptionManagement";
import UserProfile from "./pages/User/UserProfile";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import AccessControl from "./pages/Admin/AccessControl";
import Tickets from "./pages/Admin/Tickets";
import SystemLogs from "./pages/Admin/SystemLogs";
import AdminProfile from "./pages/Admin/AdminProfile";

import ProtectedRoute from "./middlewares/ProtectedRoute";
import ResetPassword from "./components/auth/ResetPasswordForm";
import ForgotPassword from "./pages/Auth/forgot-password";
import LegalTerms from "./pages/User/LegalTerms";
import { NotificationProvider } from "./components/reusable/notifications";
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminProtectedRoute from "./middlewares/AdminProtectedRoute";
import AuthRedirectRoute from "./middlewares/AuthRedirectRoute";
import SetPasswordForm from "./components/auth/SetPassword";
import LogoutRoute from "./pages/Auth/LogoutRoute";

/* Marketing chrome */
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

/* Ant Design theme */
import customTheme from "./styles/theme";

/* Feature pages (marketing) */
import AdFraud from "./pages/Features/AdFraud/AdFraud";
import BotProtection from "./pages/Features/BotProtection/BotProtection";
import SuspiciousActivity from "./pages/Features/SuspiciousActivity/SuspiciousActivity";
import DeviceControl from "./pages/Features/DeviceControl/DeviceControl";
import Monitoring from "./pages/Features/Monitoring/Monitoring";
import Analytics from "./pages/Features/Analytics/Analytics";

/* Scoped marketing styles */
import "./styles/marketing.css";
import Faqs from "./pages/Faqs";
import ReferralProgram from "./pages/ReferralProgram";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/Termsofuse";

/* -------------------------------------------- */
/* Public Layout Shell (Header/Footer toggling) */
/* -------------------------------------------- */
function PublicChrome({ children }) {
  const location = useLocation();

  const appPrefixes = [
    "/dashboard",
    "/visitor-ip-management",
    "/traffic-analytics",
    "/security-threat-detection",
    "/device-browser-insights",
    "/blocked-suspicious-activity",
    "/account-subscription",
    "/user",
    "/admin",
  ];

  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/sign-in",
    "/sign-up",
    "/set-password",
    "/logout",
  ];

  const isIn = (p) =>
    location.pathname === p || location.pathname.startsWith(p + "/");

  const isAppArea = appPrefixes.some(isIn);
  const isAuth = authPaths.includes(location.pathname);

  const useMarketingShell = !isAppArea || isAuth;
  const showHeaderFooter = !isAppArea && !isAuth;

  return (
    <div className={useMarketingShell ? "marketing" : "app-shell"}>
      {showHeaderFooter && <Header />}
      <main className={useMarketingShell ? "marketing-inner" : undefined}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

/* -------------------------------------------- */
/*                App Component                  */
/* -------------------------------------------- */
const App = () => (
  <NotificationProvider>
    <ConfigProvider getPopupContainer={(node) => document.querySelector('.marketing') || node?.parentElement || document.body}>
      <Router>
        <PublicChrome>
          <Routes>
            {/* ----------------------------- */}
            {/* Marketing/Public Routes       */}
            {/* ----------------------------- */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms" element={<LegalTerms />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/referral" element={<ReferralProgram />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />

            {/* ----------------------------- */}
            {/* Auth Routes                   */}
            {/* ----------------------------- */}
            <Route
              path="/register"
              element={
                <AuthRedirectRoute>
                  <SignUp />
                </AuthRedirectRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRedirectRoute>
                  <SignIn />
                </AuthRedirectRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/*" element={<ResetPassword />} />
            <Route
              path="/sign-in"
              element={
                <AuthRedirectRoute>
                  <SignIn />
                </AuthRedirectRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <AuthRedirectRoute>
                  <SignUp />
                </AuthRedirectRoute>
              }
            />
            <Route
              path="/set-password"
              element={
                <ProtectedRoute>
                  <SetPasswordForm />
                </ProtectedRoute>
              }
            />
            <Route path="/logout" element={<LogoutRoute />} />
            {/* ----------------------------- */}
            {/* Feature Pages (Marketing)     */}
            {/* ----------------------------- */}
            <Route path="/features/ad-fraud" element={<AdFraud />} />
            <Route path="/features/bot-protection" element={<BotProtection />} />
            <Route
              path="/features/suspicious-activity"
              element={<SuspiciousActivity />}
            />
            <Route path="/features/device-control" element={<DeviceControl />} />
            <Route path="/features/monitoring" element={<Monitoring />} />
            <Route path="/features/analytics" element={<Analytics />} />

            {/* ----------------------------- */}
            {/* User Area (Fully Protected)   */}
            {/* ----------------------------- */}
            <Route
              element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/visitor-ip-management" element={<VisitorIPManagement />} />
              <Route path="/traffic-analytics" element={<TrafficAnalytics />} />
              <Route
                path="/security-threat-detection"
                element={<SecurityThreatDetection />}
              />
              <Route
                path="/device-browser-insights"
                element={<DeviceBrowserInsights />}
              />
              <Route
                path="/blocked-suspicious-activity"
                element={<BlockedSuspiciousActivityLog />}
              />
              <Route
                path="/account-subscription"
                element={<AccountSubscriptionManagement />}
              />
              <Route path="/user/profile" element={<UserProfile />} />
            </Route>

            {/* ----------------------------- */}
            {/* Admin Area (Protected)        */}
            {/* ----------------------------- */}
            <Route
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user-management" element={<UserManagement />} />
              <Route path="/admin/access-control" element={<AccessControl />} />
              <Route path="/admin/tickets" element={<Tickets />} />
              <Route path="/admin/system-logs" element={<SystemLogs />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>

            {/* ----------------------------- */}
            {/* 404 Fallback                  */}
            {/* ----------------------------- */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PublicChrome>
      </Router>
    </ConfigProvider>
  </NotificationProvider>
);

export default App;
