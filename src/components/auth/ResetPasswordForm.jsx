import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./ResetPassword.css";

function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const onFinish = async (values) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API}/api/v1/users/reset-password`, {
        token,
        password: values.password,
      });
      setSuccessMessage("Password updated. You can now log in.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to reset password.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-form">
      <h2 className="main-heading" style={{ textAlign: "center" }}>
        Set a New Password
      </h2>
      <p style={{ textAlign: "center", marginBottom: 20, color: "#94a3b8" }}>
        Enter your new password below.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 520, margin: "0 auto" }}
        requiredMark={false}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Enter new password"
            prefix={<LockOutlined />}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm new password"
            prefix={<LockOutlined />}
            autoComplete="new-password"
          />
        </Form.Item>

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}

        <Form.Item style={{ marginTop: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="reset-primary-btn"
          >
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Button type="link" onClick={() => navigate("/login")} style={{ padding: 0 }}>
            Return to Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
