import { useEffect, useState } from "react";

const useHeaderCollapse = (): boolean => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) return setIsCollapsed(true);
    return setIsCollapsed(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isCollapsed;
};

export default useHeaderCollapse;
