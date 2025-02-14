import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router";

const FifthPage: React.FC = () => {
    const navigate = useNavigate();
    const [clickedNoCount, setClickedNoCount] = useState(0);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleYesClick = () => {
        navigate('/sixth-page'); // Change this to your actual page
    };

    const handleNoClick = () => {
        setClickedNoCount(prevCount => prevCount + 1);
        if(clickedNoCount>5){
            navigate('/sixth-page');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center background-pink" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            textAlign: 'center',
            padding: '20px'
        }}>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                Let me ask you, did you have fun today?
            </motion.h1>

            <div className="tenor-gif-embed"
                 data-postid={clickedNoCount > 0 ? "4984662473790269249" : "10679482925078176265"}
                 data-share-method="host"
                 data-aspect-ratio="1"
                 data-width="50%"
                 style={{ width: "100%", position: "relative" }}>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                {clickedNoCount > 0 ? "Are you sureeee?" : "Come on, be honest!"}
            </motion.p>

            <div className="d-flex gap-3 mt-3">
                <motion.button
                    className="btn btn-success"
                    style={{
                        fontSize: `${2 + clickedNoCount * 2}rem`, // Yes button grows when "No" is clicked
                        padding: `${15 + clickedNoCount * 10}px ${30 + clickedNoCount * 15}px`
                    }}
                    onClick={handleYesClick}
                    whileHover={{ scale: 1.1 }}
                >
                    Yes!
                </motion.button>

                <motion.button
                    className="btn btn-danger"
                    style={{
                        fontSize: '1.5rem',
                        padding: '10px 20px',
                        height: "100px",
                        width: "100px"
                    }}
                    onClick={handleNoClick}
                    whileHover={{ scale: 1.1 }}
                >
                    No...
                </motion.button>
            </div>
        </div>
    );
};

export default FifthPage;
