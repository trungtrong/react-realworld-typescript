import { useCallback, useEffect, useState } from "react";

export default function useViewPort() {
    const [vw, setVW] = useState(0);
    const [vh, setVH] = useState(0);
    //
    const setSizes = useCallback(() => {
        if (window.innerWidth !== vw) {
            setVW(window.innerWidth);
          }
    
          if (window.innerHeight !== vh) {
            setVH(window.innerHeight);
          }
    }, []);

    useEffect(() => {
        setSizes();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", setSizes);
    }, [vw, vh]);

    useEffect(() => {
        return () => {
            window.removeEventListener("resize", setSizes)
        };
    }, []);
    
    return { vw, vh };
}