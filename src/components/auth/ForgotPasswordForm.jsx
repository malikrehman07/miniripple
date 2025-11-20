import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const onFinish = async (values) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setLoading(true);
      await axios.post(`${API}/api/v1/users/forget-password`, {
        email: values.email,
      });
      setSuccessMessage("If this email exists, a reset link has been sent.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to send reset email.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <h2 className="main-heading" style={{ textAlign: "center" }}>
        Forgot Password
      </h2>
      <p style={{ textAlign: "center", marginBottom: 20, color: "#888" }}>
        Enter your email address to receive a password reset link.
      </p>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {errorMessage && (
          <Alert message={errorMessage} type="error" showIcon />
        )}

        {successMessage && (
          <Alert message={successMessage} type="success" showIcon />
        )}

        <Form.Item style={{ marginTop: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ height: 48 }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            type="link"
            onClick={() => navigate("/sign-in")}
            style={{ padding: 0 }}
          >
            Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
