import axios from "axios";

export const redirectToStripeCheckout = async ({ planId }) => {
    

    const idToken = localStorage.getItem("token")

    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/stripe/create-checkout-session`,
        { planId },
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    // ✅ Redirect to Stripe Checkout
    window.location.href = response.data.url;
};
