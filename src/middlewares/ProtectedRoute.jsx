// src/middlewares/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./authContext";
import { selectUserProfile } from "@/redux/slices/userProfileSlice";
import { loadUserProfile } from "@/redux/actions/userProfileActions";
import { checkSubscriptionAndRedirect } from "@/helper/subscriptionCheck";

const ProtectedRoute = ({ children }) => {
  const { user, loading: userLoading, authToken: idToken, isSigningOut } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  const [checkingSubscription, setCheckingSubscription] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const hasCheckedSubscription = useRef(false);
  const profileLoadedOnce = useRef(false);

  // Always call hooks; gate logic INSIDE effects.
  useEffect(() => {
    if (!isSigningOut && user && idToken && !profileLoadedOnce.current) {
      profileLoadedOnce.current = true;
      dispatch(loadUserProfile());
    }
  }, [dispatch, user, idToken, isSigningOut]);

  useEffect(() => {
    const verify = async () => {
      if (
        isSigningOut ||
        !user ||
        !idToken ||
        profile?.role === "admin" ||
        !profile?.firstName ||
        hasCheckedSubscription.current
      ) {
        return;
      }

      hasCheckedSubscription.current = true;
      setCheckingSubscription(true);
      try {
        const ok = await checkSubscriptionAndRedirect();
        setHasSubscription(ok);
      } catch (e) {
        console.error("Subscription check failed:", e);
        setHasSubscription(false);
      } finally {
        setCheckingSubscription(false);
      }
    };
    verify();
  }, [user, idToken, profile, isSigningOut]);

  // Now it is safe to early-return (all hooks above have been called this render).
  if (isSigningOut) {
    return <Navigate to="/login" replace />;
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-base text-gray-600">Checking authentication…</span>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (profile?.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  if (checkingSubscription || !profile?.firstName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-base text-gray-600">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  if (!hasSubscription && profile?.role !== "admin") {
    return null; // redirected by checkSubscriptionAndRedirect
  }

  return children;
};

export default ProtectedRoute;
