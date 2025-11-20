// components/billing/BillingMetricsCards.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Minus,
} from "lucide-react";
import MetricCard from "../MetricCard";

function BillingMetricsCards() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchBillingHistory(user);
      } else {
        console.warn("⚠️ User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchBillingHistory = async (user) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/billing/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const history = res.data.billingHistory || [];
      const totalBilled = history.reduce((sum, h) => sum + h.amount, 0);
      const paid = history.filter(h => h.status.toLowerCase() === "paid");
      const unpaid = history.filter(h => h.status.toLowerCase() !== "paid");
      const lastPayment = paid.length ? paid[0] : null;

      const metricsData = [
        {
          title: "Total Billed",
          icon: <FileText/>,
          value: `${totalBilled.toFixed(2)} ${lastPayment?.currency || ""}`,
          change: `${history.length} invoices`,
          icon: <Minus size={12} />,
          changeType: "neutral",
          bgColor: "bg-blue-100 border-blue-200 border-2",
        },
        {
          title: "Paid Invoices",
          icon: <CheckCircle/>,
          value: `${paid.length}`,
          change: `${((paid.length / history.length) * 100).toFixed(0)}% Paid`,
          icon: <TrendingUp size={12} />,
          changeType: "positive",
          bgColor: "bg-emerald-100 border-emerald-200 border-2",
        },
        {
          title: "Last Payment",
          icon: <Clock/>,
          value: lastPayment
            ? `${lastPayment.amount.toFixed(2)} ${lastPayment.currency}`
            : "-",
          change: lastPayment
            ? new Date(lastPayment.billingDate).toLocaleDateString()
            : "No record",
          icon: <Clock size={12} />,
          changeType: "neutral",
          bgColor: "bg-purple-100 border-purple-200 border-2",
        },
      ];

      setMetrics(metricsData);
    } catch (error) {
      console.error("⚠️ Billing fetch error. Rendering fallback UI.", error);

      // Fallback metrics if API fails
      setMetrics([
        {
          title: "Total Billed",
          icon: <FileText/>,
          value: "-",
          change: "No data",
          icon: <Minus size={12} />,
          changeType: "neutral",
          bgColor: "bg-blue-50 border border-blue-200",
        },
        {
          title: "Paid Invoices",
          icon: <CheckCircle/>,
          value: "-",
          change: "No data",
          icon: <Minus size={12} />,
          changeType: "neutral",
          bgColor: "bg-emerald-50 border border-emerald-200",
        },
        {
          title: "Last Payment",
          icon: <Clock/>,
          value: "-",
          change: "No record",
          icon: <Minus size={12} />,
          changeType: "neutral",
          bgColor: "bg-purple-50 border border-purple-200",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}

export default BillingMetricsCards;
