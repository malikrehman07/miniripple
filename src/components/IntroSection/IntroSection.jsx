import './IntroSection.css';
import Container from "../Container/Container";
import { AnimFadeUp } from '../../animations/AnimFadeUp';
import { Tag } from 'antd';
// import Tag from '@/components/Tag/Tag';
// import { AnimFadeUp } from '../../animations/framerMotions';


export default function IntroSection({ tag,title, description, children }) {
    return (
        <section className="intro-section">
            <Container>
                <div className={`content ${tag ? 'has-tag' : ''}`}>
                    <div className="intro-content">
                    <AnimFadeUp>
                        {
                            tag && (<Tag className="tag-primary">{tag}</Tag>)
                        }                    
                    <h1 className="h1" dangerouslySetInnerHTML={{ __html: title }} />
                    <p className='p'>{description}</p>                    
                    </AnimFadeUp>
                    </div>
                    {children}
                </div>
            </Container>
        </section>
    );
}