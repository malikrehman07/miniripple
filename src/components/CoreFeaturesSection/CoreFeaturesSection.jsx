
import Container from "../Container/Container";
import { Button, Col, Row, Tag } from "antd";
import './CoreFeaturesSection.css';
import { Link } from "react-router-dom";
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { AnimFadeUp } from '@/animations/AnimFadeUp';

export default function CoreFeaturesSection({ title, description, list }) {
    return (
        <section className="core-features-section">
            <Container>
                <AnimFadeIn>
                <article className='content'>
                    <Tag className="tag-primary">Core Features</Tag>
                    <h2 className='h2' dangerouslySetInnerHTML={{ __html: title }}></h2>
                    {
                        description && (<p className='p' dangerouslySetInnerHTML={{ __html: description }}></p>)
                    }

                </article>
                </AnimFadeIn>

                {
                    list && list.map((item, index) => (
                        <article key={index} className="feature-item">
                            <AnimFadeUp>
                            <Row gutter={[20, 16]}>
                                <Col md={{ span: 6, order: 1 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }} className="count-col">
                                    {String(index + 1).padStart(2, '0')}
                                </Col>
                                <Col md={{ span: 11, order: 2 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} className="content-col">
                                    <h4 className='h4'>{item.title}</h4>
                                    {
                                        item.description && <p className='p'>{item.description}</p>
                                    }

                                    {
                                        item.htmlDescription && (<div dangerouslySetInnerHTML={{ __html: item.htmlDescription }}></div>)
                                    }
                                    {
                                        item.url && (
                                            <Link to={item.url}>
                                                <Button type="primary" shape="round" size="large">
                                                    Learn More
                                                </Button>
                                            </Link>
                                        )
                                    }
                                </Col>
                                <Col md={{ span: 7, order: 3 }} sm={{ span: 24, order: 3 }} xs={{ span: 24, order: 3 }} className="img-col">
                                    {
                                        item.img && (
                                            <img className="res-img" src={item.img} alt={item.title} />
                                        )
                                    }
                                </Col>
                            </Row>
                            </AnimFadeUp>
                        </article>
                    ))
                }
                
            </Container>
        </section>
    );
}