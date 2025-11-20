import React from "react";
import { Row, Col } from "antd";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.svg";
import logoLight from "@/assets/img/logoLight.svg";
import { useTheme } from "@/contexts/ThemeContext";
import "./SignUp.css";        // same shell as Forgot Password
import "../../components/auth/ResetPassword.css"; // scoped tweaks below

function ResetPassword() {
  const { theme } = useTheme();

  return (
    <main className="auth-page sign-in-page reset-page">
      <Row className="auth-row" align="middle">
        {/* Left: Form */}
        <Col
          className="form-section"
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
        >
          <section className="auth-form">
            <div className="content">
              <ResetPasswordForm />
            </div>
          </section>
        </Col>

        {/* Right: Branding */}
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

export default ResetPassword;
