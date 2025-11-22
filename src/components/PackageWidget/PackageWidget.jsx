import { Button } from "antd";
import './PackageWidget.css';
import { AnimFadeIn } from '@/animations/AnimFadeIn';
import { useNavigate } from 'react-router-dom';

export default function PackageWidget({icon,title, description, price, crossPrice, features}) {
    const navigate = useNavigate();
    return (<div className="package-widget-wrap">
        <section className="package-widget">
            
                <AnimFadeIn delay={0.5}>
                <header className="package-widget--header">
                    <div className="package-widget--header-icon">{icon}</div>
                    <div className="package-widget--header-content">
                        <h4 className="h4">{title}</h4>
                        <p className="p">{description}</p>
                    </div>
                    <div className="package-widget--header-price">
                    <span className="price-cross">{crossPrice}</span>
                        <span className="price-value">{price}</span>
                    </div>
                </header>
                </AnimFadeIn>
                <AnimFadeIn delay={0.6}>
                <div className="package-widget--action">
                    <Button block type="primary" shape="round" size="large" onClick={() => navigate('/sign-up')}>
                        Subscribe
                    </Button>
                </div>
                </AnimFadeIn>
                <div className="package-widget--features">
                    <AnimFadeIn delay={0.7}>
                    <header className="package-widget--features-header">
                        <span className="package-widget--features-title">Access Premium Features</span>
                    </header>
                    </AnimFadeIn>
                    <ul className="package-widget--features-list">
                    {
                        features && (features.map((f,index)=>{
                            return (
                                <AnimFadeIn delay={0.1 * index}>
                                <li className={`package-widget--features-item`}>
                                    <span className={`package-widget--features-item-icon`}>
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9492 18C15.3675 18 18.9492 14.4183 18.9492 10C18.9492 5.58172 15.3675 2 10.9492 2C6.53094 2 2.94922 5.58172 2.94922 10C2.94922 14.4183 6.53094 18 10.9492 18ZM14.6563 8.70711C15.0469 8.31658 15.0469 7.68342 14.6563 7.29289C14.2658 6.90237 13.6326 6.90237 13.2421 7.29289L9.94922 10.5858L8.65633 9.29289C8.2658 8.90237 7.63264 8.90237 7.24211 9.29289C6.85159 9.68342 6.85159 10.3166 7.24211 10.7071L9.24211 12.7071C9.63264 13.0976 10.2658 13.0976 10.6563 12.7071L14.6563 8.70711Z" fill="white"/>
                                        </svg>
                                    </span>
                                    <span className="package-widget--features-item-text">{f.title}</span>
                                </li>
                            </AnimFadeIn>
                            )
                        }))
                    }
                    </ul>
                </div>
            
        </section>
        </div>
    )
}