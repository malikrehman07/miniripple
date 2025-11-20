// ✅ SnippetGuideModal.jsx — fixed & paste-ready
// - Success state now keys off snippet.verified / snippet.status === 'verified'
// - Works with your /api/v2/domain/status payload
// - Polls until detected, shows times, and aligns badges

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Copy, ExternalLink } from "lucide-react";
import Button from "../../public/Button";
import { useAuth } from "../../../middlewares/authContext";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useNotifications } from "@/hooks/useNotifications";

// ------------------------- API ------------------------- //
const API = {
    fetchSnippet: async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) return "";

            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/tracking/snippet`,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            return res.data?.data?.snippet || "";
        } catch (error) {
            console.error("Failed to fetch tracking snippet", error);
            return "";
        }
    },

    // Normalize the backend response so UI logic stays simple
    verifyOnce: async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                return {
                    domainStatus: "pending",
                    detected: false,
                    snippetStatus: "not verified",
                    firstPingAt: null,
                    lastPingAt: null,
                    lastChecked: null,
                };
            }

            const token = await currentUser.getIdToken();
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/domain/status`,
                { headers: { Authorization: `Bearer ${token}` } },
            );

            const data = res.data?.data || {};
            const snippet = data.snippet || {};

            const detected =
                snippet.verified === true ||
                (typeof snippet.status === "string" &&
                    snippet.status.toLowerCase() === "verified");

            // API sample has a single pinged_at; use it for both first/last if only one exists
            const firstPingAt = snippet.pinged_at || null;
            const lastPingAt = snippet.pinged_at || null;
            const lastChecked = snippet.lastChecked || null;

            return {
                domainStatus: data.domainStatus || "pending", // e.g. "active"
                detected,
                snippetStatus:
                    snippet.status || (detected ? "verified" : "not verified"),
                firstPingAt,
                lastPingAt,
                lastChecked,
            };
        } catch (error) {
            console.error("Failed to check domain status", error);
            return {
                domainStatus: "pending",
                detected: false,
                snippetStatus: "not verified",
                firstPingAt: null,
                lastPingAt: null,
                lastChecked: null,
            };
        }
    },

    startPolling: ({ onUpdate, intervalMs = 3000 }) => {
        const id = setInterval(async () => {
            try {
                const result = await API.verifyOnce();
                onUpdate(result);
                if (result.detected === true) {
                    clearInterval(id);
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        }, intervalMs);
        return () => clearInterval(id);
    },
};

// ------------------------- UI Helpers ------------------------- //
const StatusBadge = ({ domainStatus, detected }) => {
    if (detected) {
        return (
            <span className="inline-flex items-center gap-2 rounded-md bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Verified
            </span>
        );
    }
    if (domainStatus === "active") {
        return (
            <span className="inline-flex items-center gap-2 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Active
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-2 rounded-md bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            Pending
        </span>
    );
};

// ------------------------- Component ------------------------- //
const SnippetGuideModal = ({ isOpen, onClose, domain, siteId }) => {
    const { user } = useAuth();
    const { notify } = useNotifications();

    const [step, setStep] = useState(1);

    // Snippet //
    const [snippet, setSnippet] = useState("");
    const [snippetLoading, setSnippetLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Install gate //
    const [confirmInstalled, setConfirmInstalled] = useState(false);

    // Verification //
    const [checking, setChecking] = useState(false);
    const [domainStatus, setDomainStatus] = useState("pending");
    const [detected, setDetected] = useState(false);
    const [snippetStatus, setSnippetStatus] = useState("not verified");
    const [firstPingAt, setFirstPingAt] = useState(null);
    const [lastPingAt, setLastPingAt] = useState(null);
    const [lastChecked, setLastChecked] = useState(null);
    const pollStopRef = useRef(null);

    const readyDomain = useMemo(() => domain || "your-domain.com", [domain]);

    useEffect(() => {
        if (!isOpen) return;
        setStep(1);
        setConfirmInstalled(false);
        setDomainStatus("pending");
        setDetected(false);
        setSnippetStatus("not verified");
        setFirstPingAt(null);
        setLastPingAt(null);
        setLastChecked(null);

        let mounted = true;
        (async () => {
            try {
                setSnippetLoading(true);
                const s = await API.fetchSnippet();
                if (mounted) setSnippet(s);

                const statusResult = await API.verifyOnce();
                if (mounted) {
                    setDomainStatus(statusResult.domainStatus);
                    setDetected(statusResult.detected);
                    setSnippetStatus(statusResult.snippetStatus);
                    setFirstPingAt(statusResult.firstPingAt);
                    setLastPingAt(statusResult.lastPingAt);
                    setLastChecked(statusResult.lastChecked);
                }
            } catch {
                if (mounted) setSnippet("// Failed to load tracking snippet.");
            } finally {
                if (mounted) setSnippetLoading(false);
            }
        })();

        return () => {
            mounted = false;
            if (pollStopRef.current) {
                pollStopRef.current();
                pollStopRef.current = null;
            }
        };
    }, [isOpen, siteId, readyDomain]);

    const handleCopy = () => {
        if (!snippet) return;
        navigator.clipboard.writeText(snippet).then(() => {
            setCopied(true);
            notify.copySuccess?.();
            setTimeout(() => setCopied(false), 1500);
        });
    };

    const handleProceedToVerify = () => {
        if (!confirmInstalled) {
            notify.modal?.warning(
                "Confirmation Required",
                "Please confirm that you've inserted the snippet before proceeding.",
            );
            return;
        }
        setStep(2);
    };

    const handleViewSite = () => {
        // Open the user’s site (new tab)
        const protocol =
            window.location.protocol === "http:" ? "http" : "https";
        window.open(
            `${protocol}://${readyDomain}`,
            "_blank",
            "noopener,noreferrer",
        );

        // Start polling verification (stop previous if any)
        if (pollStopRef.current) pollStopRef.current();
        pollStopRef.current = API.startPolling({
            onUpdate: ({
                domainStatus,
                detected,
                snippetStatus,
                firstPingAt,
                lastPingAt,
                lastChecked,
            }) => {
                setDomainStatus(domainStatus);
                setDetected(detected);
                setSnippetStatus(snippetStatus);
                setFirstPingAt(firstPingAt);
                setLastPingAt(lastPingAt);
                setLastChecked(lastChecked);

                if (detected) {
                    notify.modal?.domainSuccess?.(readyDomain);
                }
            },
            intervalMs: 3000,
        });
    };

    const handleCheckAgain = async () => {
        try {
            setChecking(true);
            const res = await API.verifyOnce();
            setDomainStatus(res.domainStatus);
            setDetected(res.detected);
            setSnippetStatus(res.snippetStatus);
            setFirstPingAt(res.firstPingAt);
            setLastPingAt(res.lastPingAt);
            setLastChecked(res.lastChecked);

            if (res.detected) {
                notify.modal?.domainSuccess?.(readyDomain);
            } else {
                notify.modal?.warning(
                    "Snippet Not Detected",
                    "The tracking snippet was not detected on your website. Please ensure:\n\n• Site is publicly accessible\n• Snippet is in the <head> section\n• No browser extensions are blocking the script",
                );
            }
        } catch {
            notify.modal?.error(
                "Verification Failed",
                "Failed to check verification status. Please try again.",
            );
        } finally {
            setChecking(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                {/* Close */}
                <button
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    <X className="h-5 w-5" />
                </button>

                {/* Title */}
                <h2 className="mb-1 text-xl font-semibold text-gray-800">
                    Tracking Snippet Integration Guide
                </h2>
                <div className="mb-4 flex items-center gap-2">
                    <StatusBadge
                        domainStatus={domainStatus}
                        detected={detected}
                    />
                    <span className="text-xs text-gray-500">
                        Domain:{" "}
                        <span className="font-medium">{readyDomain}</span>
                    </span>
                    {!detected && (
                        <span className="ml-2 text-xs text-gray-400">
                            ({domainStatus === "active" ? "Active" : "Pending"}/
                            {snippetStatus})
                        </span>
                    )}
                </div>

                {/* Steps indicator */}
                <div className="mb-6 flex items-center gap-3 text-sm">
                    <div
                        className={`flex items-center gap-2 ${
                            step === 1 ? "text-blue-600" : "text-gray-600"
                        }`}>
                        <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                step === 1
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}>
                            1
                        </span>
                        <span className="font-medium">Install Snippet</span>
                    </div>
                    <div className="h-px flex-1 bg-gray-200" />
                    <div
                        className={`flex items-center gap-2 ${
                            step === 2 ? "text-blue-600" : "text-gray-600"
                        }`}>
                        <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                step === 2
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}>
                            2
                        </span>
                        <span className="font-medium">Verify Installation</span>
                    </div>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                    <div>
                        <p className="mb-2 text-sm text-gray-700">
                            Add the following script tag inside the{" "}
                            <code className="text-[0.9em]">&lt;head&gt;</code>{" "}
                            of your website. Place it on every page you want to
                            track.
                        </p>

                        <div className="relative mb-3 rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800">
                            <pre className="whitespace-pre-wrap break-words">
                                {snippetLoading
                                    ? "// Loading snippet..."
                                    : snippet}
                            </pre>
                            <button
                                onClick={handleCopy}
                                disabled={!snippet || snippetLoading}
                                className="absolute right-2 top-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
                                <Copy className="h-4 w-4" />
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>

                        <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                checked={confirmInstalled}
                                onChange={(e) =>
                                    setConfirmInstalled(e.target.checked)
                                }
                            />
                            I’ve inserted the snippet on my site
                        </label>

                        <div className="mt-6 flex justify-end">
                            <Button
                                variant="blue"
                                onClick={handleProceedToVerify}
                                disabled={!confirmInstalled}>
                                Continue to Verify
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <div>
                        <p className="mb-3 text-sm text-gray-700">
                            Click{" "}
                            <span className="font-medium">View Your Site</span>{" "}
                            to open your website in a new tab. The page will
                            automatically verify the snippet. Return here to see
                            the status.
                        </p>

                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <Button
                                variant="blue"
                                onClick={handleViewSite}
                                className="flex items-center">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Your Site
                            </Button>

                            <Button
                                variant="blue"
                                onClick={handleCheckAgain}
                                disabled={checking}>
                                {checking ? "Checking..." : "Check Again"}
                            </Button>
                        </div>

                        {/* Status block */}
                        {detected ? (
                            <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                <p className="font-semibold">
                                    ✅ Success! Snippet verified on{" "}
                                    <span className="font-bold">
                                        {readyDomain}
                                    </span>
                                </p>
                                <ul className="mt-2 list-inside list-disc space-y-1">
                                    <li>
                                        ✅ First ping received at{" "}
                                        <span className="font-medium">
                                            {firstPingAt
                                                ? new Date(
                                                      firstPingAt,
                                                  ).toLocaleString()
                                                : "-"}
                                        </span>
                                    </li>
                                    <li>
                                        ✅ Last checked at{" "}
                                        <span className="font-medium">
                                            {lastChecked
                                                ? new Date(
                                                      lastChecked,
                                                  ).toLocaleString()
                                                : "-"}
                                        </span>
                                    </li>
                                    <li>✅ You’ll start seeing data soon</li>
                                </ul>
                            </div>
                        ) : (
                            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                                <p className="font-semibold">
                                    ❌ Snippet not detected
                                </p>
                                <p className="font-medium mt-2">
                                    🔍 Please ensure:
                                </p>
                                <ul className="list-inside list-disc space-y-1">
                                    <li>Site is publicly accessible</li>
                                    <li>
                                        Snippet is in the{" "}
                                        <code>&lt;head&gt;</code>
                                    </li>
                                    <li>
                                        No browser extensions are blocking the
                                        script
                                    </li>
                                </ul>
                                <p className="mt-2 text-xs text-yellow-700">
                                    Current domain status: <b>{domainStatus}</b>{" "}
                                    • Snippet status: <b>{snippetStatus}</b>
                                </p>
                            </div>
                        )}

                        {/* Meta times */}
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                                <div className="font-semibold text-gray-900">
                                    First Ping
                                </div>
                                <div>
                                    {firstPingAt
                                        ? new Date(firstPingAt).toLocaleString()
                                        : "—"}
                                </div>
                            </div>
                            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                                <div className="font-semibold text-gray-900">
                                    Last Ping
                                </div>
                                <div>
                                    {lastPingAt
                                        ? new Date(lastPingAt).toLocaleString()
                                        : "—"}
                                </div>
                            </div>
                            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                                <div className="font-semibold text-gray-900">
                                    Last Checked
                                </div>
                                <div>
                                    {lastChecked
                                        ? new Date(lastChecked).toLocaleString()
                                        : "—"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button variant="blue" onClick={onClose}>
                                Done
                            </Button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default SnippetGuideModal;
