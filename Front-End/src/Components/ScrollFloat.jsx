import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top 80%',
  scrollEnd = 'bottom top',
  stagger = 0.1,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: animationDuration,
          ease,
          stagger: stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: scrollStart,
            end: scrollEnd,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default ScrollFloat;
