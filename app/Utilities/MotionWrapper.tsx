import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({ children, duration = 0.5, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
