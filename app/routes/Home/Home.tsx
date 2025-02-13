import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router";

const Home: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsClicked(true);
    };

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => {
                navigate('/secondpage'); // Replace with your target route
            }, 1500); // Match the duration of the scale animation

            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [isClicked, navigate]);

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center home-container">
            <div className="heart d-flex vh-100 justify-content-center align-items-center">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-7.2 -3.7 14.4 14.9"
                    animate={{ scale: isClicked ? 10 : 1 }}
                    transition={{
                        scale: { duration: 1.5, ease: 'easeInOut' },
                    }}
                    style={{
                        width: '50vw',
                        height: '50vh',
                        cursor: 'pointer',
                    }}
                    onClick={handleClick}
                >
                    <motion.path
                        d="M0 0A1 1 0 00-7 0C-7 5-1 7 0 11 1 7 7 5 7 0A1 1 0 000 0"
                        stroke="#000000"
                        strokeWidth="0.2"
                        fill="pink"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                    />
                </motion.svg>
            </div>
        </div>
    );
};

export default Home;
