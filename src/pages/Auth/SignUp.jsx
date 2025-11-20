// pages/Auth/SignUp.jsx
import React, { useState } from "react";
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import "./SignUp.css";
import logo from "@/assets/img/logo.svg";
import logoLight from "@/assets/img/logoLight.svg";
import { Link, useNavigate } from "react-router-dom";
import { AnimFadeUp } from "../../animations/AnimFadeUp";
import { AnimFadeIn } from "../../animations/AnimFadeIn";
import { useTheme } from "@/contexts/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// white eye icons
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ---- existing auth logic ----
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../../firebase";
import useSocialLogin from "@/helper/handleSocialLogin";
import { checkSubscriptionAndRedirect } from "@/helper/subscriptionCheck";

// Terms modal that renders JSX (no raw HTML)
import TermsAndConditionsModal from "@/components/auth/TermsAndConditionsModal";

const SignUp = () => {
  const [form] = Form.useForm();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { handleSocialLogin } = useSocialLogin();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      const fullName = (values?.Name || "").trim();
      const email = values.email?.trim();
      const password = values.password;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });
      await user.reload();
      const idToken = await user.getIdToken();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/verify-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, password }),
        }
      );

      localStorage.setItem("token", idToken);
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        localStorage.setItem("user", JSON.stringify(data?.user));
      } else {
        toast.error(data.error || "Signup failed.");
      }

      const isSubscribed = await checkSubscriptionAndRedirect(idToken, user);
      if (isSubscribed) {
        toast.success("Account created and logged in successfully!");
        setSignupSuccess(true);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const signUpWithGoogle = () =>
    handleSocialLogin(
      googleProvider,
      `${import.meta.env.VITE_API_URL}/api/v1/users/google`,
      "Logged in with Google!"
    );

  const signUpWithFacebook = () =>
    handleSocialLogin(
      facebookProvider,
      `${import.meta.env.VITE_API_URL}/api/v1/users/facebook`,
      "Logged in with Facebook!"
    );

  // single source for white eye icons
  const renderWhiteEye = (visible) =>
    visible ? (
      <EyeOutlined style={{ color: "#fff" }} />
    ) : (
      <EyeInvisibleOutlined style={{ color: "#fff" }} />
    );

  return (
    <main className="auth-page sign-up-page">
      <ToastContainer />
      <Row>
        {/* Left: Form */}
        <Col
          className="form-section"
          lg={{ span: 12, order: 2 }}
          md={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
        >
          <section className="auth-form">
            <AnimFadeUp>
              <div className="content">
                <h2 className="main-heading">Sign Up</h2>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className="form-area"
                  requiredMark
                >
                  <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input placeholder="Enter Name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="Enter Email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input your password!" },
                      { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Enter password"
                      iconRender={renderWhiteEye}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Retype Password"
                      iconRender={renderWhiteEye}
                    />
                  </Form.Item>

                  <Form.Item>

                    <Button
                      style={{ height: 48 }}
                      type="primary"
                      block
                      htmlType="submit"
                      loading={submitting}
                    >
                      Sign Up

                    </Button>
                  </Form.Item>

                  <Divider
                    style={{
                      borderColor: "#A1A1A1",
                      fontSize: 12,
                      color: "#A1A1A1",
                    }}
                  >
                    or login with
                  </Divider>

                  <Form.Item>
                    <Button
                      block
                      onClick={signUpWithGoogle}
                      className="social-btn"
                      icon={
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.92 16.8 15.83 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23C14.97 23 17.46 21.99 19.28 20.34L15.83 17.57C14.99 18.15 13.92 18.5 12 18.5C9.14 18.5 6.71 16.57 5.93 13.93H2.36V16.8C4.15 20.35 7.77 23 12 23Z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.93 13.93C5.58 12.86 5.58 11.72 5.93 10.65V7.78H2.36C1.13 10.25 1.13 13.33 2.36 15.8L5.93 13.93Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.31 3.92C17.46 2.18 14.97 1 12 1C7.77 1 4.15 3.65 2.36 7.2L5.93 10.07C6.71 7.43 9.14 5.38 12 5.38Z"
                            fill="#EA4335"
                          />
                        </svg>
                      }
                    >
                      Sign up with Google
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      block
                      onClick={signUpWithFacebook}
                      className="social-btn"
                      icon={
                        <svg
                          width="22"
                          height="23"
                          viewBox="0 0 22 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.6261 11.5C20.6261 8.9473 19.612 6.49914 17.807 4.6941C16.002 2.88906 13.5538 1.875 11.0011 1.875C8.57744 1.87277 6.24216 2.78497 4.46173 4.42939C2.68129 6.07382 1.58678 8.32941 1.39681 10.7456C1.20685 13.1618 1.93543 15.5607 3.43701 17.4632C4.93859 19.3656 7.10262 20.6316 9.49684 21.0081V14.2816H7.05484V11.5H9.49822V9.37975C9.49822 6.968 10.9351 5.63425 13.1337 5.63425C14.187 5.63425 15.2883 5.82263 15.2883 5.82263V8.19175H14.0742C12.878 8.19175 12.5067 8.93425 12.5067 9.69463V11.5H15.1756L14.7493 14.2816H12.5053V21.0081C14.7693 20.6496 16.831 19.495 18.3197 17.7521C19.8083 16.0091 20.6261 13.7922 20.6261 11.5Z"
                            fill="#1877F2"
                          />
                          <path
                            d="M14.7478 14.2816L15.1741 11.4999H12.5052V9.69456C12.5052 8.93419 12.8764 8.19169 14.0727 8.19169H15.2868V5.82119C15.2868 5.82119 14.1854 5.63281 13.1322 5.63281C10.9322 5.63281 9.49669 6.96656 9.49669 9.37831V11.4999H7.05469V14.2816H9.49806V21.0081C10.4948 21.1649 11.5099 21.1649 12.5066 21.0081V14.2816H14.7478Z"
                            fill="white"
                          />
                        </svg>
                      }
                    >
                      Sign up with Facebook
                    </Button>
                  </Form.Item>

                  <Flex
                    justify="center"
                    align="center"
                    style={{ marginTop: "2rem", fontWeight: 400 }}
                  >
                    Already have an account?
                    <Link to="/sign-in" style={{ paddingInline: 5, fontWeight: 600 }}>
                      SignIn
                    </Link>
                  </Flex>

                  <Flex
                    justify="center"
                    style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}
                  >
                    By signing up you agree to our&nbsp;
                    <button
                      type="button"
                      className="link-like"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Terms & Conditions
                    </button>
                  </Flex>
                </Form>
              </div>
            </AnimFadeUp>
          </section>
        </Col>

        {/* Right: Branding */}
        <Col
          className="ellipse-area"
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
        >
          <div className="img-section">
            <div className="logo">
              <AnimFadeUp>
                <Link to="/">
                  <img
                    src={theme === "light" ? logoLight : logo}
                    alt="Smart IP, VPN, Device, and Browser Blocking Software"
                  />
                </Link>
              </AnimFadeUp>
            </div>
            <AnimFadeIn delay={0.2}>
              <h1 className="h1">
                Smart IP, VPN, Device, and Browser Blocking Software
              </h1>
            </AnimFadeIn>
          </div>
        </Col>
      </Row>

      {/* Success mini-modal (kept as-is, simple inline) */}
      {signupSuccess && (
        <div
          className="px-6 py-10 text-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
            zIndex: 1100,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              minWidth: 320,
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Account created successfully!</h3>
            <Button type="primary" onClick={() => setSignupSuccess(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Terms Modal (AntD) */}
      <TermsAndConditionsModal
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </main>
  );
};

export default SignUp;