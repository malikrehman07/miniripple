import { Row, Col, Button } from "antd";
import Container from "../Container/Container";
import logo from "@/assets/img/logoForDark.png";
import logoLight from "@/assets/img/logoLight.svg";
import "./Header.css";
import Menu from "../Menu/Menu";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/middlewares/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        headerRef.current?.classList.add("active");
      } else {
        headerRef.current?.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle responsive logic
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);


  const handleButtonClick = () => {
    if (user) {
      navigate("/dashboard"); 
    } else {
      navigate("/sign-in"); 
    }
  };

  return (
    <header className="main-header" ref={headerRef}>
      <Container>
        <div className="header-glass-bg">
          <Row justify="space-between" align="middle">
            {/* Logo */}
            <Col>
              <Link to="/">
                <img
                  src={theme === "light" ? logoLight : logo}
                  alt="Mini Ripple"
                />
              </Link>
            </Col>

            {/* Desktop Menu */}
            {!isMobile && (
              <>
                <Col className="desktop-menu">
                  <Menu />
                </Col>

                <Col className="desktop-menu flex">
                  <ThemeToggle />
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={handleButtonClick}
                    className="signin-button"
                  >
                    {user ? "Go To Dashboard" : "Sign In"}
                  </Button>
                </Col>
              </>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <Col className="mobile-menu-col">
                <MobileMenu />
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </header>
  );
}
