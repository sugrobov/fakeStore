import { useState, useEffect } from 'react';

export default function useIsMobile() {
        const [isMobile, setIsMobile] = useState(false);
      
        useEffect(() => {
          const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
          };
      
          checkIsMobile();
          const resizeListener = () => {
            checkIsMobile();
          };
      
          window.addEventListener('resize', resizeListener);
          return () => {
            window.removeEventListener('resize', resizeListener);
          };
        }, []);
      
        return isMobile;
}