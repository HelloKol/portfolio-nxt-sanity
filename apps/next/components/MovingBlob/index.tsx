import { useEffect, useRef, useState } from "react";

const InteractiveBubble: React.FC = () => {
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  let curX = 0;
  let curY = 0;

  useEffect(() => {
    const move = () => {
      curX += (target.x - curX) / 20;
      curY += (target.y - curY) / 20;
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setTarget({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [target]);

  return (
    <div className="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g3"></div>
        <div className="g2"></div>
      </div>
    </div>
  );
};

export default InteractiveBubble;
