import { motion, easeOut } from 'framer-motion';

const fadeInVariants = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: easeOut,
            delay: delay
        },
    },
});

export const AnimFadeIn = ({ children, className = "", delay = 0, ...props }) => {
    return (
        <motion.div
            variants={fadeInVariants(delay)}
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
