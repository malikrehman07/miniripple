import React from "react";
import DomainOverlay from "./DomainOverlay";

const DashboardWrapper = ({ children }) => {
  return (
    <div className="relative w-full min-h-[200px]">
      <DomainOverlay />
      {children}
    </div>
  );
};

export default DashboardWrapper;
