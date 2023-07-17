import { useState, useEffect } from 'react'

/**
 * Hook para saber si el usuario ingresó al sitio desde un dispositivo mobile o no.
 */
export default function useWindowSize() {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        return setIsMobile(false)
      }

      setIsMobile(true)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  return { isMobile }
}