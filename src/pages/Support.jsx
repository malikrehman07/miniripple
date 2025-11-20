import React from 'react';
import './Support.css';
import IntroSection from '../components/IntroSection/IntroSection';
import { Button, Col, Flex, Row, Tag } from 'antd';
import QuicklyFindAnswers from '../components/QuicklyFindAnswers/QuicklyFindAnswers';
import BenefitsSection from '../components/BenefitsSection/BenefitsSection';
import IconGettingStarted from '../Icons/benefits/IconGettingStarted';
import IconAccountBillingAssistance from '../Icons/benefits/IconAccountBillingAssistance';
import IconUnderstandingSecurityPrivacy from '../Icons/benefits/IconUnderstandingSecurityPrivacy';
import IconTroubleshootingCommonErrors from '../Icons/benefits/IconTroubleshootingCommonErrors';
import Container from '../components/Container/Container';
import ContactSupportForm from '../components/ContactSupportForm/ContactSupportForm';
import { AnimFadeUp } from '../animations/AnimFadeUp';
import { AnimFadeIn } from '../animations/AnimFadeIn';
import { useTheme } from '../contexts/ThemeContext';


const Support = () => {
    const { theme } = useTheme();

    return (
        <main className="support-page">
            <IntroSection
                title={`Need Help?<br/> We're Here <span>for You!</span>`}
                description="Find answers to your questions quickly, our team is 24/7 available to assist you. Our goal is to ensure your experience with MiniRipple is smooth and stress-free. ">
                <AnimFadeUp delay={0.5}>
                    <div className="flex justify-center">
                        <Button type="primary" shape="round" size="large" onClick={() => navigate("/support")} >
                            Get Help Now
                        </Button>
                    </div>
                </AnimFadeUp>
                <AnimFadeUp delay={0.5}>
                    <div className="flex justify-center">
                        <div className="search-area">
                            <input type="search" placeholder="Search ... " />
                            <button className='search-area--btn'>Search</button>
                        </div>
                    </div>
                </AnimFadeUp>
            </IntroSection>

            <QuicklyFindAnswers />

            <BenefitsSection
                tag={`Support`}
                title={`Explore Our Support Categories for Quick Solutions`}
                description={`Our help center gives you quick access to guides, troubleshooting, billing, and security resources.`}
                data={[
                    {
                        title: 'Getting Started with MiniRipple',
                        description: 'Access step-by-step guides in our knowledge base to set up MiniRipple.',
                        icon: <IconGettingStarted />,
                        lg: 6,
                        md: 24,
                        sm: { span: 24 }
                    },
                    {
                        title: 'Account & Billing Assistance',
                        description: 'Get help with your subscriptions, payments, and account management.',
                        icon: <IconAccountBillingAssistance />,
                        lg: 6,
                        md: 24,
                        sm: { span: 24 }
                    },
                    {
                        title: 'Troubleshooting Common Errors',
                        description: 'Troubleshoot common issues with our quick tips.',
                        icon: <IconTroubleshootingCommonErrors />,
                        lg: 6,
                        md: 24,
                        sm: { span: 24 }
                    },
                    {
                        title: 'Understanding Security & Privacy',
                        description: `Learn about MiniRipple’s security and privacy protection.`,
                        icon: <IconUnderstandingSecurityPrivacy />,
                        lg: 6,
                        md: 24,
                        sm: { span: 24 }
                    }
                ]}
            >
                <div className="flex justify-center buttons-area">
                    <Button type="primary" shape="round" size="large">
                        Explore
                    </Button>
                    <Button type="default" shape="round" size="large">
                        Learn More
                    </Button>
                </div>
            </BenefitsSection>

            <section className="simplified-security-section">
                <Container>
                    <Row align="middle">
                        <Col className='flex items-center' lg={{ span: 11, order: 1 }} md={{ span: 11, order: 1 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                            <AnimFadeUp>
                                <img className='res-img' src={theme === 'dark' ? './assets/img/NeedAssistance.png' : './assets/img/NeedAssistanceLight.png'} alt="Cutting-Edge Technology, Simplified Security" />
                            </AnimFadeUp>
                        </Col>
                        <Col lg={{ span: 11, offset: 2, order: 2 }} md={{ span: 12, offset: 1, order: 2 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                            <Flex justify='end'>
                                <div className='content-area mb-[30px]'>
                                    <article className='content'>
                                        <AnimFadeIn delay={0.5}>
                                            <h2 className='h2' style={{ fontSize: '2.6025rem' }}>Need Assistance with Your Website Integration?</h2>
                                            <p className='p'>If you’re having trouble integrating MiniRipple Website Protection Software with your site, we can help. Our team provides fast and smooth integration so you can protect your website right away.</p>
                                        </AnimFadeIn>
                                    </article>

                                    <article className='micro-content-wrap' style={{ display: 'none' }}>
                                        <div className='icon-svg'>
                                            <AnimFadeUp>
                                                <svg className='use-case-icon' width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_178_312)">
                                                        <path d="M13 6.82516C9.31362 6.82516 6.3252 9.81358 6.3252 13.5C6.3252 17.1864 9.31362 20.1748 13 20.1748C16.6864 20.1748 19.6749 17.1864 19.6749 13.5C19.6749 9.81358 16.6864 6.82516 13 6.82516ZM13.7618 16.2673C13.7618 16.688 13.4207 17.029 13 17.029C12.5794 17.029 12.2383 16.688 12.2383 16.2673V13.2484C12.2383 12.8278 12.5794 12.4867 13 12.4867C13.4207 12.4867 13.7618 12.8278 13.7618 13.2484V16.2673ZM13 11.4945C12.5794 11.4945 12.2383 11.1535 12.2383 10.7328C12.2383 10.3122 12.5794 9.97111 13 9.97111C13.4207 9.97111 13.7618 10.3122 13.7618 10.7328C13.7618 11.1535 13.4208 11.4945 13 11.4945Z" fill="white" />
                                                        <path d="M25.3461 16.8302L24.0965 15.8192C24.2545 15.0591 24.3345 14.2811 24.3345 13.5C24.3345 12.7188 24.2545 11.9409 24.0964 11.1808L25.3461 10.1698C25.6375 9.93404 25.714 9.52134 25.5267 9.19675L22.9901 4.80325C22.8028 4.47866 22.4069 4.33876 22.0572 4.47312L20.5542 5.05086C19.3892 4.00929 18.0168 3.21593 16.5396 2.72996L16.289 1.14289C16.2305 0.772695 15.9114 0.5 15.5366 0.5H10.4635C10.0887 0.5 9.76955 0.772695 9.7111 1.14294L9.46054 2.72996C7.98327 3.21593 6.61101 4.00929 5.44598 5.05086L3.94301 4.47312C3.59323 4.3385 3.19744 4.47861 3.01006 4.80325L0.473432 9.19675C0.286049 9.52139 0.362576 9.93409 0.65401 10.1698L1.90369 11.1808C1.74565 11.9409 1.66567 12.7188 1.66567 13.5C1.66567 14.2811 1.7456 15.0591 1.90369 15.8192L0.65401 16.8302C0.362627 17.066 0.286049 17.4787 0.473432 17.8033L3.01001 22.1967C3.19739 22.5213 3.59323 22.6613 3.94296 22.5269L5.44598 21.9491C6.61095 22.9907 7.98327 23.7841 9.46054 24.27L9.7111 25.8571C9.76955 26.2273 10.0887 26.5 10.4635 26.5H15.5366C15.9114 26.5 16.2305 26.2273 16.289 25.8571L16.5396 24.27C18.0168 23.7841 19.3891 22.9907 20.5542 21.9491L22.0572 22.5269C22.407 22.6614 22.8027 22.5213 22.9901 22.1967L25.5267 17.8033C25.714 17.4787 25.6375 17.066 25.3461 16.8302ZM20.5535 16.6916C20.1404 17.6681 19.5495 18.5447 18.7971 19.2971C18.0448 20.0495 17.1681 20.6405 16.1917 21.0534C15.18 21.4813 14.1062 21.6983 13.0001 21.6983C11.894 21.6983 10.8202 21.4813 9.8085 21.0534C8.83208 20.6404 7.95549 20.0495 7.20306 19.2971C6.45064 18.5447 5.8597 17.6681 5.44674 16.6916C5.01876 15.6799 4.80177 14.6061 4.80177 13.5C4.80177 12.3939 5.01876 11.3201 5.44664 10.3084C5.85965 9.33193 6.45059 8.45534 7.20296 7.70291C7.95534 6.95049 8.83197 6.35955 9.8084 5.94659C10.8201 5.51866 11.8939 5.30172 13 5.30172C14.1061 5.30172 15.1799 5.51866 16.1916 5.94659C17.168 6.3596 18.0446 6.95054 18.797 7.70291C19.5495 8.45529 20.1404 9.33193 20.5534 10.3084C20.9813 11.3201 21.1982 12.3939 21.1982 13.5C21.1982 14.6061 20.9814 15.6799 20.5535 16.6916Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_178_312">
                                                            <rect width="26" height="26" fill="white" transform="translate(0 0.5)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </AnimFadeUp>
                                        </div>
                                        <div className='micro-content'>
                                            <AnimFadeIn delay={0.5}>
                                                <h4 className='h4'>Setup Help</h4>
                                                <p className="p">Get one-time website integration assistance just for $20.</p>
                                            </AnimFadeIn>
                                        </div>
                                    </article>

                                    <article className='micro-content-wrap'>
                                        <div className='icon-svg'>
                                            <AnimFadeUp>
                                                <svg className='use-case-icon' width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.9387 13.8613C22.3467 13.8591 23.6963 13.2988 24.6919 12.3032C25.6875 11.3076 26.2478 9.95796 26.2499 8.55C25.9592 1.50347 15.9144 1.5057 15.6274 8.55006C15.6289 9.95823 16.1889 11.3083 17.1847 12.304C18.1804 13.2998 19.5305 13.8598 20.9387 13.8613ZM18.8431 9.06625C18.9274 8.98602 19.04 8.94238 19.1564 8.94483C19.2728 8.94729 19.3835 8.99566 19.4643 9.07938L20.5012 10.1688V5.8375C20.5029 5.72259 20.5497 5.61297 20.6316 5.53231C20.7135 5.45166 20.8238 5.40644 20.9387 5.40644C21.0536 5.40644 21.1639 5.45166 21.2458 5.53231C21.3276 5.61297 21.3745 5.72259 21.3762 5.8375V10.1688L22.4131 9.07938C22.4945 8.99882 22.6042 8.95324 22.7187 8.95234C22.8333 8.95144 22.9437 8.9953 23.0263 9.07457C23.109 9.15384 23.1575 9.26226 23.1615 9.37675C23.1654 9.49123 23.1245 9.60273 23.0474 9.6875L21.2712 11.5469C21.2307 11.5927 21.1812 11.6297 21.1258 11.6556C21.0704 11.6815 21.0102 11.6957 20.9491 11.6974C20.8879 11.699 20.8271 11.6881 20.7704 11.6652C20.7136 11.6423 20.6622 11.608 20.6193 11.5644L18.8299 9.6875C18.7497 9.60318 18.706 9.49055 18.7085 9.37417C18.711 9.2578 18.7593 9.14711 18.8431 9.06625Z" fill="white" />
                                                    <path d="M4.97437 18.3325H7.82249C7.88 18.3327 7.93698 18.3215 7.99015 18.2996C8.04332 18.2777 8.09163 18.2455 8.1323 18.2048C8.17296 18.1641 8.20518 18.1158 8.2271 18.0627C8.24901 18.0095 8.26019 17.9525 8.25999 17.895V15.0469C8.26019 14.9894 8.24901 14.9324 8.2271 14.8792C8.20518 14.826 8.17296 14.7777 8.1323 14.7371C8.09163 14.6964 8.04332 14.6642 7.99015 14.6423C7.93698 14.6204 7.88 14.6092 7.82249 14.6094H4.97437C4.85844 14.6097 4.74736 14.6559 4.66539 14.7379C4.58342 14.8199 4.53721 14.931 4.53687 15.0469V17.895C4.53721 18.0109 4.58342 18.122 4.66539 18.204C4.74736 18.286 4.85844 18.3322 4.97437 18.3325Z" fill="white" />
                                                    <path d="M20.9388 14.7362C19.9161 14.7361 18.9095 14.4827 18.0086 13.9987C17.1078 13.5147 16.3409 12.8151 15.7763 11.9625C15.5613 12.2007 15.2987 12.3911 15.0056 12.5214C14.7124 12.6518 14.3952 12.7192 14.0744 12.7194H1.75V23.6656C1.75081 24.2212 1.97186 24.7537 2.36469 25.1466C2.75752 25.5394 3.29008 25.7604 3.84562 25.7612H22.9294C23.4856 25.7613 24.0191 25.5407 24.4129 25.1478C24.8066 24.7549 25.0283 24.2218 25.0294 23.6656V13.1919C23.9008 14.19 22.4454 14.7395 20.9388 14.7362ZM10.2463 14.7231H16.275C16.3899 14.7249 16.4994 14.7718 16.58 14.8536C16.6606 14.9355 16.7058 15.0457 16.7058 15.1606C16.7058 15.2755 16.6606 15.3858 16.58 15.4676C16.4994 15.5495 16.3899 15.5963 16.275 15.5981H10.2463C10.1314 15.5963 10.0218 15.5495 9.94125 15.4676C9.86065 15.3858 9.81548 15.2755 9.81548 15.1606C9.81548 15.0457 9.86065 14.9355 9.94125 14.8536C10.0218 14.7718 10.1314 14.7249 10.2463 14.7231ZM10.2463 17.3481H22.0456C22.1605 17.3498 22.2702 17.3967 22.3508 17.4785C22.4315 17.5604 22.4767 17.6707 22.4767 17.7856C22.4767 17.9005 22.4315 18.0108 22.3508 18.0927C22.2702 18.1746 22.1605 18.2214 22.0456 18.2231H10.2463C10.1313 18.2214 10.0217 18.1746 9.94106 18.0927C9.8604 18.0108 9.81519 17.9005 9.81519 17.7856C9.81519 17.6707 9.8604 17.5604 9.94106 17.4785C10.0217 17.3967 10.1313 17.3498 10.2463 17.3481ZM4.96563 22.8169V21.4606C4.9659 21.1126 5.10427 20.7789 5.35036 20.5328C5.59644 20.2868 5.93011 20.1484 6.27813 20.1481H20.5013C20.8493 20.1484 21.1829 20.2868 21.429 20.5328C21.6751 20.7789 21.8135 21.1126 21.8138 21.4606V22.8169C21.8127 23.1646 21.6741 23.4979 21.4282 23.7438C21.1823 23.9897 20.849 24.1283 20.5013 24.1294H6.27813C5.93034 24.1283 5.5971 23.9897 5.35118 23.7438C5.10526 23.4979 4.96665 23.1646 4.96563 22.8169ZM3.66188 15.0469C3.66289 14.6991 3.8015 14.3658 4.04742 14.1199C4.29334 13.874 4.62659 13.7354 4.97438 13.7344H7.8225C8.17051 13.7346 8.50419 13.873 8.75027 14.1191C8.99636 14.3652 9.13473 14.6989 9.135 15.0469V17.895C9.13523 18.0674 9.10144 18.2382 9.03556 18.3975C8.96968 18.5569 8.87301 18.7017 8.75109 18.8236C8.62917 18.9455 8.48439 19.0422 8.32504 19.1081C8.1657 19.1739 7.99492 19.2077 7.8225 19.2075H4.97438C4.62636 19.2072 4.29268 19.0688 4.0466 18.8228C3.80052 18.5767 3.66215 18.243 3.66188 17.895V15.0469Z" fill="white" />
                                                    <path d="M20.5012 21.0231H6.27808C6.03645 21.0231 5.84058 21.219 5.84058 21.4606V22.8169C5.84058 23.0585 6.03645 23.2544 6.27808 23.2544H20.5012C20.7428 23.2544 20.9387 23.0585 20.9387 22.8169V21.4606C20.9387 21.219 20.7428 21.0231 20.5012 21.0231Z" fill="white" />
                                                    <path d="M14.0744 11.8444C14.3256 11.8438 14.5723 11.7777 14.7902 11.6527C15.0081 11.5276 15.1896 11.3479 15.3169 11.1313C14.7815 9.96313 14.6225 8.65747 14.8619 7.395H3.84562C3.2894 7.39606 2.75632 7.61779 2.36341 8.01151C1.97051 8.40523 1.74989 8.93877 1.75 9.495V11.8444H14.0744ZM12.0575 10.0594H4.8475C4.73259 10.0577 4.62297 10.0108 4.54231 9.92897C4.46165 9.84711 4.41644 9.7368 4.41644 9.62188C4.41644 9.50696 4.46165 9.39665 4.54231 9.31479C4.62297 9.23293 4.73259 9.18608 4.8475 9.18438H12.0575C12.1724 9.18608 12.282 9.23293 12.3627 9.31479C12.4433 9.39665 12.4886 9.50696 12.4886 9.62188C12.4886 9.7368 12.4433 9.84711 12.3627 9.92897C12.282 10.0108 12.1724 10.0577 12.0575 10.0594Z" fill="white" />
                                                </svg>
                                            </AnimFadeUp>
                                        </div>
                                        <div className='micro-content'>
                                            <AnimFadeIn delay={0.5}>
                                                <h4 className='h4'>Get Started</h4>
                                                <p className="p">Click below to request your setup support today.</p>
                                            </AnimFadeIn>
                                        </div>
                                    </article>
                                </div>
                            </Flex>
                        </Col>
                    </Row>
                </Container>
            </section>

            <ContactSupportForm />

            <div className='explore-our-community'>
                <BenefitsSection
                    tag={`Resources`}
                    title={`Explore Our Community and Learning Resources`}
                    description={`Connect with the MiniRipple community to share experiences, learn, and get support. Access tutorials, articles, and guides to make the most of your MiniRipple website protection software.`}
                    data={[
                        {
                            title: 'Join the MiniRipple Forum Today',
                            description: 'Connect with other users, ask, and share.',
                            icon: <IconGettingStarted />,
                            lg: 8,
                            md: 24,
                            sm: { span: 24 }
                        },
                        {
                            title: 'Read Our Articles & Tutorials',
                            description: 'Find tips, insights, and guides to maximize your MiniRipple experience.',
                            icon: <IconAccountBillingAssistance />,
                            lg: 8,
                            md: 24,
                            sm: { span: 24 }
                        },
                        {
                            title: 'Watch Our Video Tutorials  for  Help',
                            description: 'Learn fast with simple video instructions.',
                            icon: <IconTroubleshootingCommonErrors />,
                            lg: 8,
                            md: 24,
                            sm: { span: 24 }
                        }
                    ]}
                >
                    <div className="flex justify-center buttons-area">
                        <Button type="primary" shape="round" size="large">
                            Join
                        </Button>
                        <Button type="primary" shape="round" size="large">
                            Watch
                        </Button>
                    </div>
                </BenefitsSection>
            </div>


        </main>
    );
};

export default Support;
