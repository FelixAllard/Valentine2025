// routes/SecondPageThankYouForComing/ThankYouForComing.tsx
import React, {useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { motion } from 'framer-motion';
import MotionWrapper from "~/Utilities/MotionWrapper";
import {useNavigate} from "react-router";

const GoodBye: React.FC = () => {
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
                    <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold" }}>
                        <span style={{ color: "#FF0000" }}>H</span>
                        <span style={{ color: "#FF4500" }}>a</span>
                        <span style={{ color: "#FFA500" }}>p</span>
                        <span style={{ color: "#FFD700" }}>p</span>
                        <span style={{ color: "#008000" }}>y</span>
                        &nbsp;
                        <span style={{ color: "#00FA9A" }}>V</span>
                        <span style={{ color: "#00CED1" }}>a</span>
                        <span style={{ color: "#1E90FF" }}>l</span>
                        <span style={{ color: "#4B0082" }}>e</span>
                        <span style={{ color: "#9400D3" }}>n</span>
                        <span style={{ color: "#FF1493" }}>t</span>
                        <span style={{ color: "#FF69B4" }}>i</span>
                        <span style={{ color: "#C71585" }}>n</span>
                        <span style={{ color: "#DC143C" }}>e</span>
                        <span style={{ color: "#FF0000" }}>s</span>
                        &nbsp;
                        <span style={{ color: "#8B0000" }}>D</span>
                        <span style={{ color: "#FF4500" }}>a</span>
                        <span style={{ color: "#FFD700" }}>y</span>
                        <span style={{ color: "#FF1493" }}>!</span>
                    </h1>

                </MotionWrapper>

                <div className="tenor-gif-embed"
                     data-postid="11175741054448487684"
                     data-share-method="host"
                     data-aspect-ratio="1"
                     data-width="50%"
                     style={{width: "100%", position: "relative"}}>
                </div>
            </div>
        </div>
    );
};

export default GoodBye;