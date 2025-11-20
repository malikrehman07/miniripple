import { motion, easeOut } from 'framer-motion';

const rotateInVariants = {
    hidden: { opacity: 0, rotate: -15 },
    visible: {
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.7,
            ease: easeOut
        },
    },
};

export const AnimRotateIn = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            variants={rotateInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
