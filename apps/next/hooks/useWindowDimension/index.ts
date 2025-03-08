/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from "react";

type WindowDimention = {
  isMobile: boolean;
};

const useWindowDimension = (): WindowDimention => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    isMobile,
  };
};

export default useWindowDimension;
