import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/middlewares/authContext";

const LogoutRoute = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const intent = sessionStorage.getItem("logoutIntent") === "1";
    const stateOK = location.state?.logout === true;
    sessionStorage.removeItem("logoutIntent");

    if (!intent || !stateOK) {
      if (user) navigate("/dashboard", { replace: true });
      else navigate("/login", { replace: true });
      return;
    }

    (async () => {
      try {
        await logout();
      } finally {
        // ✅ Use query param so it survives any intermediate states
        navigate("/login?loggedOut=1", { replace: true });
      }
    })();
  }, [logout, navigate, location.state, user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-600">Signing you out…</div>
    </div>
  );
};

export default LogoutRoute;
