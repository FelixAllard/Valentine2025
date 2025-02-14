"use client"; // If using Next.js, ensure this runs only on the client

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const isClient = typeof window !== "undefined";

const generateRandomPosition = () => {
    if (!isClient) return { x: 0, y: 0 }; // Avoid SSR crash
    return {
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2,
    };
};

const FloatingHeart = ({ size }: { size: number }) => {
    const [position, setPosition] = useState(generateRandomPosition());

    useEffect(() => {
        if (!isClient) return;

        const interval = setInterval(() => {
            setPosition(generateRandomPosition());
        }, 4000); // Change position every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={position}
            animate={position}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{
                position: "absolute",
                fontSize: size,
                color: "red",
                filter: "drop-shadow(0px 0px 5px rgba(255, 0, 0, 0.5))",
            }}
        >
            ❤️
        </motion.div>
    );
};

const HeartBackground = ({ count = 10 }: { count?: number }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: -1,
            }}
        >
            {isClient &&
                Array.from({ length: count }).map((_, i) => (
                    <FloatingHeart key={i} size={Math.random() * 30 + 20} />
                ))}
        </div>
    );
};

export default HeartBackground;
