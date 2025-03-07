import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

const Portal = ({ children, containerId = "portal-root" }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalContainer = document.getElementById(containerId);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = containerId;
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);
    setMounted(true);

    return () => {
      if (portalContainer && portalContainer.childElementCount === 0) {
        portalContainer.remove();
      }
    };
  }, [containerId]);

  if (!mounted || !container) return null;

  return createPortal(children, container);
};

export default Portal;
