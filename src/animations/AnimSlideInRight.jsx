import { motion, easeOut } from 'framer-motion';

const slideInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: easeOut
        },
    },
};

export const AnimSlideInRight = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            variants={slideInRightVariants}
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
