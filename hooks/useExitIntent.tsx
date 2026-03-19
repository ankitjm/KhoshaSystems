import { useEffect, useState } from 'react';

export const useExitIntent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      // Check if mouse leaves the top of the viewport
      if (event.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true); // Only trigger once per session
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [hasTriggered]);

  return { isVisible, setIsVisible };
};