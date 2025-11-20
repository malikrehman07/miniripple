import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";

export default function ErrorContent() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-transparent px-4">
      <Container>

        <div className="text-center max-w-md">
          {/* Hero Illustration */}
          <img
            src="https://img.icons8.com/ios/250/000000/error.png"
            alt="Page Not Found"
            className="mx-auto mb-6 h-48 sm:h-56 md:h-64 w-auto"
          />

          {/* 404 Heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 mb-4">
            404
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
            Oops! The page you are looking for does not exist.
          </p>

          {/* Back to Home Button */}
          <Link to="/">
            <Button type="primary" variant="solid" size="large">
              Go Back Home
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
