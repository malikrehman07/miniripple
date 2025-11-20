// components/billing/BillingInformation.jsx
import React from "react";
import BillingMetricsCards from "./BillingMetricsCards";

function BillingInformation() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-[18px] font-semibold font-['Amble'] text-gray-800">
          Billing Summary
        </h2>
        <p className="text-[14px] font-['Jost'] text-gray-500">
          Your invoice activity and recent billing information.
        </p>
      </div>

      <BillingMetricsCards />
    </section>
  );
}

export default BillingInformation;
