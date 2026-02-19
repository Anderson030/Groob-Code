import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;

        gsap.fromTo(el,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Hover effect
        const hoverAnimation = gsap.to(el, {
            y: -10,
            boxShadow: "0 10px 30px -10px rgba(0, 112, 243, 0.3)",
            borderColor: "rgba(0, 112, 243, 0.5)",
            duration: 0.3,
            paused: true
        });

        el.addEventListener("mouseenter", () => hoverAnimation.play());
        el.addEventListener("mouseleave", () => hoverAnimation.reverse());

        return () => {
            el.removeEventListener("mouseenter", () => hoverAnimation.play());
            el.removeEventListener("mouseleave", () => hoverAnimation.reverse());
        };
    }, []);

    return (
        <div ref={cardRef} className={`glass-card ${className}`}>
            {children}
        </div>
    );
};

export default AnimatedCard;
