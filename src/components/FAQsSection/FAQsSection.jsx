
import Container from "../Container/Container";
import { Tag, Collapse, Row, Col } from "antd";
import './FAQsSection.css';
import { AnimFadeUp } from "@/animations/AnimFadeUp";
const { Panel } = Collapse;

const faqData = [
  {
    question: "What is MiniRipple?",
    answer: "MiniRipple is an advanced security and traffic intelligence platform designed to protect websites from bots, fake users, click fraud, and malicious activity while providing real-time analytics."
  },
  {
    question: "Is MiniRippIe easy to integrate?",
    answer: "Yes. MiniRipple is extremely easy to integrate—simply paste a small script into your website or use the API. No complex setup or technical expertise is required."
  },
  {
    question: "Is MiniRippIe easy to integrate?",
    answer: "MiniRipple supports multiple payment methods including credit/debit cards, PayPal, and bank transfers. (If you want, I can fix duplicate questions.)"
  },
  {
    question: "Can MiniRipple protect my ad campaigns from click fraud?",
    answer: "Yes. MiniRipple analyzes user behavior, blocks bots instantly, filters fake clicks, and protects your advertising budget from invalid and fraudulent traffic."
  },
  {
    question: "Will MiniRipple slow down my website?",
    answer: "No. MiniRipple uses an ultra-lightweight async script that loads in the background, ensuring your website speed remains fast and unaffected."
  },
  {
    question: "Does MiniRipple provide real-time analytics?",
    answer: "Yes. MiniRipple provides real-time dashboards showing traffic behavior, devices, locations, IPs, threats, and blocked activities instantly."
  },

  ///////////////////////////////////////

  {
    question: "What industries benefit from MiniRippIe?",
    answer: "E-commerce brands, SaaS companies, advertisers, agencies, publishers, and websites running paid ads benefit the most from MiniRipple’s fraud detection and security tools."
  },
  {
    question: "Can I customize MiniRippIe's security settings?",
    answer: "Yes. MiniRipple allows custom rules such as IP blocking, device filtering, behavior-based blocking, geo-restrictions, and bot-detection preferences."
  },
  {
    question: "Do I need technical expertise to use MiniRippIe?",
    answer: "No. MiniRipple is built for everyone. The dashboard is simple, beginner-friendly, and requires no coding knowledge to use effectively."
  },
  {
    question: "Is MiniRippIe easy to integrate?",
    answer: "MiniRipple can be installed with just one script tag or API route and works with any website builder, CMS, or custom framework."
  },
  {
    question: "Will MiniRipple slow down my website?",
    answer: "Not at all. The script is optimized to be lightweight, asynchronous, and performance-friendly to ensure no impact on load times."
  },
  {
    question: "Do I need technical expertise to use MiniRippIe?",
    answer: "No technical expertise is required. Users get a fully visual dashboard, automated reports, and one-click configurations."
  }
];



export default function FAQsSection() {
    return (
        <section className="faqs-section" >
            <Container>
                <AnimFadeUp delay={0.1}>
                <article className='content' >
                    <Tag className="tag-primary" >FAQs</Tag>
                    <h2 className='h2'>Answers to Common Questions about Our Services</h2>
                    {/* <p className='p'>Find answers to common questions about our services.</p> */}
                </article>
                </AnimFadeUp>


                <div className="faqs-container">
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            
                            <AnimFadeUp>
                                <Collapse 
                                    accordion
                                    className="faq-collapse"
                                    expandIconPosition="end"
                                >
                                    {faqData.slice(0, Math.ceil(faqData.length / 2)).map((faq, index) => (
                                        <Panel header={faq.question} key={`left-${index}`}>
                                            <p>{faq.answer}</p>
                                        </Panel>
                                    ))}
                                </Collapse>
                            </AnimFadeUp>
                        </Col>
                        <Col xs={24} md={12}>
                            
                            <AnimFadeUp>
                                <Collapse 
                                    accordion
                                    className="faq-collapse"
                                    expandIconPosition="end"
                                >
                                    {faqData.slice(Math.ceil(faqData.length / 2)).map((faq, index) => (
                                        <Panel header={faq.question} key={`right-${index}`}>
                                            <p>{faq.answer}</p>
                                        </Panel>
                                    ))}
                                </Collapse>
                            </AnimFadeUp>
                        </Col>
                    </Row>
                </div>

            </Container>
        </section>
    )
}