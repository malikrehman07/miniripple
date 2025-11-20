import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPropertyData,
  selectDomainStatus,
  selectPropertyDomain,
  selectPropertyId,
  fetchPropertyData,
} from "@/redux/slices/propertySlice";

const DomainOverlay = () => {
  const dispatch = useDispatch();
  const propertyData = useSelector(selectPropertyData);
  const domainStatus = useSelector(selectDomainStatus);
  const domain = useSelector(selectPropertyDomain);
  const propertyId = useSelector(selectPropertyId);

  // 🚀 Fetch property data if missing
  useEffect(() => {
    if (!propertyData) {
      dispatch(fetchPropertyData());
    }
  }, [propertyData, dispatch]);

  // Determine if connected
  const isConnected =
    domainStatus === "active" && Boolean(domain) && Boolean(propertyId);

  if (isConnected) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-700/50 backdrop-blur-sm px-10">
      <div className="text-white text-base text-center p-3 bg-gray-800/80 rounded-md shadow-lg">
        Please connect your domain to proceed
      </div>
    </div>
  );
};

export default DomainOverlay;
