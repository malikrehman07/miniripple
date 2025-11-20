import Container from '../Container/Container';
import './ProtectYourBusinessSection.css';
import { Button, Tag, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Panel from '../Panel/Panel';
import { AnimFadeIn, AnimSlideInRight } from '../../animations';
import { useTheme } from '@/contexts/ThemeContext';

/* ✅ Import images from src/assets/img */
import Advanced from '@/assets/img/detect.png';                 // use the file that exists in your repo
import Bot from '@/assets/img/botPrevention.png';
import Click from '@/assets/img/clickFraudMitigation.png';

/* If you also have light variants, import them and replace the fallbacks below:
   import AdvancedLight from '@/assets/img/advancedThreatDetectionLight.png';
   import BotLight from '@/assets/img/botPreventionLight.png';
   import ClickLight from '@/assets/img/clickFraudMitigationLight.png';
*/

export default function ProtectYourBusiness() {
  const { theme } = useTheme();

  const data = [
    {
      title: 'Advanced Threat Detection',
      description:
        `MiniRipple instantly detects and blocks suspicious traffic. It protects your website from ad fraud, unauthorized access, and attacks like DDoS keeping your system safe and clean.`,
      img: theme === 'dark' ? Advanced : Advanced, // fallback to same image if light variant not present
      link: '/features/suspicious-activity',
    },
    {
      title: 'Bot Prevention',
      description:
        `Stop harmful bots before they impact your ads or website. MiniRipple blocks fake clicks, scraping, and automated attacks so you keep your budget and performance on track.`,
      img: theme === 'dark' ? Bot : Bot,
      link: '/features/bot-protection',
    },
    {
      title: 'Click Fraud Mitigation',
      description:
        `MiniRipple filters out fake clicks from bots and click farms in real time. Your ad budget is spent only on real users not wasted on fraudulent activity.`,
      img: theme === 'dark' ? Click : Click,
      link: '/features/ad-fraud',
    },
  ];

  return (
    <section className="protect-your-business-section">
      <Container>
        <Row gutter={8} >
          <Col lg={12} md={24} className="sticky-content">
            <AnimFadeIn delay={0.5}>
              <div>
                <Tag className="tag-primary">Overview of MiniRipple</Tag>
                <h3 className="h3">Protect Your Business from Fake Traffic, Bots, and Ad Fraud</h3>
                <Row>
                  <Col lg={18} md={24}>
                    <p className="p">
                      MiniRipple keeps your website and ads safe by stopping harmful activity before it hurts your business.
                      Our smart detection and blocking tools help your digital assets stay secure and optimized at all times.
                      With MiniRipple, you get the benefits of website protection software that adapts to your needs.
                    </p>
                  </Col>
                </Row>
              </div>
            </AnimFadeIn>
          </Col>

          <Col lg={12} md={24}>
            {data.map((item, index) => (
              <AnimSlideInRight key={item.title} delay={index * 0.5}>
                <Panel>
                  <Row>
                    <Col md={{ span: 13, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                      <article className="content mb-[30px]">
                        <h4 className="h4">{item.title}</h4>
                        <p className="p">{item.description}</p>
                        <Link to={item.link}>
                          <Button type="primary" shape="round" size="large">
                            Learn More
                          </Button>
                        </Link>
                      </article>
                    </Col>
                    <Col md={{ span: 11, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                      {/* ✅ use imported image, not a string path */}
                      <img className="res-img" src={item.img} alt={item.title} style={{marginBottom:'20px'}} />
                    </Col>
                  </Row>
                </Panel>
              </AnimSlideInRight>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
