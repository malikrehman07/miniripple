import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Handles Google/Facebook login.
 * - On success: stores token, navigates to /dashboard
 * - On popup cancel: shows a top-right toast for 3s (no inline DOM)
 * - On other errors: shows a toast with the message
 */
const useSocialLogin = () => {
  const navigate = useNavigate();

  const handleSocialLogin = async (provider, backendUrl, successMessage = "Logged in!") => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken }),
      });

      await user.reload();
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        closeOnClick: true,
      });

      navigate("/dashboard");
    } catch (error) {
      // Handle popup cancel silently with a small toast
      if (error?.code === "auth/popup-closed-by-user") {
        toast.info("Login cancelled.", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          closeOnClick: true,
        });
        return;
      }

      // Network or other errors
      toast.error(error?.message || "Social login failed. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  return { handleSocialLogin };
};

export default useSocialLogin;
