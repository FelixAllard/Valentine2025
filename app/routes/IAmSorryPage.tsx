// routes/SecondPageThankYouForComing/ThankYouForComing.tsx
import React, {useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { motion } from 'framer-motion';
import MotionWrapper from "~/Utilities/MotionWrapper";
import {useNavigate} from "react-router";

const ThankYouForComing: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/third-page');
    };
    useEffect(() => {
        // Dynamically load Tenor script on the client-side only
        const script = document.createElement('script');
        script.src = 'https://tenor.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        // Cleanup the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center background-pink" style={{height: '100vh'}}>
            <div className="heart d-flex vh-100 justify-content-center align-items-center flex-column">
                <MotionWrapper duration={1} delay={0.2}>
                    <h1>I am sorry you feel that way...</h1>
                </MotionWrapper>
                <div className="tenor-gif-embed"
                     data-postid="4984662473790269249"
                     data-share-method="host"
                     data-aspect-ratio="1"
                     data-width="100%"
                     style={{width: "100%", position: "relative"}}>
                </div>


            </div>

        </div>
    );
};

export default ThankYouForComing;