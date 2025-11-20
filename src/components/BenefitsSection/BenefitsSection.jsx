import React, { useCallback, useEffect, useState } from 'react';
import Container from '../Container/Container';
import Panel from '../Panel/Panel';
import './BenefitsSection.css';
import { AnimFadeUp } from '@/animations/AnimFadeUp';
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { Col, Row, Tag } from 'antd';

export default function BenefitsSection({ tag, title, description, data, children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setVisibleItems([data[0]]);
            } else {
                setVisibleItems([...data]);
            }
        };

        handleResize(); // Initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data]);

    const nextSlide = useCallback(() => {
        const newIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(newIndex);
        setVisibleItems([data[newIndex]]);
    }, [currentIndex, data]);

    const prevSlide = useCallback(() => {
        const newIndex = (currentIndex - 1 + data.length) % data.length;
        setCurrentIndex(newIndex);
        setVisibleItems([data[newIndex]]);
    }, [currentIndex, data]);

    return (
        <section className="benefits-section">
            <Container>
                <AnimFadeIn>
                    <article className='content'>
                        <Tag className="tag-primary">{tag}</Tag>
                        <h2 className='h2'>{title}</h2>
                        <p className='p'>{description}</p>
                        {children}
                    </article>
                </AnimFadeIn>

                {isMobile ? (
                    <div className="benefits-carousel">
                        <div className="carousel-slide">
                            {visibleItems.map((item, index) => (
                                <div className="panel-border" key={item.title}>
                                    <Panel>
                                        <article className="panel-content">
                                            <div className="icon">{item.icon}</div>
                                            <h4 className="h4">{item.title}</h4>
                                            <p className="p">{item.description}</p>
                                        </article>
                                    </Panel>
                                </div>
                            ))}
                        </div>
                        <div className='carousel-mobile-nav'>
                            <button
                                className="mobile-nav-arrow left-arrow"
                                onClick={prevSlide}
                                aria-label="Previous benefit"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 16H7.33337M7.33337 16L15.3333 8M7.33337 16L15.3333 24" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="carousel-dots" style={{display: 'none'}}>
                                {data.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setVisibleItems([data[index]]);
                                        }}
                                    />
                                ))}
                            </div>
                            <button
                                className="mobile-nav-arrow right-arrow"
                                onClick={nextSlide}
                                aria-label="Next benefit"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 16H24.6667M24.6667 16L16.6667 8M24.6667 16L16.6667 24" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Row gutter={[20, 10]}>
                        {data.map((item, index) => (
                            <Col lg={item.lg} md={item.md} sm={item.sm} xs={item.xs} key={item.title}>
                                <AnimFadeIn>
                                    <div className="panel-border">
                                        <Panel>
                                            <article className="panel-content">
                                                <div className="icon">{item.icon}</div>
                                                <h4 className="h4">{item.title}</h4>
                                                <p className="p">{item.description}</p>
                                            </article>
                                        </Panel>
                                    </div>
                                </AnimFadeIn>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    )
}