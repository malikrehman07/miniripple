import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import MetricCard from "../MetricCard";
import IPTable from "./IPTable";
import Pagination from "./Pagination";
import ManualIPBlockModal from "./ManualIPBlockModal";
import { useNotification } from "@/components/reusable/notifications/NotificationContext";
import useCountries from "@/hooks/useCountries";
import SelectField from "@/components/auth/SelectField";
import VisitorIPTable from "./VisitorIPTable";
import DashboardWrapper from "@/components/reusable/DashboardWrapper";
import StatisticsCard from "../StatisticsCard";
import Modal from "@/components/reusable/Modal";
import { Info, ShieldBan } from "lucide-react";
import { getIdTokenSafe } from "@/helper/authHelper";
import VpnToggle from "./VpnToggle";

const blockReasons = [
    "Security risk",
    "Spam/Abuse",
    "Policy violation",
    "Compliance",
    "Performance issue",
    "Other",
];

function BlockWithReasonModal({
    open,
    onClose,
    title,
    options,
    initialValue,
    reasons,
    onConfirm,
}) {
    const [value, setValue] = useState(initialValue || options[0]?.value || "");
    const [reason, setReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        setValue(initialValue || options[0]?.value || "");
        setReason("");
        setCustomReason("");
        setError("");
    }, [open, initialValue, options]);

    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);

    if (!open) return null;
    return (
        <Modal onClose={onClose}>
            <div className="p-4">
                <div className="flex flex-col gap-3">
                    <p className="text-lg font-semibold text-slate-900">
                        {title}
                    </p>
                    <select
                        className="w-full px-3 py-2 border rounded"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}>
                        {options.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full px-3 py-2 border rounded"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}>
                        <option value="" disabled>
                            Select reason
                        </option>
                        {reasons.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                    {reason === "Other" && (
                        <input
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter custom reason"
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                        />
                    )}
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (!reason) {
                                    setError("Please select a reason.");
                                    return;
                                } else if (reason === "Other" && !customReason.trim()) {
                                    setError("Please enter a custom reason.");
                                    return;
                                }
                                const finalReason =
                                    reason === "Other"
                                        ? customReason.trim()
                                        : reason;
                                onConfirm({ value, reason: finalReason });
                                onClose();
                            }}
                            className="px-4 py-2 rounded bg-slate-900 text-neutral-50">
                            Block
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

const MainForm = () => {
    const notification = useNotification();
    const [ipData, setIpData] = useState([]);
    const [blockedCountries, setBlockedCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarDate, setCalendarDate] = useState(
        parse("15/03/2025", "dd/MM/yyyy", new Date()),
    );
    const [showIPModal, setShowIPModal] = useState(false);
    const [countrySearch, setCountrySearch] = useState("");
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [metrics, setMetrics] = useState({
        blockedCountries: 0,
        vpnTraffic: 0,
        blockedIPs: 0,
        dailySuspiciousIPs: 0,
    });
    const [showCountryModal, setShowCountryModal] = useState(false);
    const [pendingCountryCode, setPendingCountryCode] = useState("");
    const [refetchToggler, setRefetchToggler] = useState(false);

    const itemsPerPage = 8;
    const { countries } = useCountries();
    useEffect(() => {
        const stored = localStorage.getItem("blockedCountries");
        if (stored) {
            setBlockedCountries(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        const fetchAllBlocked = async () => {
            try {
                const token = await getIdTokenSafe();
                const [ipRes, countryRes] = await Promise.all([
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/v${
                            import.meta.env.VITE_API_VERSION
                        }/blocked-ip/all`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    ),
                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/v${
                            import.meta.env.VITE_API_VERSION
                        }/blocked-country/all`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    ),
                ]);

                const ipJson = await ipRes.json();
                const countryJson = await countryRes.json();

                const ips = (ipJson?.data || []).map((item) => ({
                    id: `ip-${item.ip}`,
                    ipAddress: item.ip,
                    addedOn: item.blockedAt?.split("T")[0] || "—",
                    lastActivity: "—",
                    location: "Manual Block",
                    status: "Blocked",
                    statusColor: "text-red-500",
                }));

                const countriesArr = (countryJson?.data || []).map((item) => ({
                    id: `country-${item.countryCode}`,
                    countryCode: item.countryCode,
                    countryName: item.countryName || item.countryCode,
                    addedOn: item.blockedAt?.split("T")[0] || "—",
                    lastActivity: "—",
                    location: item.countryName || item.countryCode,
                    status: "Blocked",
                    statusColor: "text-red-500",
                }));

                const countryCodes = countriesArr.map((c) => c.countryCode);

                setIpData([...ips, ...countriesArr]);
                setBlockedCountries(countryCodes);
                localStorage.setItem(
                    "blockedCountries",
                    JSON.stringify(countryCodes),
                );
            } catch (err) {
                console.error("Failed to fetch initial blocked data", err);
            }
        };

        const fetchMetrics = async () => {
            try {
                const token = await getIdTokenSafe();
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v${
                        import.meta.env.VITE_API_VERSION
                    }/visitor-ip-management/metrics`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                const json = await res.json();
                if (json.success && json.data) {
                    setMetrics(json.data);
                }
            } catch (err) {
                console.error("Failed to fetch metrics", err);
            }
        };

        fetchAllBlocked();
        fetchMetrics();
    }, []);

    const handleBlockIP = async (ip, reasonText, expiryDate) => {
        try {
            const payload = {
                ip,
                reason: reasonText || "Manually blocked",
                expiresAt: new Date(expiryDate).toISOString(),
            };

            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/blocked-ip/block`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                },
            );

            const json = await res.json();
            if (!json.success) {
                notification.error(json.message || json.error || "Failed to block IP.");
                return { success: false, error: json.message || json.error || "Failed to block IP." };
            }

            const item = json.data;

            const newEntry = {
                id: `ip-${item.ip}`,
                ipAddress: item.ip,
                addedOn: item.blockedAt?.split("T")[0] || "—",
                lastActivity: "—",
                location: "Manual Block",
                status: "Blocked",
                statusColor: "text-red-500",
            };

            setIpData((prev) => [...prev, newEntry]);
            notification.success("IP address blocked successfully!");
            return { success: true };
        } catch (err) {
            notification.error(err.message || "Failed to block IP.");
            console.error("Block IP failed", err);
            return { success: false, error: err.message || "Failed to block IP." };
        }
    };


    const handleBlockCountry = async (country, reasonText) => {
        if (
            !country ||
            !country.cca2 ||
            country.cca2 === "XX" ||
            blockedCountries.includes(country.cca2)
        ) {
            notification.error("Invalid or already blocked country.");
            return { success: false, error: "Invalid or already blocked country." };
        }

        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/blocked-country/block`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        countryCode: country.cca2,
                        reason:
                            reasonText || "High spam activity from this region",
                    }),
                },
            );

            const json = await res.json();
            if (!json.success) {
                notification.error(json.message || json.error || "Failed to block country.");
                return { success: false, error: json.message || json.error || "Failed to block country." };
            }

            // Update state as before
            const updatedCountries = [...blockedCountries, country.cca2];
            setBlockedCountries(updatedCountries);
            localStorage.setItem(
                "blockedCountries",
                JSON.stringify(updatedCountries),
            );

            const newEntry = {
                id: `country-${country.cca2}`,
                countryCode: country.cca2,
                countryName: country.name.common,
                addedOn: new Date().toISOString().split("T")[0],
                lastActivity: "—",
                location: country.name.common,
                status: "Blocked",
                statusColor: "text-red-500",
            };

            setIpData((prev) => [...prev, newEntry]);
            notification.success("Country blocked successfully!");
            return { success: true };
        } catch (err) {
            notification.error(err.message || "Failed to block country.");
            console.error("Block Country failed", err);
            return { success: false, error: err.message || "Failed to block country." };
        }
    };


    const handleUnblockIP = async (ip) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/blocked-ip/unblock`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ip }),
                },
            );

            setIpData((prev) => prev.filter((item) => item.ipAddress !== ip));
        } catch (err) {
            console.error("Unblock IP failed", err);
        }
    };

    const handleUnblockCountry = async (code) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/v${
                    import.meta.env.VITE_API_VERSION
                }/blocked-country/unblock`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ countryCode: code }),
                },
            );

            setIpData((prev) =>
                prev.filter((item) => item.countryCode !== code),
            );
            const updated = blockedCountries.filter((c) => c !== code);
            setBlockedCountries(updated);
            localStorage.setItem("blockedCountries", JSON.stringify(updated));
        } catch (err) {
            console.error("Unblock Country failed", err);
        }
    };

    const filteredData = ipData.filter((item) => {
        const query = searchQuery.toLowerCase();
        const locationLower = item.location?.toLowerCase() || "";
        const ipLower = item.ipAddress?.toLowerCase() || "";

        const matchesQuery = (val) =>
            typeof val === "string" && val.toLowerCase().includes(query);

        if (selectedFilter === "All")
            return Object.values(item).some(matchesQuery);
        if (selectedFilter === "IP Address") return ipLower.includes(query);
        if (selectedFilter === "Added On")
            return item.addedOn?.toLowerCase().includes(query);
        if (selectedFilter === "Last Activity")
            return item.lastActivity?.toLowerCase().includes(query);
        if (selectedFilter === "Location") return locationLower.includes(query);

        return true;
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleCountrySearchSelect = (countryCode) => {
        const selected = countries.find((c) => c.cca2 === countryCode);
        if (!selected || selected.cca2 === "XX") return;
        // check if selected country is already blocked
        if (blockedCountries.includes(selected.cca2)) {
            notification.error("Country is already blocked.");
            return;
        }
        setPendingCountryCode(selected.cca2);
        setShowCountryModal(true);
        setCountrySearch("");
        setCountryDropdownOpen(false);
    };
    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center gap-4 m-6">
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-1.svg"
                    title="Blocked Countries"
                    value={metrics.blockedCountries.toString()}
                    percentage="4.3%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-2.svg"
                    trendColor="text-blue-500 bg-blue-200"
                    bgColor="bg-blue-100 border-blue-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-3.svg"
                    title="VPN Traffic"
                    value={metrics.vpnTraffic.toString()}
                    percentage="5.2%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-4.svg"
                    trendColor="text-emerald-600 bg-emerald-200"
                    bgColor="bg-teal-100 border-teal-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-5.svg"
                    title="Blocked IP"
                    value={metrics.blockedIPs.toString()}
                    percentage="0.5%"
                    trend="down"
                    trendIcon="/page/visitorIpManagement/main-form-6.svg"
                    trendColor="text-red-500 bg-rose-200"
                    bgColor="bg-rose-100 border-rose-200 border-2"
                />
                <MetricCard
                    icon="/page/visitorIpManagement/main-form-7.svg"
                    title="Suspicious IP"
                    value={metrics.dailySuspiciousIPs.toString()}
                    percentage="4.3%"
                    trend="up"
                    trendIcon="/page/visitorIpManagement/main-form-8.svg"
                    trendColor="text-amber-500 bg-yellow-200"
                    bgColor="bg-yellow-100 border-yellow-200 border-2"
                />
            </section>
            <div className="mt-6">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-2">
                        <ShieldBan className="h-5 w-5 text-slate-700" />
                        <h2 className="text-base font-semibold text-slate-900">
                            Block Countries (Geo-Restriction)
                        </h2>
                    </div>
                    <VpnToggle initialAction="block" />
                </div>

                {/* Description */}
                <div className="px-6 pt-4">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                        <Info className="mt-0.5 h-4 w-4 shrink-0" />
                        <p id="block-country-help">
                            Users from the countries you add here will be
                            blocked from accessing your application. Select a
                            country to add it to the blocklist.
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-between gap-4 px-6 pb-4 pt-3">
                    <SelectField
                        label="Add country to blocklist"
                        icon="/auth/auth-3.svg"
                        name="country"
                        aria-describedby="block-country-help"
                        value={countrySearch}
                        onChange={(e) => {
                            setCountrySearch(e.target.value);
                            handleCountrySearchSelect(e.target.value);
                        }}
                        options={countries.map((c) => ({
                            label: `${c.name.common} (${c.cca2})`,
                            value: c.cca2,
                        }))}
                    />

                    {/* Blocked list */}
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-slate-900">
                                Blocked countries
                                {blockedCountries.length
                                    ? ` (${blockedCountries.length})`
                                    : ""}
                            </h3>
                            {/* {!!blockedCountries.length && (
                                <button
                                    onClick={() =>
                                        blockedCountries.forEach((c) =>
                                            handleUnblockCountry(c),
                                        )
                                    }
                                    className="text-xs text-slate-600 hover:text-red-600">
                                    Clear all
                                </button>
                            )} */}
                        </div>

                        {blockedCountries.length === 0 ? (
                            <div className="text-sm text-slate-500">
                                No countries blocked yet. Add one using the
                                selector above.
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {blockedCountries.map((code) => {
                                    const countryName =
                                        countries.find((c) => c.cca2 === code)
                                            ?.name?.common || code;
                                    return (
                                        <div
                                            key={code}
                                            className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-800">
                                            {countryName}
                                            <button
                                                onClick={() =>
                                                    handleUnblockCountry(code)
                                                }
                                                className="hover:text-red-500"
                                                aria-label={`Unblock ${countryName}`}
                                                title="Remove">
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Advanced */}
                <div className="px-6 pb-6">
                    <div className="mt-4 flex flex-wrap items-center justify-between border-t pt-4 gap-1">
                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                Advanced
                            </p>
                            <p className="text-xs text-slate-500">
                                Block specific IP addresses regardless of
                                country.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowIPModal(true)}
                            className="px-2 sm:px-4 py-2 text-white bg-slate-900 rounded-md m-1">
                            Block IP Manually
                        </button>
                    </div>
                </div>
            </div>
            <ManualIPBlockModal
                open={showIPModal}
                onClose={() => setShowIPModal(false)}
                onBlock={handleBlockIP}
                onDelete={handleUnblockIP}
                setRefetchToggler={setRefetchToggler}
            />
            <div className="p-5" style={{ maxWidth: "100vw" }}>
                <StatisticsCard title={"Visitor IP Table"} isTable>
                    <VisitorIPTable refetch={refetchToggler} />
                </StatisticsCard>
            </div>
            <BlockWithReasonModal
                open={showCountryModal}
                onClose={() => setShowCountryModal(false)}
                title="Block Country"
                options={countries.map((c) => ({
                    label: `${c.name.common} (${c.cca2})`,
                    value: c.cca2,
                }))}
                initialValue={pendingCountryCode || countries[0]?.cca2 || ""}
                reasons={blockReasons}
                onConfirm={({ value, reason }) => {
                    const selected = countries.find((c) => c.cca2 === value);
                    if (selected) handleBlockCountry(selected, reason);
                }}
            />
        </>
    );
};

export default MainForm;
