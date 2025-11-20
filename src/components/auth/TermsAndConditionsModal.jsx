import React from "react";
import { Modal } from "antd";
import TermsAndConditionsContainer from "./TermsAndConditionsContainer";
import "./Terms.css"; // tiny scoped styles below

const TermsAndConditionsModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={820}
      centered
      destroyOnClose
      title="Terms & Conditions"
      bodyStyle={{ padding: 0 }}
      className="terms-modal"
    >
      <div className="terms-modal-body">
        <TermsAndConditionsContainer />
      </div>
    </Modal>
  );
};

export default TermsAndConditionsModal;
