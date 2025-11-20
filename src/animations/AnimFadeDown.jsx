import { motion, easeOut } from 'framer-motion';

const fadeDownVariants = (delay = 0) => ({
    hidden: { 
        opacity: 0,
        y: -50 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easeOut,
            delay: delay
        },
    },
});

export const AnimFadeDown = ({ 
    children, 
    className = "", 
    delay = 0, 
    ...props 
}) => {
    return (
        <motion.div
            variants={fadeDownVariants(delay)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
