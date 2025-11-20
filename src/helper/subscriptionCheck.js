// src/helper/subscriptionCheck.js
import { redirectToStripeCheckout } from "./useStripeCheckout";
import axios from "axios";
import { toast } from "react-toastify";
import { getIdTokenSafe, delay } from "@/helper/authHelper";

/**
 * Self-healing subscription check:
 * - always uses a fresh token
 * - if 401, try verify-token once then retry
 */
export const checkSubscriptionAndRedirect = async () => {
  try {
    const apiBase = import.meta.env.VITE_API_URL;
    const apiV = import.meta.env.VITE_API_VERSION;

    // attempt → maybe bootstrap on 401
    const tryOnce = async () => {
      const idToken = await getIdTokenSafe(true);
      const res = await fetch(`${apiBase}/api/v${apiV}/subscription/usage/user`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      });
      return res;
    };

    let res = await tryOnce();

    // Bootstrap user if backend still says unauthorized
    if (res.status === 401) {
      try {
        const idToken = await getIdTokenSafe(true);
        await fetch(`${apiBase}/api/v1/users/verify-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }), // password not needed here
        });
        await delay(250);
        res = await tryOnce();
      } catch {
        // ignore; we'll read the response below
      }
    }

    const data = await res.json();
    console.log("response subscription", data);

    if (data?.data?.hasActiveSubscription) return true;

    // No active subscription → fetch plans and redirect
    const { data: plansData } = await axios.get(`${apiBase}/api/v1/plans`);
    const plans = Array.isArray(plansData?.plans) ? plansData.plans : [];
    const lifetime = plans.find((p) => p?.PlanType?.name === "Lifetime package");
    if (lifetime) {
      await redirectToStripeCheckout({ planId: lifetime._id });
    } else {
      console.error("Lifetime package not found in plans");
    }
    return false;
  } catch (error) {
    toast.error(error?.message || "Something went wrong.");
    return false;
  }
};
