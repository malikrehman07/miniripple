import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './MobileMenu.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const MobileMenu = () => {
    const [visible, setVisible] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});
    const navigate = useNavigate();

    const menuItems = [
        { path: '/', label: 'Home' },
        { 
            id: 'features',
            label: 'Features',
            submenu: [
                { path: '/features/ad-fraud', label: 'Ad Fraud Detection & IP Blocking' },
                { path: '/features/bot-protection', label: 'Bot Protection' },
                { path: '/features/suspicious-activity', label: 'Suspicious Activity Detection' },
                { path: '/features/device-control', label: 'Device & Browser Control' },
                { path: '/features/monitoring', label: 'Real-Time Monitoring' },
                { path: '/features/analytics', label: 'Analytics Dashboard' },
            ]
        },
        { path: '/pricing', label: 'Pricing' },
        { path: '/support', label: 'Support' },
    ];

    const toggleSubmenu = (id, e) => {
        e.preventDefault();
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const showDrawer = () => {
        setVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const onClose = () => {
        setVisible(false);
        document.body.style.overflow = '';
    };

    // Cleanup function to reset body overflow when component unmounts
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
        onClose();
    };

    return (
        <div className="mobile-menu-container">
            <Button 
                type="text" 
                icon={<MenuOutlined style={{ fontSize: '24px' }} />} 
                onClick={showDrawer}
                className="mobile-menu-button"
            />
            
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                width="100%"
                className="mobile-drawer"
                closable={false}
                bodyStyle={{ padding: 0 }}
            >
                <div className="mobile-menu-header">
                    <Button 
                        type="text" 
                        icon={<CloseOutlined style={{ fontSize: '20px' }} />} 
                        onClick={onClose}
                        className="close-button"
                    />
                </div>
                
                <div className="mobile-menu-content">
                    <div className="text-theme-changer">
                        <span className='text-theme-changer--text'>Theme</span>
                        <ThemeToggle/>
                    </div>
                    <nav>
                        <ul className="mobile-menu-list">
                            {menuItems.map((item, index) => (
                                <li key={index} className="mobile-menu-item">
                                    {item.submenu ? (
                                        <>
                                            <a 
                                                href="#" 
                                                className="mobile-menu-link"
                                                onClick={(e) => toggleSubmenu(item.id, e)}
                                            >
                                                {item.label}
                                                <span style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: expandedItems[item.id] ? 'rotate(180deg)' : 'rotate(0)'
                                                }}>
                                                    ▼
                                                </span>
                                            </a>
                                            <ul className={`mobile-submenu ${expandedItems[item.id] ? 'expanded' : ''}`}>
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <a 
                                                            href={subItem.path}
                                                            onClick={(e) => handleNavClick(e, subItem.path)}
                                                            className="mobile-submenu-link"
                                                        >
                                                            {subItem.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <a 
                                            href={item.path}
                                            onClick={(e) => handleNavClick(e, item.path)}
                                            className="mobile-menu-link"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    
                    <div className="mobile-menu-actions">
                        <Button 
                            type="primary" 
                            size="large" 
                            block
                            className="mobile-signin-button"
                            onClick={() => {
                                navigate('/sign-in');
                                onClose();
                            }}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default MobileMenu;
