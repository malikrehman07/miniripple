import React, { useState } from "react";
import { Button, Form, Input, Tag, Alert } from "antd";
import Container from "../Container/Container";
import { Row, Col } from "antd";
import './ContactSupportForm.css';
import contactSupport from '@/assets/img/contact-support.png';
import { AnimFadeUp } from "../../animations/AnimFadeUp";
import { AnimFadeIn } from "../../animations/AnimFadeIn";
import axios from 'axios';  

const ContactSupportForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);  
    const [successMessage, setSuccessMessage] = useState("");  
    const [errorMessage, setErrorMessage] = useState("");  

    const API = import.meta.env.VITE_API_URL;  

    const onFinish = async (values) => {
        setErrorMessage("");  
        setSuccessMessage("");  

        
        const payload = {
            subject: values.subject,
            description: values.message,  
            category: values.issueType,  
            userEmail: values.email.toLowerCase(),  
            userName: values.firstName,  
            priority: values.priority || 'Medium',  
        };

        try {
            setLoading(true);  
            const response = await axios.post(`${API}/api/v2/tickets`, payload);  

            if (response.data.success) {
                setSuccessMessage("Your support ticket has been created successfully!"); 
                form.resetFields();  
            } else {
                setErrorMessage(response.data.message || "Failed to create the support ticket.");  
            }
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "There was an error creating the support ticket. Please try again.");  
        } finally {
            setLoading(false);  
        }
    };

    return (
        <section className="contact-support-form">
            <Container>
                <div className="content">
                    <Row gutter={[45, 10]}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <AnimFadeUp>
                                <Tag className="tag-primary">Help</Tag>
                                <h3 className="h3">Contact Our Support Team</h3>
                                <p className="p">Our team is 24/7 available to help you with your questions.</p>
                            </AnimFadeUp>
                            <AnimFadeIn delay={0.5}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="form-area"
                                >
                                    {/* Subject */}
                                    <Form.Item
                                        name="subject"
                                        rules={[{ required: true, message: "Please enter a subject" }, { max: 50, message: "Subject must be less than 50 characters" }]}
                                    >
                                        <Input placeholder="Subject" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* First Name */}
                                    <Form.Item
                                        name="firstName"
                                        rules={[{ required: true, message: "Please enter your first name" }]}
                                    >
                                        <Input placeholder="First Name" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* Email */}
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: "Please enter your email" },
                                            { type: "email", message: "Please enter a valid email" },
                                        ]}
                                    >
                                        <Input placeholder="Email" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* Issue Type */}
                                    <Form.Item
                                        name="issueType"
                                        rules={[{ required: true, message: "Please specify the Category" }]}
                                    >
                                        <Input placeholder="Category" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* Message */}
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: "Please enter your message" }]}
                                    >
                                        <Input.TextArea rows={4} placeholder="Message" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* Priority */}
                                    <Form.Item
                                        name="priority"
                                        initialValue="Medium"
                                    >
                                        <Input placeholder="Priority (Default: Medium)" style={{ width: '100%', padding: '8px 12px' }} />
                                    </Form.Item>

                                    {/* Error and Success Messages */}
                                    {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
                                    {successMessage && <Alert message={successMessage} type="success" showIcon />}

                                    <p className="p">By clicking Submit Request, you agree to our Terms and Conditions.</p>

                                    {/* Submit Button */}
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block loading={loading} style={{ height: 48, fontSize: '16px' }}>
                                            {loading ? "Submitting..." : "Submit Request"}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </AnimFadeIn>
                        </Col>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <AnimFadeUp>
                                <img className="res-img" src={contactSupport} alt="contact-support" />
                            </AnimFadeUp>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default ContactSupportForm;
