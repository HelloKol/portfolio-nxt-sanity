import React, { useRef } from "react";
import Image from "next/image";
import { Media } from "@/types";
import { useGSAP, gsap } from "@/lib";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Props
interface Props {
  value: Media;
}

const BlockContentImage = ({ value }: Props) => {
  if (!value || !value.asset) return null;
  const { asset } = value;

  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      // Set initial state
      gsap.set(card, {
        y: 150,
        opacity: 0,
      });

      // Create scroll trigger animation
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=150", // Start animation slightly earlier
        end: "top center",
        toggleActions: "play none none reset",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: cardRef },
  );

  return (
    <div ref={cardRef} className={"relative mb-8 lg:mb-10"}>
      <Image
        src={`${asset?.url}`}
        alt="project Image"
        layout="responsive"
        objectFit="contain"
        quality={100}
        height={500}
        width={500}
        priority={true}
        blurDataURL={asset?.metadata?.lqip}
      />
    </div>
  );
};

export default BlockContentImage;
