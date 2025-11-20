import React, { useState, useEffect } from "react";
import UserDashboard from "@/components/user/dashboard/UserDashboard";
import SuccessModal from "../../components/auth/SuccessModal";
import CancelModal from "../../components/auth/CancelModal";
import { useLocation } from "react-router-dom";

function Dashboard() {
    useEffect(() => {
        console.log("🟢 Dashboard mounted");
        return () => {
            console.log("🔴 Dashboard unmounted");
        };
    }, []);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [showPaymentCancelled, setShowPaymentCancelled] = useState(false);
    const location = useLocation();

    // ✅ Check payment status from URL
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentStatus = query.get("payment");
        console.log("paymentStatus : ", paymentStatus);

        if (paymentStatus === "success") {
            setShowPaymentSuccess(true);
        } else if (paymentStatus === "cancelled") {
            setShowPaymentCancelled(true);
        }

        // ✅ Clean URL after checking once
        if (paymentStatus) {
            setTimeout(() => {
                window.history.replaceState(null, "", "/dashboard");
            }, 100);
        }

    }, [location.search]);

    useEffect(() => {
        if (showPaymentSuccess || showPaymentCancelled) {
            const timer = setTimeout(() => {
                setShowPaymentSuccess(false);
                setShowPaymentCancelled(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showPaymentSuccess, showPaymentCancelled]);

    return (
        <>
            <UserDashboard />

            {showPaymentCancelled && (
                <div className="fixed z-[9999] inset-0 bg-black/60 flex justify-center items-center">
                    <CancelModal message="Payment was cancelled." />
                </div>
            )}
        </>
    );
}

export default Dashboard;
