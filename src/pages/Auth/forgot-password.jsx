import React from "react";
import { Row, Col } from "antd";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.svg";
import logoLight from "@/assets/img/logoLight.svg";
import { useTheme } from "@/contexts/ThemeContext";
import "./SignUp.css";

function ForgotPassword() {
  const { theme } = useTheme();

  return (
    <main className="auth-page sign-in-page">
      <Row>
        {/* Left Section (Form) */}
        <Col
          className="form-section"
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
        >
          <section className="auth-form">
            <div className="content">
              <ForgotPasswordForm />
            </div>
          </section>
        </Col>

        {/* Right Section (Image + Branding) */}
        <Col
          className="ellipse-area"
          lg={{ span: 12, order: 2 }}
          md={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
        >
          <div className="img-section">
            <div className="logo">
              <Link to="/">
                <img
                  src={theme === "light" ? logoLight : logo}
                  alt="Smart IP, VPN, Device, and Browser Blocking Software"
                />
              </Link>
            </div>
            <h1 className="h1">
              Smart IP, VPN, Device, and Browser Blocking Software
            </h1>
          </div>
        </Col>
      </Row>
    </main>
  );
}

export default ForgotPassword;
