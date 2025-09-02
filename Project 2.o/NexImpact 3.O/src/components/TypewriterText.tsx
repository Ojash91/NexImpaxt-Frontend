import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  totalDuration?: number; // Total animation duration in milliseconds
  className?: string;
}

export function TypewriterText({ text, delay = 0, speed = 2, totalDuration, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Calculate speed based on totalDuration if provided
  const calculatedSpeed = totalDuration 
    ? Math.max(10, (totalDuration - delay) / text.length) 
    : speed;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * calculatedSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, calculatedSpeed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 350);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span 
        className={`inline-block w-0.5 h-6 ml-1 bg-primary transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  );
}