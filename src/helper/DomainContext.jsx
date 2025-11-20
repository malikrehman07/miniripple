// src/context/DomainContext.jsx
import { createContext, useContext } from "react";
import { useDomainStatus } from "./useDomainStatus";

const DomainContext = createContext();

export const DomainProvider = ({ children }) => {
  const domainStatus = useDomainStatus(); // { status, isConnected }

  return (
    <DomainContext.Provider value={domainStatus}>
      {children}
    </DomainContext.Provider>
  );
};

export const useDomain = () => useContext(DomainContext);
