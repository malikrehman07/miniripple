import Container from '../Container/Container';
import { Tag } from 'antd';
import './DemoVideoSection.css';
import DemoVideo from '../DemoVideo/DemoVideo';
import VidImg from '@/assets/img/vid-img.png';
import { AnimFadeUp } from '@/animations/AnimFadeUp';

export default function DemoVideoSection(){
  return(
    <section id="demo" className="demo-video-section">
      <Container>
        <AnimFadeUp>
          <article className='content'>
            <Tag className="tag-primary">Demo Video</Tag>
            <h2 className='h2'>See MiniRipple in Action</h2>
            <p className='p'>Watch the demo video to experience protection in real time.</p>
          </article>
          <DemoVideo img={VidImg} url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}/>
        </AnimFadeUp>
      </Container>
    </section>
  );
}
