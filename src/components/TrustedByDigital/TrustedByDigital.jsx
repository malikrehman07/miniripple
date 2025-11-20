import './TrustedByDigital.css';
import Container from "../Container/Container";
import { AnimFadeIn } from '../../animations/AnimFadeIn';
import { AnimFadeDown } from '../../animations/AnimFadeDown';
import { AnimFadeUp } from '../../animations/AnimFadeUp';
import { Row, Col, Rate } from 'antd';
import avatarMan from '../../assets/img/avatarMan.png';

export default function TrustedByDigital() {
    return (
        <section className="trusted-by-digital">
            <Container>
                <article className='content'>
                    <div className="content-wrap">
                        <Row>
                            <Col lg={12} md={24}>
                                <AnimFadeIn delay={0.5}>
                                    <h2 className='h2'>Trusted by Digital<br /> Marketers & Site owners</h2>
                                    <p className='p'>Thousands trust MiniRipple’s real-time monitoring to detect fake traffic, save ad spend, and make better decisions fast.</p>
                                </AnimFadeIn>

                                <AnimFadeUp>
                                <article className="reviews-area">
                                    <p className='p'>"MiniRipple allows me to detect a pattern of repeated fake clicks in under an hour. It saves us hundreds in wasted ad spend and boosts our ROI."</p>
                                    <div className="author">
                                        <span className='author--name'>James R.</span>
                                        <span className="author--designation">e-Commerce Owner</span>
                                        <Rate disabled defaultValue={5} />
                                    </div>
                                </article>
                                </AnimFadeUp>
                            </Col>
                            <Col lg={12} md={24}>
                                <AnimFadeDown>
                                <img className='res-img' src={avatarMan} alt="Trusted by Digital Marketers & Site owners" />
                                </AnimFadeDown>
                            </Col>
                        </Row>
                        
                    </div>
                </article>
            </Container>
        </section>
    )
};