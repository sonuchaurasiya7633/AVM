import React, { useEffect, useRef } from 'react';

export const ReadingProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0 && barRef.current) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            barRef.current.style.width = `${currentProgress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gold-gradient shadow-luxury-gold will-change-[width]"
        style={{ width: '0%' }}
      />
    </div>
  );
};
