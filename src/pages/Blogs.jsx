import React from "react";
import "./Blogs.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AnimFadeUp } from "@/animations";
import IntroSection from "@/components/IntroSection/IntroSection";
// dummy data for blog section
export const blogData = [
    {
        id: 1,
        title: "Ad Fraud Detection & IP Blocking",
        description: "Learn how MiniRipple protects your website from bots and malicious traffic.",
        link: "/features/ad-fraud",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvskGSAIgYdCyH2zsFCUeeeo1yzeB7U0YrFdiRAJjQkY8nSyh78mIodYhr0sVGLwPlww&usqp=CAU",
        date: "Nov 20, 2025",
    },
    {
        id: 2,
        title: "Bot Protection",
        description: "Get detailed insights about your website visitors and traffic.",
        link: "/features/bot-protection",
        image: "https://cdn.prod.website-files.com/627532e043f5505c844dd553/632bc733076b9a79b557eb3c_common_ad_fraud_methods_415a9217f2.png",
        date: "Nov 18, 2025",
    },
    {
        id: 3,
        title: "Suspicious Activity Detection",
        description: "Prevent click fraud and protect your ad campaigns efficiently.",
        link: "/features/suspicious-activity",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDgghat7CH4fu9fj2Aov9fQFGOp8b6X1-hA&s",
        date: "Nov 15, 2025",
    },
    {
        id: 4,
        title: "Device & Browser Control",
        description: "Manage and control which devices and browsers can access your website to prevent unauthorized traffic.",
        link: "/features/device-control",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI_6HxzSvn8heakGCKTvAznM-CPw6Q8E4g&s",
        date: "Nov 15, 2025",
    },
    {
        id: 5,
        title: "Live Traffic Monitoring",
        description: "Track your website visitors in real-time, detect unusual spikes, and respond instantly to suspicious activity.",
        link: "/features/monitoring",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuq1Jk9tc6p3551Ri5JW2BJNzNeO18nELY0A&s",
        date: "Nov 16, 2025",
    },
    {
        id: 6,
        title: "Analytics Dashboard",
        description: "View detailed analytics and insights about your traffic, clicks, and user behavior to optimize your campaigns.",
        link: "/features/analytics",
        image: "https://images.contentstack.io/v3/assets/blt28ff6c4a2cf43126/bltf62f2c4d3eaa28c1/651c770e6065f306362284bf/nta-network-traffic-forensics_(2).png?auto=webp&disable=upscale&width=3840&quality=75",
        date: "Nov 17, 2025",
    },

];


export default function Blogs() {
    return (
        <main className="blog-section">
            <IntroSection
                title={`Latest <span>Features & Updates</span>`}
                description="Explore our platform features like blog posts. ">
            </IntroSection>
            <section className="blog-container">
                <AnimFadeUp delay={0.5}>
                    <div className="blog-grid">
                        {blogData.map((item) => (
                            <div className="blog-card" key={item.id}>
                                <img src={item.image} alt={item.title} className="blog-img" />
                                <div className="blog-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <span className="blog-date">{item.date}</span>
                                    <Link to={item.link} className="blog-readmore">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimFadeUp>
            </section>
        </main>
    );
}
