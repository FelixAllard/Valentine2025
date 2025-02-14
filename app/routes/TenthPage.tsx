import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router";
import MotionWrapper from "~/Utilities/MotionWrapper";
import whatIsKilo from "./Screenshot_20250213-215335.png"

const NinthPage: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsClicked(true);
    };

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => {
                navigate('/GoodBye-page'); // Replace with your target route
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
                    <h1>What I mean is that I am not used to this</h1>
                </MotionWrapper>
                <img src={whatIsKilo} alt={"You who overtext and drives me crazy"}/>
                <MotionWrapper duration={1} delay={0.7}>
                    <button className="btn btn-danger m-2 container-md" onClick={handleClick}>
                        ...
                    </button>
                </MotionWrapper>

            </div>
        </div>
    );

};

export default NinthPage;
