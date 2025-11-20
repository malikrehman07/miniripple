import React from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { redirectToStripeCheckout } from "../../helper/useStripeCheckout";
import { useAuth } from "../../middlewares/authContext";
import { toast } from "react-toastify";

const LegalTerms = () => {
  const updatedDate = "July 25, 2025";
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAgreeAndContinue = async () => {
    try {
      const planId = localStorage.getItem("selectedPlanId");
      if (!planId) {
        toast.error("No plan selected. Please go back to pricing page.");
        return navigate("/pricing");
      }

      if (!user) {
        toast("Please log in to continue");
        return navigate("/login");
      }

      const auth = getAuth();
      const currentUser = auth.currentUser;
      console.log("------------------------")

      if (!currentUser) {
        toast.error("User not authenticated");
        return navigate("/login");
      }

      await redirectToStripeCheckout({ planId, user: currentUser });
    } catch (err) {
      console.error("Error redirecting to checkout:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex overflow-hidden flex-col items-center justify-start bg-[#011732] relative">
      <Navbar />

      {/* Hero Section */}
      <section className="flex overflow-hidden flex-col px-0 md:px-20 py-24 mt-[44px] md:mt-[72px] lg:mt-[128px] w-full max-w-[1368px] rounded-none md:rounded-[34px] shadow-xl shadow-[#0003] bg-[linear-gradient(199deg,_#3978D7_-7.08%,_#011732_87.63%)] relative z-[30] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col self-center w-full max-w-[1101px] z-20">
          <div className="flex flex-col w-full text-center max-md:max-w-full">
            <h1 className="md:text-[40px] lg:text-[80px] md:leading-normal lg:leading-[95px] text-slate-50 font-['Anton'] tracking-[1.6px] self-stretch max-md:max-w-full max-md:text-2xl max-md:leading-[32px]" style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
              Legal Terms & Privacy Commitment
            </h1>
            <h2 className="self-center mt-7 text-[20px] md:text-2xl lg:text-3xl leading-tight text-blue-200 font-['Jost'] max-md:max-w-full">
              Clear, Transparent, and Built Around Your Security & Consent
            </h2>
          </div>
        </div>
        <div className="absolute top-[-550px] w-[864px] h-[864px] rounded-full bg-[#FFC10780] left-1/2 transform -translate-x-1/2 blur-[120px] z-10"></div>
      </section>

      {/* Legal Terms Content */}
      <div className="text-zinc-100 min-h-screen px-4 md:px-12 py-10 font-['Amble'] leading-relaxed mt-20 mb-20 w-full">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-zinc-400 mb-6">
            <strong>Effective Date:</strong> {updatedDate} <br />
            <strong>Last Updated:</strong> {updatedDate}
          </p>

          {sections.map(({ title, body }, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-xl font-semibold text-zinc-200 mb-2">{i + 1}. {title}</h2>
              {Array.isArray(body) ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                  {body.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-300 whitespace-pre-line">{body}</p>
              )}
            </div>
          ))}

          {/* Continue Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleAgreeAndContinue}
              className="px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all font-semibold shadow-lg"
            >
              Agree & Continue to Payment
            </button>
          </div>

          <div className="mt-10 text-sm text-zinc-400 text-center">
            📧 Email: <a href="mailto:support@miniripple.com" className="underline">support@miniripple.com</a> <br />
            🌐 Website: <a href="https://miniripple.com" className="underline" target="_blank" rel="noreferrer">https://miniripple.com</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};



const sections = [
    {
        title: "Acceptance of Terms",
        body: `By accessing or using MiniRipple (the "Service", "Platform", or "Software") provided by MiniRipple, Inc. (“we”, “us”, “our”), available at https://miniripple.com, you (“you”, “your”, “Customer”, or “User”) agree to be bound by these Terms and Conditions, including our Privacy Policy and all related legal disclaimers herein. If you do not agree to these terms, you must not access or use our services.`,
    },
    {
        title: "Service Description",
        body: [
            "Real-time visitor analytics",
            "IP address logging and blocking",
            "VPN and proxy detection",
            "Country, browser, device, and OS tracking",
            "Bot and automation detection",
            "Auto-blocking rules",
            "Traffic source analysis",
            "Page-level tracking",
            "Log exports and integrations",
            "The Service is delivered via JavaScript tracking scripts, APIs, dashboards, and automation features."
        ],
    },
    {
        title: "No Guarantee of Results",
        body: [
            "No service can guarantee 100% protection from bots, fraud, or cyber threats.",
            "VPN detection, IP geolocation, and device fingerprinting have inherent limitations.",
            "You use MiniRipple at your own risk and are solely responsible for actions taken based on its data.",
            "We do not warrant that our analytics or alerts are error-free or complete, or that every malicious visitor will be blocked."
        ],
    },
    {
        title: "User Obligations and Responsibilities",
        body: [
            "Do not misuse the Service (reverse engineering, unauthorized access, etc.).",
            "Do not use data obtained for illegal activities.",
            "Configure rules appropriately and comply with laws.",
            "Disclose MiniRipple usage in your privacy policy."
        ],
    },
    {
        title: "Data Collection & Consent",
        body: `MiniRipple collects technical and behavioral data such as IP address, geolocation, browser info, referrer, session timing, and more. You must obtain lawful consent from your visitors and update your privacy policy. We act as a data processor; you are the data controller.`,
    },
    {
        title: "International Compliance",
        body: [
            "You are responsible for privacy law compliance in your region.",
            "EU/EEA operators must obtain user consent before deploying MiniRipple.",
            "MiniRipple is not liable for cookie/banner non-compliance on your site."
        ],
    },
    {
        title: "Security & Confidentiality",
        body: [
            "We use encryption and access controls to protect data.",
            "You must not attempt to breach platform security.",
            "Access to analytics is limited to authorized users only."
        ],
    },
    {
        title: "Account Terms",
        body: [
            "Must be 18+ to use the Service.",
            "Provide accurate information; don’t share credentials.",
            "We may suspend accounts for abuse or non-compliance."
        ],
    },
    {
        title: "Subscription, Billing, and Refund Policy",
        body: [
            "Plans: $19.99/month or $210/year.",
            "Billed in advance; cancel anytime.",
            "7-day refund window unless required by law.",
            "Optional services are non-refundable once delivered."
        ],
    },
    {
        title: "Service Limitations & Usage Restrictions",
        body: [
            "Don’t build competing products.",
            "Don’t abuse free trials or overload the platform.",
            "We may throttle abusive or excessive use."
        ],
    },
    {
        title: "Intellectual Property Rights",
        body: [
            "MiniRipple retains all IP rights over platform code, UI, and logic.",
            "You get a revocable license for use on your site(s).",
            "Do not resell, replicate, or redistribute any part of the platform."
        ],
    },
    {
        title: "Third-Party Services",
        body: [
            "We may integrate with tools like Google Analytics, Stripe.",
            "We’re not responsible for their outages or data accuracy."
        ],
    },
    {
        title: "Indemnification",
        body: `You agree to indemnify MiniRipple from any legal claims arising from your misuse of the platform, data practices, or law violations.`,
    },
    {
        title: "Limitation of Liability",
        body: [
            "We are not liable for indirect, incidental, or consequential damages.",
            "Liability is limited to your paid amount in the last 6 months."
        ],
    },
    {
        title: "Termination and Suspension",
        body: [
            "Accounts may be suspended for non-payment or abuse.",
            "Upon termination, access is revoked and data may be deleted."
        ],
    },
    {
        title: "Modifications to Terms",
        body: `We may update terms with notice. Continued use implies acceptance.`,
    },
    {
        title: "Governing Law",
        body: `This agreement is governed by the laws of [Insert Jurisdiction]. Legal action must be filed in [Insert County/State].`,
    },
    {
        title: "Severability",
        body: `If one part is invalid, the rest remains enforceable.`,
    },
    {
        title: "Contact Information",
        body: `Email: support@miniripple.com, Website: https://miniripple.com`,
    },
];

export default LegalTerms;
