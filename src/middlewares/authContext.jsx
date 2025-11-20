import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";

import { store } from "@/redux/store";
import { resetAppState } from "@/redux/appReset";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const lastUidRef = useRef(null);

  const configurePersistence = async (shouldKeepLoggedIn) => {
    const persistence = shouldKeepLoggedIn
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
    setKeepLoggedIn(shouldKeepLoggedIn);
  };

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload();
          const token = await firebaseUser.getIdToken(true);

          // If a different user logs in, reset app-scoped state
          if (lastUidRef.current && lastUidRef.current !== firebaseUser.uid) {
            store.dispatch(resetAppState());
          }
          lastUidRef.current = firebaseUser.uid;

          const userObj = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || "",
          };

          setUser(userObj);
          setAuthToken(token);

          // keep only non-user settings
          const theme = localStorage.getItem("theme");
          localStorage.clear();
          if (theme) localStorage.setItem("theme", theme);

          localStorage.setItem("user", JSON.stringify(userObj));
          localStorage.setItem("token", token);
        } catch (e) {
          console.error("Error refreshing user state:", e);
        }
      } else {
        // fully signed out
        lastUidRef.current = null;
        setUser(null);
        setAuthToken(null);

        store.dispatch(resetAppState());

        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme) localStorage.setItem("theme", theme);
        sessionStorage.clear();
      }
      setLoading(false);
      // if we were signing out, the auth listener has now finished
      if (isSigningOut) setIsSigningOut(false);
    });

    const unsubToken = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setAuthToken(token);
          localStorage.setItem("token", token);
        } catch (e) {
          console.warn("onIdTokenChanged → getIdToken failed:", e?.message);
        }
      }
    });

    return () => {
      unsubAuth();
      unsubToken();
    };
  }, [isSigningOut]);

  const updateUserData = (patch) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...patch };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const logout = async () => {
    // Make logout synchronous to the app: immediately drop local auth state.
    try {
      setIsSigningOut(true);
      setUser(null);
      setAuthToken(null);

      store.dispatch(resetAppState());

      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme) localStorage.setItem("theme", theme);
      sessionStorage.clear();

      await signOut(auth);
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        loading,
        keepLoggedIn,
        isSigningOut,
        configurePersistence,
        updateUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
};
