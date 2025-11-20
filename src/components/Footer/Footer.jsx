import Container from '../Container/Container';
import './Footer.css';
import logo from '@/assets/img/logo.svg';
import { Row, Col } from 'antd';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import colonieLogo from '@/assets/img/miniRippleFooterText.png';
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { AnimFadeUp } from '@/animations/AnimFadeUp';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Container>
          <Row>
            <Col xl={10} sm={{ span: 24 }} xs={{ span: 24 }}>
              <div className="footer-content">
                <div className="footer-content-left">
                  <AnimFadeIn>
                    <img width={168} src={logo} alt="" />
                  </AnimFadeIn>
                  <AnimFadeUp>
                    <p>
                      Protect your websites with powerful traffic protection. Real-time threat
                      detection and ad fraud prevention made it simple.
                    </p>
                  </AnimFadeUp>
                  <AnimFadeUp>
                    <div className="footer-content-left-icons">
                      {/* Updated social links */}
                      <Link
                        href="https://www.facebook.com/share/19urow6dXf/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <div className="icon-circle">
                          <FaFacebookF size={24} color="#4890EF" />
                        </div>
                      </Link>

                      <Link
                        href="https://www.instagram.com/miniripplesolution?igsh=MXh5ejg2NTMzaXU1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <div className="icon-circle">
                          <FaInstagram size={24} color="#4890EF" />
                        </div>
                      </Link>

                      <Link
                        href="https://www.tiktok.com/@minripple"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                      >
                        <div className="icon-circle">
                          <FaTiktok size={24} color="#4890EF" />
                        </div>
                      </Link>
                    </div>
                  </AnimFadeUp>
                </div>
              </div>
            </Col>

            <Col xl={14} sm={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col lg={{ span: 6, offset: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <div className="footer-nav-area">
                    <AnimFadeUp>
                      <h6 className="h6">Quick Links</h6>
                    </AnimFadeUp>
                    <AnimFadeUp>
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/features/ad-fraud">Features</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/referral">Referral Program</Link></li>
                        <li><Link to="/support">Contact Us</Link></li>
                      </ul>
                    </AnimFadeUp>
                  </div>
                </Col>

                <Col lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <div className="footer-nav-area">
                    <AnimFadeUp>
                      <h6 className="h6">Resources</h6>
                    </AnimFadeUp>
                    <AnimFadeUp>
                      <ul>
                        <li><Link to="/features/bot-protection">Blog & Insights</Link></li>
                        <li><Link to="/support">Help Center</Link></li>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/features/analytics">Security Reports</Link></li>
                      </ul>
                    </AnimFadeUp>
                  </div>
                </Col>

                <Col lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                  <div className="footer-nav-area">
                    <AnimFadeUp>
                      <h6 className="h6">Connect With Us</h6>
                    </AnimFadeUp>
                    <AnimFadeUp>
                      <ul>
                        <li><Link to="#"><FaTwitter size={24} />X (Twitter)</Link></li>
                        <li><Link to="#"><FaLinkedin size={24} />LinkedIn</Link></li>
                        <li><Link to="https://www.facebook.com/share/19urow6dXf/"><FaFacebookF size={24} />Facebook</Link></li>
                        <li><Link to="#"><FaYoutube size={24} />YouTube</Link></li>
                      </ul>
                    </AnimFadeUp>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>

      <section className="footer-bottom">
        <Container>
          <Row>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <AnimFadeUp>
                <p>© 2025 All Rights Reserved to Colonie</p>
              </AnimFadeUp>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <AnimFadeUp>
                <nav className="footer-bottom-nav">
                  <ul>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms-of-use">Terms of Use</Link></li>
                  </ul>
                </nav>
              </AnimFadeUp>
            </Col>
          </Row>

          <div className="footer-img">
            <AnimFadeUp>
              <img className="res-img" src={colonieLogo} alt="Colonie" />
            </AnimFadeUp>
          </div>
        </Container>
      </section>
    </>
  );
}
