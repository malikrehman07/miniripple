import { motion, easeOut } from 'framer-motion';

const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: easeOut
        },
    },
};

export const AnimScaleIn = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
