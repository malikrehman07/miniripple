import React, { useState, useCallback, useEffect } from "react";

/**
 * Props:
 * - initialAction: "monitor" | "block" (optional, if you already know server state)
 * - className: optional wrapper classes
 */
export default function VpnToggle({ initialAction = "block", className = "" }) {
  // monitor => enabled (true), block => disabled (false)
  const [enabled, setEnabled] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "";
  const url = `${API_BASE}api/v2/visitor-ip-management/toggle-vpn`;
  const statusUrl = `${API_BASE}api/v2/visitor-ip-management/vpn-status`;

  const postToggle = useCallback(
    async (nextEnabled) => {
      setPending(true);
      setError("");
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ action: nextEnabled }), // true => enable, false => disable
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // Server returns: data.action: "monitor" | "block"
        const serverEnabled = json?.data?.action === "monitor";
        setEnabled(serverEnabled);
      } catch (e) {
        // Revert UI on failure
        setEnabled((prev) => !prev);
        setError("Failed to update VPN state. Please try again.");
        console.error("Toggle VPN error:", e);
      } finally {
        setPending(false);
      }
    },
    [url]
  );

  const onToggle = () => {
    if (pending) return;
    const next = !enabled;
    // optimistic UI
    setEnabled(next);
    postToggle(next);
  };

  useEffect(() => {
    const res = async () => {
      try {
        const res = await fetch(statusUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // Server returns: data.action: "monitor" | "block"
        const serverEnabled = json?.data?.action === "monitor";
        setEnabled(serverEnabled);
      } catch (e) {
        setError("Failed to fetch VPN state. Please try again.");
        console.error("Fetch VPN state error:", e);
      }
    };
    res();
  },[])

  return (
    <div className={`flex items-center gap-1 sm:gap-3 justify-between p-2 sm:p-4 rounded-xl bg-[#EEF3FB] ${className}`}>
      <label htmlFor="vpn-toggle" className="text-[12px] sm:text-[12px] font-semibold text-slate-900">
        Enable VPN
      </label>

      <div className="flex flex-col gap-2">
        {
          enabled === null ? (
            <div className="h-6 w-11 rounded-full bg-slate-200 animate-pulse" />
          ) : <button
                id="vpn-toggle"
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label="Enable VPN"
                onClick={onToggle}
                disabled={pending}
                className={[
                  "relative inline-flex h-4 sm:h-6 w-11 items-center rounded-full transition-colors",
                  enabled ? "bg-blue-600" : "bg-slate-300",
                  pending ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-block h-5 w-5 transform rounded-full bg-white transition",
                    enabled ? "translate-x-6" : "translate-x-1",
                  ].join(" ")}
                />
              </button>
        }
        {/* Accessible switch (checkbox under the hood) */}
      

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      </div>
    </div>
  );
}
