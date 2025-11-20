import React from "react";
import "./TermsOfUse.css";
import { AnimFadeUp } from "@/animations";
import IntroSection from "@/components/IntroSection/IntroSection";
import Container from "@/components/Container/Container";

export default function TermsOfUse() {
  return (
    <main className="terms-page">
      <IntroSection
        title={`Terms of <span>Use</span>`}
        description="By using MiniRipple services, you agree to the following terms and conditions. ">
      </IntroSection>
      <Container>
        <AnimFadeUp delay={0.5}>
          <div className="terms-section">
            <h2>Eligibility</h2>
            <p>You must be 18+ and legally capable of entering into contracts to use our services.</p>
          </div>

          <div className="terms-section">
            <h2>User Accounts</h2>
            <p>Keep your account and password secure. You are responsible for all activity under your account.</p>
          </div>

          <div className="terms-section">
            <h2>Prohibited Use</h2>
            <p>Do not use our services for illegal activities, hacking, spamming, or distributing harmful content.</p>
          </div>

          <div className="terms-section">
            <h2>Intellectual Property</h2>
            <p>All content, logos, and materials are owned by MiniRipple. Unauthorized copying or redistribution is prohibited.</p>
          </div>

          <div className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>MiniRipple is not liable for damages arising from use of our services.</p>
          </div>

          <div className="terms-section">
            <h2>Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use indicates acceptance of updated terms.</p>
          </div>
        </AnimFadeUp>
      </Container>

    </main >
  );
}
