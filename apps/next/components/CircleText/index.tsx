import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib";
import settings from "@/data/settings.json";

const CirclesText = () => {
  const textRef = useRef<SVGTextElement | null>(null);
  const { resumeFile } = settings;

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 10,
        ease: "none",
        rotation: 360,
        transformOrigin: "center",
        repeat: -1,
      });
    }
  }, []);

  return (
    <Link
      href={resumeFile.asset.url}
      download
      target="_blank"
      className="flex hidden cursor-pointer items-center justify-center text-xl lg:block"
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="h-[180px] w-[180px] md:h-[200px] md:w-[200px]"
          width="100%"
          height="100%"
          viewBox="0 0 1400 1400"
        >
          <defs>
            <path
              id="circle-1"
              d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5"
            />
          </defs>
          <text
            ref={textRef}
            className="fill-black text-[130px] font-bold uppercase"
          >
            <textPath xlinkHref="#circle-1" aria-label="" textLength="2830">
              Download Resume — Download Resume —&nbsp;
            </textPath>
          </text>
        </svg>

        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-black">
          Download Resume
        </p>
      </div>
    </Link>
  );
};

export default CirclesText;
