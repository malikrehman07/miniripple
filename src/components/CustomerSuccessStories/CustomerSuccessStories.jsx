import './CustomerSuccessStories.css';
import Container from '../Container/Container';
import { Col, Row, Tag, Card, Rate } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useCallback } from 'react';
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { AnimFadeUp } from '@/animations/AnimFadeUp';
import { AnimFadeDown } from '@/animations/AnimFadeDown';

const testimonials = [
  {
    id: 1,
    content:
      'Our online store kept getting hit with fake orders and abandoned carts. MiniRipple stopped bot-driven cart abuse and saved us thousands in losses.',
    author: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    avatar: 'SJ',
    img: '../assets/img/user1.png'
  },
  {
    id: 7,
    content:
      'Streaming bots and fake accounts were spamming our platform. MiniRipple blocked them in real time, restoring fair play for genuine users.',
    author: 'Michael Chen',
    role: 'Security Lead, InnovateX',
    avatar: 'MC',
    img: '../assets/img/user2.png'
  },
  {
    id: 3,
    content:
      'Scalper bots used to wipe out our limited product drops. MiniRipple’s protection ensured real buyers could finally access our launches.',
    author: 'Emily Rodriguez',
    role: 'CEO, SecureNet',
    avatar: 'ER',
    img: '../assets/img/user3.png'
  },
  {
    id: 4,
    content:
      'As a publisher, our traffic reports were inflated by bots. MiniRipple filtered out the fake visits, giving advertisers confidence in our numbers.',
    author: 'David Kim',
    role: 'IT Director, GlobalTech',
    avatar: 'DK',
    img: '../assets/img/user4.png'
  }
];

export default function CustomerSuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('left');

  const len = testimonials.length;
  const itemsPerCol = 2; // 2 cards per column -> 4 unique cards total

  // window helper (wrap-around, no duplicates between columns)
  const windowFrom = (start, count) => {
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(testimonials[(start + i) % len]);
    }
    return out;
  };

  const col1 = windowFrom(currentIndex, itemsPerCol);
  const col2 = windowFrom((currentIndex + itemsPerCol) % len, itemsPerCol);

  const nextSlide = useCallback(() => {
    setAnimationDirection('left');
    setCurrentIndex((i) => (i + 1) % len); // rotate by 1
  }, [len]);

  const prevSlide = useCallback(() => {
    setAnimationDirection('right');
    setCurrentIndex((i) => (i - 1 + len) % len);
  }, [len]);

  return (
    <section className="customer-success-stories">
      <Container>
        <Row gutter={[10, 16]} align="top">
          <Col xs={24} md={12}>
            <AnimFadeIn delay={0.5}>
              <article className="content">
                <Tag className="tag-primary">Customer Success Stories</Tag>
                <h2 className="h2">Real Results from Real Businesses</h2>
                <p className="p">
                  Real stories from real users. See how MiniRipple has transformed the way businesses
                  protect their platforms and stop threats before they happen.
                </p>
              </article>
            </AnimFadeIn>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[20, 0]} className="grad-bg">
              {/* Column 1 */}
              <Col className="carousel-container1" lg={12} md={24}>
                <div className="carousel-container">
                  <div className="testimonials-wrapper desktop">
                    {col1.map((t) => (
                      <AnimFadeUp key={`col1-${t.id}-${currentIndex}`}>
                        <Card className={`testimonial-card ${animationDirection}`}>
                          <Rate style={{ fontSize: '1.5rem' }} disabled defaultValue={5} />
                          <p className="testimonial-content">"{t.content}"</p>
                          <div className="testimonial-author">
                            <img src={t.img} alt="" className="avatar" />
                            <div className="author-info">
                              <h4 className="author-name">{t.author}</h4>
                              <p className="author-role">{t.role}</p>
                            </div>
                          </div>
                        </Card>
                      </AnimFadeUp>
                    ))}
                  </div>
                  {/* Controls (optional) */}
                  <div className="carousel-mobile-nav">
                    <button className="mobile-nav-arrow left-arrow" onClick={prevSlide} aria-label="Previous testimonial">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 16H7.333M7.333 16L15.333 8M7.333 16L15.333 24" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className="mobile-nav-arrow right-arrow" onClick={nextSlide} aria-label="Next testimonial">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16H24.667M24.667 16L16.667 8M24.667 16L16.667 24" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Col>

              {/* Column 2 (different window, no reversing) */}
              <Col className="carousel-container2" lg={12} md={24}>
                <div className="carousel-container">
                  <div className="testimonials-wrapper testimonials_2">
                    {col2.map((t) => (
                      <AnimFadeDown key={`col2-${t.id}-${currentIndex}`}>
                        <Card className={`testimonial-card ${animationDirection}`}>
                          <Rate style={{ fontSize: '1.5rem' }} disabled defaultValue={5} />
                          <p className="testimonial-content">"{t.content}"</p>
                          <div className="testimonial-author">
                            <img src={t.img} alt="" className="avatar" />
                            <div className="author-info">
                              <h4 className="author-name">{t.author}</h4>
                              <p className="author-role">{t.role}</p>
                            </div>
                          </div>
                        </Card>
                      </AnimFadeDown>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
