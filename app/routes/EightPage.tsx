
// routes/SecondPageThankYouForComing/ThankYouForComing.tsx
import React, {useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { motion } from 'framer-motion';
import MotionWrapper from "~/Utilities/MotionWrapper";
import {useNavigate} from "react-router";

const ThankYouForComing: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/ninth-page');
    };
    const handleClickNo = () => {
        navigate('/iamsorry-page');
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
        <div
            className="d-flex justify-content-center align-items-center background-pink"
            style={{
                minHeight: "100vh", // Ensures the container takes at least full height
                display: "flex",
                flexDirection: "column",
                overflowY: "auto", // Allows scrolling when content overflows
                width: "100%", // Prevents horizontal overflow
            }}
        >
            <div
                className="heart d-flex justify-content-center align-items-center flex-column"
                style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "20px", // Adds spacing to prevent cutting off at the top
                }}
            >
                <MotionWrapper duration={2} delay={1}>
                    <h1>I guess I just have rizz</h1>
                </MotionWrapper>

                <div className="tenor-gif-embed"
                     data-postid="13615098530330361084"
                     data-share-method="host"
                     data-aspect-ratio="1"
                     data-width="100%"
                     style={{ width: "100%", position: "relative" }}>
                </div>

                <MotionWrapper duration={2} delay={2}>
                    <h3>(I'm secretly hoping the gifs are doing their charm)</h3>
                </MotionWrapper>

                <MotionWrapper duration={5} delay={3}>
                    <button className="btn btn-success m-2 container-md" onClick={handleClick}>
                        They are!
                    </button>
                    <button className="btn btn-danger m-2 container-md" onClick={handleClickNo}>
                        They are not, you clown
                    </button>
                </MotionWrapper>
            </div>
        </div>
    );

};

export default ThankYouForComing;