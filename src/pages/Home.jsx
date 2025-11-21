import { Button } from "antd";
import { Link } from "react-router-dom";
import DashboardOverview from "@/assets/img/dashboard-overview.png";
import IntroSection from "@/components/IntroSection/IntroSection";
import ProtectYourBusinessSection from "@/components/ProtectYourBusinessSection/ProtectYourBusinessSection";
import RealTimeSection from "@/components/RealTimeSection/RealTimeSection";
import DemoVideoSection from "@/components/DemoVideoSection/DemoVideoSection";
import CoreFeaturesSection from "../components/CoreFeaturesSection/CoreFeaturesSection";
import TrustedBySection from "@/components/TrustedBySection/TrustedBySection";


import list01 from "@/assets/img/list-01.png";
import list02 from "@/assets/img/list-02.png";
import list03 from "@/assets/img/list-03.png";
import BenefitsSection from "../components/BenefitsSection/BenefitsSection";
import IconSass from "../Icons/benefits/IconSass";
import IconMediaPublishing from "../Icons/benefits/IconMediaPublishing";
import IconGamingStreaming from "../Icons/benefits/IconGamingStreaming";
import IconEStore from "../Icons/benefits/IconEStore";
import IconDigitalAdvertisers from "../Icons/benefits/IconDigitalAdvertisers";
import IconMarketplace from "../Icons/benefits/IconMarketplace";
import SimplifiedSecuritySection from "../components/SimplifiedSecuritySection/SimplifiedSecuritySection";
import CustomerSuccessStories from "../components/CustomerSuccessStories/CustomerSuccessStories";
import PricingPlansSection from "../components/PricingPlansSection/PricingPlansSection";
import FAQsSection from "../components/FAQsSection/FAQsSection";
import "./Home.css";
import { AnimFadeIn } from "@/animations/AnimFadeIn";
import { AnimFadeUp } from "@/animations/AnimFadeUp";

const Home = () => {
  return (
    <main className="home-page">
      <IntroSection
        title={`Stop Wasting Ad Budget on <span>Bots & Fake Clicks</span>`}
        description="MiniRipple protects your business from fake traffic, improves ROAS, and gives real-time bot detection insights."
      >
        <AnimFadeIn delay={0.5}>
          <div className="flex justify-center gap-3">
            {/* View Demo -> on-page anchor */}
            <a href="#demo" aria-label="View Demo">
              <Button type="primary" shape="round" size="large">
                View Demo
              </Button>
            </a>

            {/* Get Started -> sign up route from App.jsx */}
            <Link to="/sign-up" aria-label="Get Started">
              <Button type="primary" shape="round" size="large">
                Start Free Trail
              </Button>
            </Link>
          </div>
        </AnimFadeIn>

        <AnimFadeUp>
          <div className="flex justify-center img-section">
            <img src={DashboardOverview} alt="Dashboard Overview" className="img" />
          </div>
        </AnimFadeUp>
      </IntroSection>

      <TrustedBySection />
      <ProtectYourBusinessSection />
      <RealTimeSection />
      <DemoVideoSection />

      {/* Core features use valid marketing feature routes */}
      <CoreFeaturesSection
        title={`Advanced Traffic <br/> Blocking Features`}
        list={[
          {
            title: "VPN Detection",
            description:
              "Detect and block risky VPN traffic to stop fraud, hacking, and other threats.",
            url: "/features/suspicious-activity",
            img: list01,
          },
          {
            title: "IP Blocking",
            description:
              "Block harmful IPs instantly to prevent unauthorized access and fake activity.",
            url: "/features/device-control",
            img: list02,
          },
          {
            title: "Analytics Dashboard",
            description:
              "Real-time insights into visitors, bot behavior, and threats in one place.",
            url: "/features/analytics",
            img: list03,
          },
        ]}
      />

      <BenefitsSection
        tag={`Who Benefits from MiniRipple?`}
        title={`Powerful Traffic Protection for Any Online Business`}
        description={`MiniRipple is built to protect a wide range of industries from online threats..`}
        data={[
          { title: "For SaaS", description: "Block bots from signing up and reduce spam accounts.", icon: <IconSass />, lg: 6, md: 12, sm: { span: 24 } },
          { title: "For Marketers", description: "Detect click fraud and protect your PPC campaigns instantly.", icon: <IconMediaPublishing />, lg: 6, md: 12, sm: { span: 24 } },
          { title: "For Streaming", description: "Detect cheats, exploits, and harmful visitors.", icon: <IconGamingStreaming />, lg: 6, md: 12, sm: { span: 24 } },
          { title: "For Agencies", description: "Deliver transparent performance reports to clients.", icon: <IconMarketplace />, lg: 6, md: 12, sm: { span: 24 } },
          { title: "E-Commerce Stores", description: "Eliminate fake orders and fraudulent checkouts.", icon: <IconEStore />, lg: 8, md: 12, sm: { span: 24 } },
          { title: "Ad Protection", description: "Remove invalid clicks, bots, and impression fraud.", icon: <IconMediaPublishing />, lg: 8, md: 12, sm: { span: 24 } },
          { title: "Digital Advertisers", description: "Ensure ads reach real audiences, not bots.", icon: <IconDigitalAdvertisers />, lg: 8, md: 12, sm: { span: 24 } },
        ]}
      />

      <SimplifiedSecuritySection />
      <CustomerSuccessStories />
      <PricingPlansSection />
      <FAQsSection />
    </main>
  );
};

export default Home;
