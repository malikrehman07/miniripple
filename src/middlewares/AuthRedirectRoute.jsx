import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { Loader2 } from "lucide-react";

const AuthRedirectRoute = ({ children }) => {
  const { user, loading, isSigningOut } = useAuth();

  // While loading OR signing out, don't bounce the user around.
  if (loading || isSigningOut) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-base text-gray-600">Loading…</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRedirectRoute;
