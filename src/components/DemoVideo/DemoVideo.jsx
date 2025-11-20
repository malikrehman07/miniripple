import './DemoVideo.css';
import PlayIcon from '@/assets/img/playButton.png';
import { useState } from 'react';
import { Modal } from 'antd';

export default function DemoVideo({img, url}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <section className="demo-video">
            <img className='play-icon' src={PlayIcon} alt="Play Icon" onClick={() => setIsModalOpen(true)}/> 
            <div className="demo-video-wrap" style={{background: `url(${img}) center center no-repeat`, backgroundSize: 'cover'}}>
                <img src={img} alt="Demo Video" />
            </div>
            {/* make a modal for youtube video */}
            <Modal
                // title="Youtube Video"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <iframe
                    width="100%"
                    height="500px"
                    src={url} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen></iframe>
            </Modal>
        </section>
    );
}