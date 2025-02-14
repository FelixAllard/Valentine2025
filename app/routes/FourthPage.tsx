// routes/SecondPageThankYouForComing/ThankYouForComing.tsx
import React, {Fragment, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css"
import { motion } from 'framer-motion';
import MotionWrapper from "~/Utilities/MotionWrapper";
import {useNavigate} from "react-router";
import HeartBackground from "../Utilities/HearthBackground";



const FourthPage: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/fifth-page');
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
                    <h1>Here is what I think about you</h1>
                </MotionWrapper>
                <MotionWrapper duration={1} delay={0.2}>
                    <h2>
                        You? <strong>You are the biggest yapper</strong> I have ever seen, and honestly? <span style={{ color: '#ff4757' }}>I think that's adorable.</span> <br /><br />

                        Like, <em>I’m genuinely in awe.</em> <br />
                        The sheer number of words flying out of your mouth at any given second? <strong>Unmatched. Unparalleled.</strong> A world record in the making. <br /><br />

                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>I swear, if talking were an Olympic sport...</span><br />
                        <span style={{ color: '#1e90ff' }}>🥇🥈🥉 You'd take home gold, silver, AND bronze.</span> <br /><br />

                        And yet… <MotionWrapper duration={0.5} delay={1}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6347' }}>I can feel myself adapting.</span>
                    </MotionWrapper>
                        <MotionWrapper duration={0.5} delay={1.3}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#32cd32' }}>Adjusting.</span>
                        </MotionWrapper>
                        <MotionWrapper duration={0.5} delay={1.6}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#957300' }}>Even liking it.</span>
                        </MotionWrapper>
                        <br /><br />

                        Because, if I’m being real? <br />
                        <span style={{ fontSize: '1.3rem', color: '#e67e22' }}>That energy of yours, it’s kinda contagious.</span> <br /><br />

                        The past few days had me like...
                    </h2>
                </MotionWrapper>

                <div className="tenor-gif-embed"
                     data-postid="18245739903206507120"
                     data-share-method="host"
                     data-aspect-ratio="1"
                     data-width="50%"
                     style={{width: "100%", position: "relative"}}>
                </div>

                <MotionWrapper duration={1} delay={0.7}>
                    <button className="btn btn-danger m-2 container-md" onClick={handleClick}>
                        Ok and???
                    </button>
                </MotionWrapper>
            </div>
        </div>
    );

};

export default FourthPage;