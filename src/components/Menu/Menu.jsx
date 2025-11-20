import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './Menu.css';
import IconNoAds from '../../Icons/IconNoAds';
import IconBot from '../../Icons/IconBot';
import IconSuspiciousDetection from '../../Icons/IconSuspiciousDetection';
import IconBrowser from '../../Icons/IconBrowser';
import IconRealTimeMonitoring from '../../Icons/IconRealTimeMonitoring';
import IconAnalyticsDashboard from '../../Icons/IconAnalyticsDashboard';

export default function Menu({ onItemClick }) {
    const location = useLocation();
    const [activePath, setActivePath] = useState('/');

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const featuresRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (featuresRef.current && !featuresRef.current.contains(event.target)) {
                setIsFeaturesOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { path: '/', label: 'Home' },
        {
            label: 'Features',
            submenu: [
                { path: '/features/ad-fraud', label: 'Ad Fraud Detection & IP Blocking', icon: <IconNoAds /> },
                { path: '/features/bot-protection', label: 'Bot Protection', icon: <IconBot /> },
                { path: '/features/suspicious-activity', label: 'Suspicious Activity Detection', icon: <IconSuspiciousDetection /> },
                { path: '/features/device-control', label: 'Device & Browser Control', icon: <IconBrowser /> },
                { path: '/features/monitoring', label: 'Live Traffic Monitoring', icon: <IconRealTimeMonitoring /> },
                { path: '/features/analytics', label: 'Analytics Dashboard', icon: <IconAnalyticsDashboard /> },
            ]
        },
        { path: '/pricing', label: 'Pricing' },
        { path: '/support', label: 'Support' },
    ];

    return (
        <div className="main-menu">
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`${activePath === item.path || (item.submenu && item.submenu.some(subItem => subItem.path === activePath)) ? 'active' : ''} ${item.submenu ? 'has-submenu' : ''}`}
                            ref={item.label === 'Features' ? featuresRef : null}
                        >
                            {item.submenu ? (
                                <>
                                    <div
                                        className="menu-item-wrapper"
                                        onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                                    >
                                        <span>{item.label}</span>
                                        {/* <DownOutlined className={`dropdown-icon ${isFeaturesOpen ? 'open' : ''}`} /> */}
                                        <svg className={`dropdown-icon ${isFeaturesOpen ? 'open' : ''}`} width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_751_227)">
                                        <path d="M7.82361 1.48917C8.23732 0.858083 7.8984 0.346436 7.06721 0.346436L0.933377 0.346435C0.101355 0.346435 -0.237127 0.858082 0.176198 1.48917L3.25085 6.18029C3.66472 6.81159 4.33524 6.81159 4.749 6.18029L7.82361 1.48917Z" fill="#D3D3D3"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_751_227">
                                        <rect width="7" height="8" fill="white" transform="translate(8) rotate(90)"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                    </div>

                                    {isFeaturesOpen && (<>
                                        <div className='submenu-arrow-top'></div>
                                        <ul className="submenu">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`submenu-item ${activePath === subItem.path ? 'active' : ''}`}
                                                        onClick={()=>{
                                                            // onItemClick(subItem.path);
                                                            setIsFeaturesOpen(!isFeaturesOpen);
                                                        }}
                                                    >
                                                        <span className="submenu-icon">{subItem.icon}</span>
                                                        <span className="submenu-text">{subItem.label}</span>
                                                        <div className="submenu-arrow"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 7C0.447715 7 2.89694e-08 7.44772 0 8C-2.89694e-08 8.55228 0.447715 9 1 9L1 8L1 7ZM16.5731 8.70711C16.9636 8.31658 16.9636 7.68342 16.5731 7.29289L10.2091 0.928933C9.81858 0.538408 9.18542 0.538408 8.79489 0.928933C8.40437 1.31946 8.40437 1.95262 8.79489 2.34315L14.4517 8L8.79489 13.6569C8.40437 14.0474 8.40437 14.6805 8.79489 15.0711C9.18541 15.4616 9.81858 15.4616 10.2091 15.0711L16.5731 8.70711ZM1 8L1 9L15.866 9L15.866 8L15.866 7L1 7L1 8Z" fill="url(#paint0_linear_240_228)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_240_228" x1="5.44765" y1="8.36831" x2="5.49442" y2="9.35417" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#4890EF" />
                                                                    <stop offset="1" stop-color="#4890EF" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={activePath === item.path ? 'active' : ''}
                                    // onClick={()=>onItemClick(item.path)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}