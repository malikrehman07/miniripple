import Container from '../Container/Container';
import './RealTimeSection.css';
import { Button, Col, Row, Tag } from 'antd';
import Panel from '../Panel/Panel';
import RealTime from '@/assets/img/real-time.png';
import Detect from '@/assets/img/detect.png';
import Block from '@/assets/img/block.png';
import { Link } from 'react-router-dom';
import { AnimFadeUp } from '@/animations/AnimFadeUp';
import { AnimFadeIn } from '../../animations';
import { useTheme } from '@/contexts/ThemeContext';

export default function RealTimeSection() {
    const { theme } = useTheme();

    return (
        <section className="real-time-section">
            <Container>
                <AnimFadeUp>
                    <article className='content'>
                        <Tag className="tag-primary">How It Works</Tag>
                        <h2 className='h2' >Integrate, Detect, and Block Instantly</h2>
                        <p className='p'> MiniRipple works smoothly to protect your digital assets with a clear three-step process.</p>
                    </article>
                </AnimFadeUp>

                <Panel className="real-time-panel">
                    <Row gutter={[30, 16]}>
                        <Col md={{ span: 10, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                            <AnimFadeIn>
                                <article className='panel-content'>
                                    <h4 className='h4'>Integrate</h4>
                                    <p className='p'>MiniRipple, the best web protection software available, connects easily with your website in just a few steps. You won’t need complex coding or technical knowledge to get started. Our streamlined setup process makes it possible to activate protection instantly.</p>
                                </article>
                            </AnimFadeIn>
                        </Col>
                        <Col md={{ span: 14, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                            <AnimFadeUp><img className='res-img' src={theme === 'dark' ? '/assets/img/Integrate.png' : '/assets/img/IntegrateLight.png'} alt="" /></AnimFadeUp>
                        </Col>
                    </Row>
                </Panel>

                <Row gutter={[24, 24]}>
                    {/* Detect Panel */}
                    <Col lg={12} md={24} sm={24} xs={24} className="flex h-full">
                        <Panel className="real-time-panel flex flex-col flex-1 h-full">
                            <Row gutter={[12, 12]} className="flex-1 items-center">
                                <Col md={{ span: 12, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} className="flex flex-col justify-center">
                                    <AnimFadeIn>
                                        <article className="panel-content pb-4">
                                            <h4 className="h4">Detect</h4>
                                            <p className="p">
                                                Our system uses advanced technology to study traffic patterns. It can
                                                find harmful bots and suspicious activities in real time with high
                                                accuracy. The system combines machine learning, behavior tracking, and
                                                anomaly detection, staying alert and quickly adapting to new threats.
                                            </p>
                                        </article>
                                    </AnimFadeIn>
                                </Col>
                                <Col md={{ span: 12, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }} className="flex justify-center items-center">
                                    <AnimFadeUp>
                                        <img
                                            className="res-img"
                                            src={theme === "dark" ? "/assets/img/Detect.png" : "/assets/img/DetectLight.png"}
                                            alt="Detect"
                                        />
                                    </AnimFadeUp>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>

                    {/* Block Panel */}
                    <Col lg={12} md={24} sm={24} xs={24} className="flex h-full">
                        <Panel className="real-time-panel flex flex-col flex-1 h-full">
                            <Row gutter={[12, 12]} className="flex-1 items-center">
                                <Col md={{ span: 12, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} className="flex flex-col justify-center order-2 md:order-1">
                                    <AnimFadeIn>
                                        <article className="panel-content pb-4">
                                            <h4 className="h4">Block</h4>
                                            <p className="p">
                                                The system automatically blocks suspicious IPs and sends alerts whenever
                                                a risky IP is detected. Combining manual control and real-time monitoring,
                                                it ensures a safe environment for all users.
                                            </p>
                                        </article>
                                    </AnimFadeIn>
                                </Col>
                                <Col md={{ span: 12, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }} className="flex justify-center items-center order-1 md:order-2">
                                    <AnimFadeUp>
                                        <img
                                            className="res-img mt-auto"
                                            src={theme === "dark" ? "/assets/img/Block.png" : "/assets/img/BlockLight.png"}
                                            alt="Block"
                                        />
                                    </AnimFadeUp>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>




                {/* <Row gutter={[20, 0]} className="flex flex-wrap items-stretch">
                    <Col lg={12} md={24} sm={{span:24}} xs={{span:24}} className="flex">
                        <Panel className="real-time-panel">
                            <Row gutter={[6, 16]}>
                                <Col md={{span:12, order:1}} sm={{span:24, order:2}} xs={{span:24, order:2}}>
                                    <AnimFadeIn>
                                    <article className='panel-content' style={{ paddingBottom: '16px'}}>
                                        <h4 className='h4'>Detect</h4>
                                        <p className='p'>Our system uses advanced technology to study traffic patterns. It can find harmful bots and suspicious activities in real time with high accuracy. The system combines machine learning, 
behavior tracking, and anomaly detection. This helps it stay alert and quickly adapt to new threats.
</p>
                                        <Link to={'/sign-up'}>
                                            <Button type="primary" shape="round" size="large" style={{display:'none'}}>
                                                Free Trial
                                            </Button>
                                        </Link>
                                    </article>
                                    </AnimFadeIn>
                                </Col>
                                <Col md={{span:12, order:2}} sm={{span:24, order:1}} xs={{span:24, order:1}}>
                                    <AnimFadeUp><img className='res-img' src={theme === 'dark' ? '/assets/img/Detect.png' : '/assets/img/DetectLight.png'} alt="" /></AnimFadeUp>
                                </Col>
                            </Row>                        
                        </Panel>                        
                    </Col>
                    <Col lg={12} md={24} sm={{span:24}} xs={{span:24}} className='flex'>
                        <Panel className="real-time-panel" style={{ paddingBottom: '0'}}>
                            <article className='panel-content'>
                            <AnimFadeIn>
                                <h4 className='h4'>Block</h4>
                                <p className='p'>The system automatically blocks suspicious IPs and also offers automatic blocking feature. You will receive alerts whenever a potentially risky IP address is detected, keeping you informed in real time and enabling you to take immediate action to protect your website. By combining manual control and real-time monitoring, the system maintains a safe and secure environment for all users.</p>
                                </AnimFadeIn>
                                <AnimFadeUp><img className='res-img' src={theme === 'dark' ? '/assets/img/Block.png' : '/assets/img/BlockLight.png'} alt="" /></AnimFadeUp>
                            </article>                      
                        </Panel>                        
                    </Col>
                </Row>            */}
            </Container>
        </section>
    );
}