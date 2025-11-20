import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Modal from "@/components/reusable/Modal";
import { useNotification } from "@/components/reusable/notifications";

const devices = ["Mobile", "Tablet", "Desktop"];
const browsers = ["Chrome", "Firefox", "Edge", "Opera", "Safari"];
const blockReasons = ["Security risk", "Spam/Abuse", "Policy violation", "Compliance", "Performance issue", "Other"];
const allowedOS = [
  "Windows", "MacOS", "Linux", "Android", "iOS", "ChromeOS", "Ubuntu", "Fedora", "Debian", "RedHat", "FreeBSD", "OpenBSD", "Unix"
];

const TopSection = ({ onDeviceBlockChange = () => {}, onBrowserBlockChange = () => {}, onOSBlockChange = () => {} }) => {

    const [blockedDevices, setBlockedDevices] = useState([]);
    const [blockedBrowsers, setBlockedBrowsers] = useState([]);
    const [deviceSearch, setDeviceSearch] = useState("");
    const [browserSearch, setBrowserSearch] = useState("");
    const [deviceDropdownOpen, setDeviceDropdownOpen] = useState(false);
    const [browserDropdownOpen, setBrowserDropdownOpen] = useState(false);
    const [showDeviceModal, setShowDeviceModal] = useState(false);
    const [showBrowserModal, setShowBrowserModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(devices[0]);
    const [selectedBrowser, setSelectedBrowser] = useState(browsers[0]);
    const [deviceReason, setDeviceReason] = useState("");
    const [browserReason, setBrowserReason] = useState("");
    const [deviceCustomReason, setDeviceCustomReason] = useState("");
    const [browserCustomReason, setBrowserCustomReason] = useState("");
    const [deviceError, setDeviceError] = useState("");
    const [browserError, setBrowserError] = useState("");
    const notification = useNotification();

    // OS block states
    const [blockedOSes, setBlockedOSes] = useState([]);
    const [osSearch, setOSSearch] = useState("");
    const [osDropdownOpen, setOSDropdownOpen] = useState(false);
    const [showOSModal, setShowOSModal] = useState(false);
    const [selectedOS, setSelectedOS] = useState(allowedOS[0]);
    const [osReason, setOSReason] = useState("");
    const [osCustomReason, setOSCustomReason] = useState("");
    const [osError, setOSError] = useState("");

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            // If any dropdown is open and click is outside the dropdown/input, close all
            const dropdownInputs = [
                document.getElementById('device-dropdown-input'),
                document.getElementById('browser-dropdown-input'),
                document.getElementById('os-dropdown-input')
            ];
            const dropdowns = Array.from(document.querySelectorAll('.dropdown-list'));
            const isInput = dropdownInputs.some(input => input && input.contains(event.target));
            const isDropdown = dropdowns.some(dropdown => dropdown && dropdown.contains(event.target));
            if (!isInput && !isDropdown) {
                setDeviceDropdownOpen(false);
                setBrowserDropdownOpen(false);
                setOSDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchBlocked = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;           
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            const [deviceRes, browserRes, osRes] = await Promise.all([
                axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/device-block/all`,
                    { headers: { Authorization: `Bearer ${token}` } }
                ),
                axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/browser-block/all`,
                    { headers: { Authorization: `Bearer ${token}` } }
                ),
                axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/all`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            ]);

            const deviceBlocks = deviceRes?.data?.blocks ?? [];
            const browserBlocks = browserRes?.data?.blocks ?? [];
            const osBlocks = osRes?.data?.blocks ?? [];

            setBlockedDevices(deviceBlocks.map((b) => b.deviceType?.charAt(0).toUpperCase() + b.deviceType.slice(1)));
            setBlockedBrowsers(browserBlocks.map((b) => b.browserName?.charAt(0).toUpperCase() + b.browserName.slice(1)));
            setBlockedOSes(osBlocks.map((b) => b.osName?.charAt(0).toUpperCase() + b.osName.slice(1)));

            onDeviceBlockChange();
            onBrowserBlockChange();
            onOSBlockChange();
        } catch (err) {
            console.error("Failed to fetch blocked devices/browsers/OSes", err);
        }
    };

    // Add OS
    const addOS = async (os, reason) => {
        if (blockedOSes.includes(os)) return;
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/block`,
                {
                    osName: os.toLowerCase(),
                    reason: reason || "Blocked manually from dashboard"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedOSes((prev) => [...prev, os]);
            onOSBlockChange();
            notification.success("OS blocked successfully!");
        } catch (err) {
            console.error("Failed to block OS", err);
            notification.error("Failed to block OS. Please try again.");
        }
    };

    // Remove OS
    const removeOS = async (os) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/os-block/unblock`,
                {
                    osName: os.toLowerCase()
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedOSes((prev) => prev.filter((o) => o !== os));
            onOSBlockChange();
            notification.success("OS unblocked Successfully!")
        } catch (err) {
            console.error("Failed to unblock OS", err);
        }
    };


    useEffect(() => {
        fetchBlocked();
    }, []);

    const addDevice = async (device, reason) => {
        if (blockedDevices.includes(device)) return;
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/device-block/block`,
                {
                    deviceType: device.toLowerCase(),
                    reason: reason || "Blocked manually from dashboard"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedDevices((prev) => [...prev, device]);
            onDeviceBlockChange();
            notification.success("Device blocked successfully!")
        } catch (err) {
            console.error("Failed to block device", err);
            notification.error("Failed to block device, Please try again!")
        }
    };

    const removeDevice = async (device) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/device-block/unblock`,
                {
                    deviceType: device.toLowerCase()
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedDevices((prev) => prev.filter((d) => d !== device));
            onDeviceBlockChange();
            notification.success("Device unblocked successfully!")
        } catch (err) {
            console.error("Failed to unblock device", err);
        }
    };

    const addBrowser = async (browser, reason) => {
        if (blockedBrowsers.includes(browser)) return;
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/browser-block/block`,
                {
                    browserName: browser.toLowerCase(),
                    reason: reason || "Blocked manually from dashboard"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedBrowsers((prev) => [...prev, browser]);
            onBrowserBlockChange();
            notification.success("Browser blocked successfully!")
        } catch (err) {
            console.error("Failed to block browser", err);
            notification.error("Failed to block browser. Please try again!")
        }
    };

    const removeBrowser = async (browser) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not authenticated");
            const token = await currentUser.getIdToken();
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/browser-block/unblock`,
                {
                    browserName: browser.toLowerCase()
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBlockedBrowsers((prev) => prev.filter((b) => b !== browser));
            onBrowserBlockChange();
            notification.success("Browser removed successfully!")
        } catch (err) {
            console.error("Failed to unblock browser", err);
        }
    };

    useEffect(() => {
        if (deviceDropdownOpen || browserDropdownOpen || osDropdownOpen || showDeviceModal || showBrowserModal || showOSModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [deviceDropdownOpen, browserDropdownOpen, osDropdownOpen, showDeviceModal, showBrowserModal, showOSModal]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-6 bg-gradient-to-r from-blue-start to-blue-end py-3 my-3">
            {/* Devices */}
            <div className="relative flex flex-col gap-1.5 min-w-[180px]">
                <p className="text-base text-slate-900">Blocked Devices</p>
                <div className="relative">
                    <input
                        id="device-dropdown-input"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Select device types..."
                        value={deviceSearch}
                        onChange={(e) => setDeviceSearch(e.target.value)}
                        onFocus={() => setDeviceDropdownOpen(true)}
                    />
                    {deviceDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto dropdown-list">
                            {devices
                                .filter((d) => d.toLowerCase().includes(deviceSearch.toLowerCase()))
                                .map((device) => (
                                    <div
                                        key={device}
                                        className={`px-4 py-2 text-sm text-slate-900 ${blockedDevices.includes(device) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}`}
                                        onMouseDown={() => {
                                            if (!blockedDevices.includes(device)) {
                                                setSelectedDevice(device);
                                                setDeviceReason("");
                                                setDeviceCustomReason("");
                                                setDeviceError("");
                                                setShowDeviceModal(true);
                                                setDeviceSearch("");
                                                setDeviceDropdownOpen(false);
                                            }
                                        }}
                                    >
                                        {device}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {blockedDevices.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {blockedDevices.map((device) => (
                            <div
                                key={device}
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-800"
                            >
                                {device}
                                <button
                                    onClick={() => removeDevice(device)}
                                    className="text-blue-800 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Browsers */}
            <div className="relative flex flex-col gap-1.5 min-w-[180px]">
                <p className="text-base text-slate-900">Blocked Browsers</p>
                <div className="relative">
                    <input
                        id="browser-dropdown-input"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Select browsers..."
                        value={browserSearch}
                        onChange={(e) => setBrowserSearch(e.target.value)}
                        onFocus={() => setBrowserDropdownOpen(true)}
                    />
                    {browserDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto dropdown-list">
                            {browsers
                                .filter((b) => b.toLowerCase().includes(browserSearch.toLowerCase()))
                                .map((browser) => (
                                    <div
                                        key={browser}
                                        className={`px-4 py-2 text-sm text-slate-900 ${blockedBrowsers.includes(browser) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}`}
                                        onMouseDown={() => {
                                            if (!blockedBrowsers.includes(browser)) {
                                                setSelectedBrowser(browser);
                                                setBrowserReason("");
                                                setBrowserCustomReason("");
                                                setBrowserError("");
                                                setShowBrowserModal(true);
                                                setBrowserSearch("");
                                                setBrowserDropdownOpen(false);
                                            }
                                        }}
                                    >
                                        {browser}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {blockedBrowsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {blockedBrowsers.map((browser) => (
                            <div
                                key={browser}
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-800"
                            >
                                {browser}
                                <button
                                    onClick={() => removeBrowser(browser)}
                                    className="text-blue-800 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* OS */}
            <div className="relative flex flex-col gap-1.5 min-w-[180px]">
                <p className="text-base text-slate-900">Blocked OS</p>
                <div className="relative">
                    <input
                        id="os-dropdown-input"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                        placeholder="Select OS..."
                        value={osSearch}
                        onChange={(e) => setOSSearch(e.target.value)}
                        onFocus={() => setOSDropdownOpen(true)}
                    />
                    {osDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border shadow-md rounded max-h-60 overflow-y-auto dropdown-list">
                            {allowedOS
                                .filter((os) => os.toLowerCase().includes(osSearch.toLowerCase()))
                                .map((os) => (
                                    <div
                                        key={os}
                                        className={`px-4 py-2 text-sm text-slate-900 ${blockedOSes.includes(os) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}`}
                                        onMouseDown={() => {
                                            if (!blockedOSes.includes(os)) {
                                                setSelectedOS(os);
                                                setOSReason("");
                                                setOSCustomReason("");
                                                setOSError("");
                                                setShowOSModal(true);
                                                setOSSearch("");
                                                setOSDropdownOpen(false);
                                            }
                                        }}
                                    >
                                        {os}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {blockedOSes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {blockedOSes.map((os) => (
                            <div
                                key={os}
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-800"
                            >
                                {os}
                                <button
                                    onClick={() => removeOS(os)}
                                    className="text-blue-800 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showDeviceModal && (
                <Modal onClose={() => setShowDeviceModal(false)}>
                    <div className="p-4">
                        <div className="flex flex-col gap-3">
                            <p className="text-lg font-semibold text-slate-900">Block Device</p>
                            <select className="w-full px-3 py-2 border rounded" value={selectedDevice} onChange={(e) => {
                                setSelectedDevice(e.target.value)
                                setDeviceError("")
                            }}>
                                {devices.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <select className="w-full px-3 py-2 border rounded" value={deviceReason} onChange={(e) => {
                                setDeviceReason(e.target.value)
                                setDeviceError("")
                            }}>
                                <option value="" disabled>Select reason</option>
                                {blockReasons.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                            {deviceReason === "Other" && (
                                <input className="w-full px-3 py-2 border rounded" placeholder="Enter custom reason" value={deviceCustomReason} onChange={(e) => setDeviceCustomReason(e.target.value)} />
                            )}
                            {deviceError && <p className="text-red-600 text-sm">{deviceError}</p>}
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowDeviceModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!deviceReason) {
                                            setDeviceError("Please select a reason.");
                                            return;
                                        } else if (deviceReason === "Other" && !deviceCustomReason.trim()) {
                                            setDeviceError("Please enter a custom reason.");
                                            return;
                                        }

                                        const finalReason = deviceReason === "Other" ? deviceCustomReason.trim() : deviceReason;
                                        await addDevice(selectedDevice, finalReason);
                                        setShowDeviceModal(false);
                                    }}
                                    className="px-4 py-2 rounded bg-slate-900 text-neutral-50"
                                >
                                    Block
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            {showBrowserModal && (
                <Modal onClose={() => setShowBrowserModal(false)}>
                    <div className="p-4">
                        <div className="flex flex-col gap-3">
                            <p className="text-lg font-semibold text-slate-900">Block Browser</p>
                            <select className="w-full px-3 py-2 border rounded" value={selectedBrowser} onChange={(e) => {
                                setSelectedBrowser(e.target.value)
                                setBrowserError("")
                            }}>
                                {browsers.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                            <select className="w-full px-3 py-2 border rounded" value={browserReason} onChange={(e) => {
                                setBrowserReason(e.target.value)
                                setBrowserError("")
                            }}>
                                <option value="" disabled>Select reason</option>
                                {blockReasons.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                            {browserReason === "Other" && (
                                <input className="w-full px-3 py-2 border rounded" placeholder="Enter custom reason" value={browserCustomReason} onChange={(e) => setBrowserCustomReason(e.target.value)} />
                            )}
                            {browserError && <p className="text-red-600 text-sm">{browserError}</p>}
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowBrowserModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!browserReason ) {
                                            setBrowserError("Please select a reason.");
                                            return;
                                        } else if (browserReason === "Other" && !browserCustomReason.trim()) {
                                            setBrowserError("Please enter a custom reason.");
                                            return;
                                        }
                                        const finalReason = browserReason === "Other" ? browserCustomReason.trim() : browserReason;
                                        await addBrowser(selectedBrowser, finalReason);
                                        setShowBrowserModal(false);
                                    }}
                                    className="px-4 py-2 rounded bg-slate-900 text-neutral-50"
                                >
                                    Block
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            {showOSModal && (
                <Modal onClose={() => setShowOSModal(false)}>
                    <div className="p-4">
                        <div className="flex flex-col gap-3">
                            <p className="text-lg font-semibold text-slate-900">Block Operating System</p>
                            <select className="w-full px-3 py-2 border rounded" value={selectedOS} onChange={e => {
                                setSelectedOS(e.target.value)
                                setOSError("")
                            }}>
                                {allowedOS.map((os) => (
                                    <option key={os} value={os}>{os}</option>
                                ))}
                            </select>
                            <select className="w-full px-3 py-2 border rounded" value={osReason} onChange={e => {
                                setOSReason(e.target.value)
                                setOSError("")
                            }}>
                                <option value="" disabled>Select reason</option>
                                {blockReasons.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                            {osReason === "Other" && (
                                <input className="w-full px-3 py-2 border rounded" placeholder="Enter custom reason" value={osCustomReason} onChange={e => setOSCustomReason(e.target.value)} />
                            )}
                            {osError && <p className="text-red-600 text-sm">{osError}</p>}
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setShowOSModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!osReason) {
                                            setOSError("Please select a reason.");
                                            return;
                                        } else if (osReason === "Other" && !osCustomReason.trim()) {
                                            setOSError("Please enter a custom reason.");
                                            return;
                                        }
                                        const finalReason = osReason === "Other" ? osCustomReason.trim() : osReason;
                                        await addOS(selectedOS, finalReason);
                                        setShowOSModal(false);
                                    }}
                                    className="px-4 py-2 rounded bg-slate-900 text-neutral-50"
                                >
                                    Block
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TopSection;
