import { motion, easeOut } from 'framer-motion';
import React from 'react';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easeOut
        },
    },
};

export const AnimFadeUp = ({ children, delay = 0 }) => {
    // Check if window is defined (for SSR)
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    
    return (
        <motion.div
            variants={{
                ...fadeUpVariants,
                visible: {
                    ...fadeUpVariants.visible,
                    transition: {
                        ...fadeUpVariants.visible.transition,
                        delay: delay
                    }
                }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
                once: true, 
                amount: isMobile ? 0.1 : 0.2, // Lower threshold on mobile
                margin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px' // Adjust root margin for mobile
            }}
            className="max-w-md"
        >
            <div>{children}</div>
        </motion.div>
    );
};

