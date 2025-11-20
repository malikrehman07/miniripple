import React, { useState } from "react";
import "./ReferralProgram.css";
import IntroSection from "@/components/IntroSection/IntroSection";
import { Button, Col, Row } from "antd";
import { AnimFadeUp } from "@/animations";
import Container from "@/components/Container/Container";
import { useNavigate } from "react-router-dom";

export default function ReferralProgram() {
    const navigate = useNavigate()
    const [referralLink, setReferralLink] = useState("");
    const [copyText, setCopyText] = useState("Copy");

    // Generate link
    const generateReferralLink = () => {
        const random = Math.random().toString(36).substring(2, 10);
        const link = `https://miniripple.com/ref/${random}`;
        setReferralLink(link);
    };

    // Copy link
    const copyReferralLink = () => {
        if (!referralLink) return;

        navigator.clipboard.writeText(referralLink).then(() => {
            setCopyText("Copied!");
            setTimeout(() => setCopyText("Copy"), 1500);
        });
    };

    return (
        <main>
            <IntroSection
                title={`MiniRipple <span>Referral</span> Program`}
                description="Invite friends, share the power of MiniRipple, and earn 5% recurring commission on every subscription made through your unique referral link. ">
            </IntroSection>
            <section className="referral-section">
                <div className="referral-container">
                    {/* Earnings Box */}
                    <AnimFadeUp delay={0.5}>
                        <div className="referral-banner">
                            <h2>Earn 5% Lifetime Commission</h2>
                            <p>You earn every month as long as your referral stays subscribed.</p>
                        </div>
                    </AnimFadeUp>

                    {/* Steps */}
                    <AnimFadeUp delay={0.5}>
                        <div className="referral-steps">
                            <div className="step-card">
                                <div className="step-icon">🔗</div>
                                <h3>1. Get Your Link</h3>
                                <p>Copy your unique referral link from your dashboard.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-icon">📢</div>
                                <h3>2. Share It</h3>
                                <p>Promote your link through social media, blogs, or friends.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-icon">💰</div>
                                <h3>3. Earn Money</h3>
                                <p>Earn commission automatically for every subscription.</p>
                            </div>
                        </div>
                    </AnimFadeUp>



                    {/* Referral Link Box */}
                    <AnimFadeUp delay={0.5}>
                        <div className="referral-container referral-link-box-react">
                            <h2>Your Referral Program</h2>

                            {/* Buttons */}
                            <div className="referral-actions">
                                <button onClick={generateReferralLink}>Generate Referral Link</button>
                            </div>

                            {/* Input + Copy */}
                            <div className="referral-input-box">
                                <input
                                    type="text"
                                    value={referralLink}
                                    placeholder="Your referral link will appear here..."
                                    readOnly
                                />
                                <button onClick={copyReferralLink}>{copyText}</button>
                            </div>

                            <p className="info">Share your referral link and earn rewards!</p>
                        </div>
                    </AnimFadeUp>


                    {/* CTA */}
                    <AnimFadeUp delay={0.5}>
                        <div className="referral-cta">
                            <h3>Start Earning Today</h3>
                            <p>Become a MiniRipple Partner and earn passive income.</p>
                            <button className="cta-button" onClick={() => navigate("/referral")} >Join Referral Program</button>
                        </div>
                    </AnimFadeUp>

                </div >
            </section >
        </main >
    );
}
