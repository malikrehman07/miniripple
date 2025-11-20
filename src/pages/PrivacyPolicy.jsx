import React from "react";
import "./PrivacyPolicy.css";
import IntroSection from "../components/IntroSection/IntroSection";
import Container from "@/components/Container/Container";
import { AnimFadeUp } from "@/animations";

export default function PrivacyPolicy() {
    return (
        <main className="privacy-page">
            <IntroSection
                title={`Privacy <span>Policy</span>`}
                description="Your privacy matters to us. Learn how MiniRipple collects, uses, and protects your data. ">
            </IntroSection>
            <Container>
                <AnimFadeUp delay={0.5}>
                    <div className="privacy-section">
                        <h2>Information We Collect</h2>
                        <p>We collect data you provide directly such as name, email, and payment information, as well as usage data to improve our services.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>How We Use Your Information</h2>
                        <p>Your information helps us provide services, ensure website security, process payments, and communicate important updates.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Sharing and Disclosure</h2>
                        <p>We do not sell your information. We may share data with trusted partners for services or legal compliance.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Cookies & Tracking</h2>
                        <p>We use cookies to improve user experience, track analytics, and personalize content for you.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Security</h2>
                        <p>We implement reasonable measures to protect your data from unauthorized access or disclosure.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Your Rights</h2>
                        <p>You can request access, correction, or deletion of your data at any time by contacting support@miniripple.com.</p>
                    </div>
                </AnimFadeUp>
            </Container>
        </main>
    );
}
