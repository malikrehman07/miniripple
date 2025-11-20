import React from 'react'
import Container from '../Container/Container'
import Panel from '../Panel/Panel'
import './SimplifiedSecuritySection.css'
import { Col, Row, Tag } from 'antd'
import img from '@/assets/img/cuttingEdgeTechnologySimplifiedSecurity.png'
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { AnimFadeUp } from '@/animations/AnimFadeUp';
import { useTheme } from '@/contexts/ThemeContext';

export default function SimplifiedSecuritySection() {
    const { theme } = useTheme();
    return (
        <section className="simplified-security-section">
            <Container>
                <Row>
                    <Col md={12} sm={24} xs={24}>
                        <AnimFadeIn>
                        <article className='content'>
                            <Tag className="tag-primary">Why Choose MiniRipple?</Tag>
                            <h2 className='h2'>Cutting-Edge Technology, Simplified Security</h2>
                            <p className='p'>At MiniRipple, we use the latest technology to protect your website. Our simple platform gives you strong security without the complexity.</p>
                        </article>
                        </AnimFadeIn>

                        <article className='micro-content-wrap'>
                            <div className='icon-svg'>
                                <AnimFadeUp>
                                <svg className="plain-svg" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.75 15.5696C27.48 15.6096 27.29 15.8696 27.34 16.1395C27.45 16.7695 27.5 17.4196 27.5 18.0596C27.5 21.5795 25.91 24.7396 23.4 26.8596C22.95 23.9996 20.91 21.7095 18.22 20.8895C19.3 20.1696 20 18.9496 20 17.5596C20 15.3495 18.21 13.5596 16 13.5596C13.79 13.5596 12 15.3495 12 17.5596C12 18.9496 12.7 20.1696 13.78 20.8895C11.09 21.7095 9.04999 23.9996 8.59998 26.8596C6.09003 24.7396 4.5 21.5795 4.5 18.0596C4.5 17.4196 4.54999 16.7695 4.65997 16.1395C4.71002 15.8696 4.52002 15.6096 4.25 15.5696C3.96997 15.5195 3.71997 15.6996 3.66998 15.9796C3.56 16.6595 3.5 17.3596 3.5 18.0596C3.5 24.9496 9.10999 30.5596 16 30.5596C22.89 30.5596 28.5 24.9496 28.5 18.0596C28.5 17.3596 28.44 16.6595 28.33 15.9796C28.28 15.6996 28.03 15.5195 27.75 15.5696ZM13 17.5596C13 15.9095 14.35 14.5596 16 14.5596C17.65 14.5596 19 15.9095 19 17.5596C19 19.2095 17.65 20.5596 16 20.5596C14.35 20.5596 13 19.2095 13 17.5596Z" fill="white"/>
                                <path d="M19.0399 8.29947L19.5799 11.4895C19.6199 11.6695 19.5399 11.8595 19.3799 11.9795C19.2999 12.0395 19.1899 12.0695 19.0899 12.0695C19.0099 12.0695 18.9299 12.0495 18.8599 12.0095L15.9999 10.5095L13.1399 12.0095C12.9699 12.0995 12.7699 12.0894 12.6199 11.9795C12.4599 11.8595 12.3799 11.6695 12.4199 11.4895L12.9599 8.29947L10.6499 6.04947C10.5099 5.91946 10.4699 5.71945 10.5199 5.53946C10.5799 5.35947 10.7399 5.22946 10.9299 5.19949L14.1199 4.72946L15.5499 1.83945C15.7199 1.49948 16.2799 1.49948 16.4499 1.83945L17.8799 4.72946L21.0699 5.19949C21.2599 5.22946 21.4199 5.35947 21.4799 5.53946C21.5299 5.71945 21.4899 5.91946 21.3499 6.04947L19.0399 8.29947Z" fill="white"/>
                                <path d="M11.4799 8.80948C11.5299 8.98947 11.4899 9.18948 11.3499 9.31949L9.53987 11.0894L9.95992 13.5794C9.99989 13.7694 9.91988 13.9594 9.76991 14.0695C9.67989 14.1394 9.57991 14.1695 9.46987 14.1695C9.38991 14.1695 9.30989 14.1494 9.23988 14.1095L6.99989 12.9295L4.7599 14.1095C4.58992 14.1995 4.38991 14.1795 4.22987 14.0695C4.07991 13.9594 3.99989 13.7694 4.03987 13.5794L4.45992 11.0894L2.64992 9.31949C2.5099 9.18948 2.46987 8.98947 2.51991 8.80948C2.57991 8.62949 2.73988 8.49948 2.92989 8.46945L5.42989 8.10947L6.54988 5.83945C6.71987 5.49948 7.27992 5.49948 7.44991 5.83945L8.5699 8.10947L11.0699 8.46945C11.2599 8.49948 11.4199 8.62949 11.4799 8.80948Z" fill="white"/>
                                <path d="M29.3499 9.31949L27.5399 11.0894L27.9599 13.5794C27.9999 13.7694 27.9199 13.9594 27.7699 14.0695C27.6799 14.1394 27.5799 14.1695 27.4699 14.1695C27.3899 14.1695 27.3099 14.1494 27.2399 14.1095L24.9999 12.9295L22.7599 14.1095C22.5899 14.1995 22.3899 14.1795 22.2299 14.0695C22.0799 13.9594 21.9999 13.7694 22.0399 13.5794L22.4599 11.0894L20.6499 9.31949C20.5099 9.18948 20.4699 8.98947 20.5199 8.80948C20.5799 8.62949 20.7399 8.49948 20.9299 8.46945L23.4299 8.10947L24.5499 5.83945C24.7199 5.49948 25.2799 5.49948 25.4499 5.83945L26.5699 8.10947L29.0699 8.46945C29.2599 8.49948 29.4199 8.62949 29.4799 8.80948C29.5299 8.98947 29.4899 9.18948 29.3499 9.31949Z" fill="white"/>
                                </svg>
                                </AnimFadeUp>
                            </div>
                            <div className='micro-content'>
                                <AnimFadeIn>
                                <h4 className='h4'>Seamless User Experience</h4>
                                <p className='p'>We strive to provide a user-friendly interface to both beginners and experts. No need for complicated setups, enjoy only smooth, hassle-free performance.</p>
                                </AnimFadeIn>
                            </div>
                        </article>

                        <article className='micro-content-wrap'>
                            <div className='icon-svg'>
                                <AnimFadeUp>
                                <svg className='plain-svg' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.2317 14.2156C29.026 13.7176 28.5389 13.3925 28.0001 13.3925H23.1015L25.2826 5.75892C25.4494 5.17428 25.1994 4.55124 24.6759 4.2434C24.1549 3.9362 23.4871 4.02004 23.0573 4.4498L12.3908 15.1167C12.0094 15.4981 11.8954 16.0712 12.1018 16.5698C12.3082 17.0677 12.7946 17.3928 13.3335 17.3928H19.3114L16.1082 24.868C15.8564 25.4552 16.0567 26.1388 16.586 26.4968C16.8132 26.6504 17.0737 26.726 17.3329 26.726C17.6772 26.726 18.0183 26.5932 18.2762 26.3352L28.9428 15.6687C29.3242 15.2872 29.4388 14.7144 29.2317 14.2156Z" fill="white"/>
                                    <path d="M11.9999 24.0596H3.99994C3.26362 24.0596 2.6665 24.6561 2.6665 25.393C2.6665 26.13 3.26362 26.7265 3.99994 26.7265H11.9999C12.7363 26.7265 13.3334 26.13 13.3334 25.393C13.3334 24.6561 12.7363 24.0596 11.9999 24.0596Z" fill="white"/>
                                    <path d="M5.33344 20.0595H9.33344C10.0698 20.0595 10.6669 19.463 10.6669 18.726C10.6669 17.9891 10.0698 17.3926 9.33344 17.3926H5.33344C4.59712 17.3926 4 17.9891 4 18.726C4 19.463 4.59712 20.0595 5.33344 20.0595Z" fill="white"/>
                                    <path d="M7.99994 6.72613H17.3334C18.0703 6.72613 18.6668 6.12901 18.6668 5.39269C18.6668 4.65637 18.0703 4.05957 17.3334 4.05957H7.99994C7.26362 4.05957 6.6665 4.65669 6.6665 5.39301C6.6665 6.12933 7.26362 6.72613 7.99994 6.72613Z" fill="white"/>
                                    <path d="M6.66645 13.393H10.6664C11.4028 13.393 11.9999 12.7958 11.9999 12.0595C11.9999 11.3232 11.4028 10.7261 10.6664 10.7261H6.66645C5.93013 10.7261 5.33301 11.3232 5.33301 12.0595C5.33301 12.7958 5.93013 13.393 6.66645 13.393Z" fill="white"/>
                                </svg>
                                </AnimFadeUp>
                            </div>
                            <div className='micro-content'>
                                <AnimFadeIn>
                                <h4 className='h4'>Fast and Reliable Performance</h4>
                                <p className='p'>MiniRipple is designed for speed and reliability. It manages large transaction volumes without delays or downtime. You can rely on consistent and efficient results every time. </p>
                                </AnimFadeIn>
                            </div>
                        </article>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <AnimFadeUp>
                        <img className='res-img' src={theme === 'dark' ? '/assets/img/CuttingEdgeTechnology.png' : '/assets/img/CuttingEdgeTechnologyLight.png'} alt="Cutting-Edge Technology, Simplified Security" />
                        </AnimFadeUp>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}