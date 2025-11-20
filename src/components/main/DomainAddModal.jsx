// DomainAddModal.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import validator from "validator";
import Button from "../../components/public/Button";
import SelectField from "../auth/SelectField";
import useCountries from "@/hooks/useCountries";
import { getAuth } from "firebase/auth";
import axios from "axios";

const DomainAddModal = ({ isOpen, onClose, onDomainSubmit, defaultDomain, propertyId }) => {
  const { countries, loading } = useCountries();
  const [domain, setDomain] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const cleanedDomain = (domain || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  const isUpdating = !!defaultDomain && defaultDomain !== cleanedDomain;

  const handleSubmit = () => {
    if (!validator.isFQDN(cleanedDomain)) {
      setError("Please enter a valid domain like 'example.com'");
      return;
    }

    if (!propertyName.trim() || !country.trim()) {
      setError("All fields are required.");
      return;
    }

    if (isUpdating && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    setError("");
    onDomainSubmit({
      domain: cleanedDomain,
      propertyName: propertyName.trim(),
      country: country.trim(),
    });
  };

  const cancelUpdate = () => setShowConfirm(false);

  const fetchDomainInfo = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken();

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v${import.meta.env.VITE_API_VERSION}/properties/${defaultDomain}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res?.data?.property;
      setDomain(data?.domain);
      setPropertyName(data?.propertyName);
    } catch (err) {
      console.error("Failed to fetch domain info", err);
    }
  };

  useEffect(() => {
    if (propertyId) fetchDomainInfo();
  }, [propertyId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close dialog"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {defaultDomain ? "Update Domain" : "Connect Your Domain"}
        </h2>

        {/* Property Name */}
        <input
          type="text"
          placeholder="Property Name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3"
        />

        {/* Domain */}
        <input
          type="text"
          placeholder="Domain (e.g. yoursite.com)"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            setShowConfirm(false);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3"
        />

        {/* Country */}
        <SelectField
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={countries.map((c) => ({
            label: `${c.name.common} (${c.cca2})`,
            value: c.cca2,
          }))}
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Confirm warning */}
        {showConfirm && (
          <div className="mt-3 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md text-sm">
            ⚠️ Updating the domain will replace the existing one and move the tracking snippet.
          </div>
        )}

        {/* Actions — visually separated footer so it reads as the form’s primary action */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
          {showConfirm && (
            <Button variant="gray" type="button" onClick={cancelUpdate}>
              Cancel
            </Button>
          )}
          <Button variant="blue" onClick={handleSubmit}>
            {showConfirm ? "Confirm & Submit" : "Submit"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DomainAddModal;
