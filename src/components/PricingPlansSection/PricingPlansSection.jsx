import './PricingPlansSection.css';
import Container from '../Container/Container';
import { Col, Row, Tag } from 'antd';
import PackageWidget from '../PackageWidget/PackageWidget';
import IconPower from '../../Icons/IconPower';
import { AnimFadeIn } from '@/animations/AnimFadeIn';

export default function PricingPlansSection() {
    return (
        <section className="pricing-plans-section">
            <Container>
                <AnimFadeIn delay={0.1}>
                    <article className='content'>
                        <Tag className="tag-primary">Affordable</Tag>
                        <h2 className='h2'>Pricing Plans</h2>
                        <p className='p'>Choose the best plan for your website's security.</p>
                    </article>
                </AnimFadeIn>

                <Row>
                    <Col xs={24} md={24} lg={24}>
                        <PackageWidget
                            icon={<IconPower />}
                            title="Lifetime package"
                            description="All features to boost you"
                            price="$199.99"
                            crossPrice="$599"
                            features={
                                [
                                    { title: 'Full Website Security & Traffic Control' },
                                    { title: 'Device Type Tracking' },
                                    { title: 'Block Bots, VPNs, and Suspicious Traffic' },
                                    { title: 'Browser Type Tracking' },
                                    { title: 'Real-Time Analytics & Insights' },
                                    { title: 'Properties Allowed: 1' },
                                    { title: 'One-Time Purchase, Lifetime Protection' },
                                    { title: 'Visitors Allowed: 5000' },
                                    { title: 'IP Address Tracking' }
                                ]
                            }
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}