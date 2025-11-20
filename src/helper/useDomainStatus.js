// src/helpers/useDomainStatus.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

export const useDomainStatus = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | active | inactive | error

  const fetchStatus = async () => {
    setStatus("loading");

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // If user is not logged in, treat as inactive
      if (!currentUser) {
        setStatus("inactive");
        return;
      }

      const token = await currentUser.getIdToken(true);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const domainStatus = res?.data?.data?.domainStatus;

      if (domainStatus === "active") {
        setStatus("active");
      } else if (domainStatus === "inactive" || domainStatus === "missing") {
        setStatus("inactive");
      } else {
        // Unexpected status or undefined
        console.warn("⚠️ Unexpected or missing domain status. Defaulting to inactive.");
        setStatus("inactive");
      }
    } catch (error) {
      console.warn("⚠️ Domain check failed. Defaulting to inactive.");
      // Avoid throwing or flooding console
      setStatus("inactive");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const isConnected = status === "active";

  return { status, isConnected };
};
