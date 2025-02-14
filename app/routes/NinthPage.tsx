import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router";
import MotionWrapper from "~/Utilities/MotionWrapper";

const NinthPage: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsClicked(true);
    };

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => {
                navigate('/tenth-page'); // Replace with your target route
            }, 1500); // Match the duration of the scale animation

            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [isClicked, navigate]);

    return (
        <div
            className="d-flex justify-content-center align-items-center background-pink"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}
        >
            {//<HeartBackground count={15} />
            }
            <div
                className="heart d-flex justify-content-center align-items-center flex-column"
                style={{
                    minHeight: '100vh',
                    maxWidth: '90%',
                    textAlign: 'center',
                    padding: '20px'
                }}
            >
                <MotionWrapper duration={1} delay={0.2}>
                    <h1>So now!</h1>
                </MotionWrapper>
                <MotionWrapper duration={1} delay={0.2}>
                    <h2 style={{textAlign: "center", lineHeight: "1.6", fontSize: "1.2rem"}}>
                        I don't know what <span style={{color: "#FF5733", fontWeight: "bold"}}>future me</span> will
                        think of you when you read this, <br/>
                        but one thing is certain—<span style={{color: "#FFD700", fontSize: "1.3rem"}}>you are truly special</span>.
                        💫<br/>
                        No matter where life takes us, always remember that you shine <span style={{color: "#FF69B4"}}>brighter than the stars</span>.
                        ✨<br/>
                        <br/>
                        If there's one thing that <span style={{color: "#1E90FF", fontWeight: "bold"}}>amazes and terrifies me</span>,
                        it's the sheer energy you hold, while I, most of the time, feel like a low-battery phone.
                        ⚡🔋<br/>
                        <br/>
                        You are the <span style={{color: "#32CD32", fontWeight: "bold"}}>first person</span> I have ever
                        felt this comfortable with, so effortlessly and so fast. <br/>
                        I truly hope, no matter what happens, that we always stay connected. 💙
                    </h2>

                </MotionWrapper>

                <div className="tenor-gif-embed"
                     data-postid="7426510049970770085"
                     data-share-method="host"
                     data-aspect-ratio="1"
                     data-width="50%"
                     style={{width: "100%", position: "relative"}}>
                </div>

                <MotionWrapper duration={1} delay={0.7}>
                    <button className="btn btn-danger m-2 container-md" onClick={handleClick}>
                        Menoum!!!!
                    </button>
                </MotionWrapper>
            </div>
        </div>
    );

};

export default NinthPage;
