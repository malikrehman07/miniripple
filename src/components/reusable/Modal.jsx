// Modal.js
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center p-2">
                    <h3 className="text-xl font-semibold"></h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✖️
                    </button>
                </div>
                <div className="mt-4 text-center">{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
