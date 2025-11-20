import React, { useState, useEffect, useRef } from "react";
import DomainAddModal from "../../main/DomainAddModal";
import Button from "../../public/Button";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../../middlewares/authContext";
import SnippetGuideModal from "./SnippetGuideModal";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import { toast, ToastContainer } from "react-toastify";
import { setPropertyData } from "@/redux/actions/propertyActions";
import Modal from "@/components/reusable/Modal";
import {
  CheckCircleIcon,
  HourglassIcon,
  TriangleAlert,
  XCircleIcon,
} from "lucide-react";
import {
  fetchPropertyData,
  selectPropertyData,
} from "@/redux/slices/propertySlice";

const DomainSection = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const globalPropertyData = useSelector(selectPropertyData);

  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [domain, setDomain] = useState(null);
  const [propertyName, setPropertyName] = useState(null);
  const [status, setStatus] = useState("none"); 
  const [loading, setLoading] = useState(false);
  const [showSnippetModal, setShowSnippetModal] = useState(false);
  const [subscriptionBanner, setSubscriptionBanner] = useState(null);
  const firstConnectionHandled = useRef(false);

  const [hydrated, setHydrated] = useState(false);

  // ---------- helpers ----------
  const computeUiStatus = (domainStatus) => {
    // domainStatus now comes from backend with proper logic:
    // "connected" = domain active AND snippet verified (green)
    // "pending" = domain active BUT snippet not verified (yellow)  
    // "none" = no domain connected
    return domainStatus || "none";
  };

  const applyBannerFromInfo = (info) => {
    if (!info) return setSubscriptionBanner(null);
    const { visitorUsage, visitorLimit, code, banner } = info;

    if (code === "NO_SUBSCRIPTION") {
      setSubscriptionBanner(banner || "No active subscription.");
    } else if (visitorLimit > 0 && visitorUsage >= visitorLimit) {
      setSubscriptionBanner("Visitor limit reached. Please upgrade your plan.");
    } else if (visitorLimit > 0 && visitorUsage / visitorLimit >= 0.9) {
      setSubscriptionBanner("You're nearing your visitor limit. Consider upgrading.");
    } else {
      setSubscriptionBanner(null);
    }
  };

  const applyPayloadToUi = (payload) => {
    const pid = payload?.propertyId || null;
    const p = payload?.property || null;
    const ds = payload?.domainStatus || "none";
    const uiStatus = computeUiStatus(ds);

    if (!pid) {
      if (hydrated) {
        setDomainModalOpen(true);
        setStatus("none");
        setPropertyId(null);
        setDomain(null);
        setPropertyName(null);
      }
    } else {
      setPropertyId(pid);
      setDomain(p?.domain || null);
      setPropertyName(p?.propertyName || null);
      setStatus(uiStatus);
      setDomainModalOpen(false);

      if (ds === "active" && !firstConnectionHandled.current) {
        firstConnectionHandled.current = true;
      }
    }

    if (p) dispatch(setPropertyData(p));
    applyBannerFromInfo(payload?.subscriptionInfo);
  };

  // ---------- data fetch ----------
  const fetchDomainInfo = async () => {
    try {
      let payload;
      try {
        // may abort with ConditionError when data already exists
        payload = await dispatch(fetchPropertyData()).unwrap();
      } catch (err) {
        if (err?.name === "ConditionError") {
          payload = globalPropertyData ?? null; // use cache
        } else {
          throw err;
        }
      } finally {
        setHydrated(true); // we have a definitive state (fetched or cached)
      }

      applyPayloadToUi(payload || null);
    } catch (err) {
      console.error("Failed to fetch domain info", err);
      setHydrated(true);
      setDomainModalOpen(true);
      const httpStatus = err?.response?.status;
      const message = err?.response?.data?.message;
      if (httpStatus === 404 || message?.toLowerCase?.().includes("no domain")) {
        setStatus("none");
      } else {
        setStatus("failed");
      }
    }
  };

  // initial load
  useEffect(() => {
    if (user) fetchDomainInfo();
  }, [user]);

  // keep in sync if someone else refreshed the global property data
  useEffect(() => {
    if (!globalPropertyData) return;
    if (hydrated) applyPayloadToUi(globalPropertyData);
  }, [globalPropertyData, hydrated]);

  // ---------- actions ----------
  const handleDomainSubmit = async ({
    domain: submittedDomain,
    propertyName,
    country,
  }) => {
    setDomainModalOpen(false);
    setStatus("pending");
    setLoading(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("User not authenticated");

      const token = await currentUser.getIdToken(true);
      const endpoint = propertyId ? "change" : "connect";

      const domainRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/domain/${endpoint}`,
        { domain: submittedDomain, propertyName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (domainRes?.data?.success) {
        setDomain(domainRes.data.data.domain);
        setStatus("connected");
        setShowSnippetModal(true);

        // make sure global cache is fresh
        try {
          await dispatch(fetchPropertyData({ force: true })).unwrap();
          setHydrated(true);
        } catch (e) {
          console.error("Failed to refresh property data after domain update", e);
        }
      } else {
        setStatus("failed");
      }

      const profileRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/update-profile`,
        { country },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (profileRes?.data?.success) toast.success("Country updated in profile");
    } catch (error) {
      console.error("Domain connection or profile update failed", error);
      toast.error(error?.response?.data?.error || "Something went wrong");
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI helpers ----------
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "text-green-600";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };

  // Uptime indicator helpers (from backend uptimeMonitoring)
  const uptime = globalPropertyData?.property?.uptimeMonitoring || {};
  const isDown = uptime?.isDown === true;
  const lastCheckAt = uptime?.lastCheckAt ? new Date(uptime.lastCheckAt) : null;
  const uptimeDotClass = isDown ? "bg-red-500" : (lastCheckAt ? "bg-green-500" : "bg-gray-400");
  const uptimeLabel = isDown ? "Site Down" : (lastCheckAt ? "Site Up" : "Unknown");
  const uptimeTooltip = lastCheckAt ? `Last checked: ${lastCheckAt.toLocaleString()}` : "No recent checks";

  const getStatusIcon = () => {
    switch (status) {
      case "active":
      case "connected":
        return <CheckCircleIcon className="text-green-600" />;
      case "pending":
        return <HourglassIcon className="text-yellow-500" />; // Yellow for pending snippet verification
      case "failed":
        return <XCircleIcon className="text-red-600" />;
      default:
        return <TriangleAlert className="text-yellow-500" />;
    }
  };

  return (
    <>
      <ToastContainer />

      {/* ✅ BANNER START */}
      {subscriptionBanner && (
        <div className="px-6">
          <SubscriptionStatusCard
            message={subscriptionBanner.message || subscriptionBanner}
            type={subscriptionBanner.type || "info"}
          />
        </div>
      )}
      {/* ✅ BANNER END */}

      <section className="flex justify-between items-center px-6 mt-6 w-full font-['Jost'] max-md:flex-col max-md:items-start max-md:gap-3">
        <div className="flex items-center gap-3">
          <span className={`text-xl font-medium flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            {hydrated ? (
              propertyId ? (
                <>
                  {domain} - {propertyName} (
                  <span className="inline-flex items-center gap-1">
                    {status === "active" || status === "connected" ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Active
                      </>
                    ) : status === "pending" ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        Pending Snippet
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </>
                    )}
                  </span>
                  )
                  <span
                    className="ml-1 text-blue-500 cursor-pointer hover:text-blue-700 text-sm"
                    title={status === "active" || status === "connected" ? "Snippet verified - View details" : status === "pending" ? "Snippet not verified - Install tracking code" : "View Tracking Snippet"}
                    onClick={() => setShowSnippetModal(true)}
                  >
                    ℹ️
                  </span>

                                    {/* Uptime indicator */}
                  <span
                    className="ml-2 inline-flex items-center gap-1 text-sm text-slate-700"
                    title={uptimeTooltip}
                  >
                    <span className={`w-2 h-2 rounded-full ${uptimeDotClass}`}></span>
                    {uptimeLabel}
                  </span>
                </>
              ) : (
                "No domain connected"
              )
            ) : (
              "Checking domain…"
            )}
          </span>
        </div>

        <Button variant="dark" onClick={() => setModalOpen(true)}>
          {propertyId ? "Update Domain" : "Add Domain"}
        </Button>
      </section>

      {/* Custom Domain Modal */}
      {domainModalOpen && hydrated && (
        <Modal onClose={() => setDomainModalOpen(false)}>
          <section className="flex flex-col items-center px-12 pb-6">
            <TriangleAlert size={50} className="object-contain max-w-full aspect-square w-[100px] text-yellow-400" />
            <h2 className="my-6 text-xl tracking-tight leading-tight text-slate-900">
              Please connect your domain to continue.
            </h2>
          </section>
        </Modal>
      )}

      <DomainAddModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDomainSubmit={handleDomainSubmit}
        defaultDomain={propertyId}
        propertyId={propertyId}
      />

      <SnippetGuideModal
        isOpen={showSnippetModal}
        onClose={() => setShowSnippetModal(false)}
        domain={domain}
        siteId={propertyId}
      />
    </>
  );
};

export default DomainSection;
