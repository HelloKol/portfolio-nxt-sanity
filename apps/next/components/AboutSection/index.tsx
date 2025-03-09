import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import ThreeDViewer from "../ThreeViewer";
import Section from "../Section";
import { gsap } from "@/lib";

interface Props {
  data: {
    title: string;
    body: PortableTextBlock;
  };
}

const AboutSection = ({ data }: Props): JSX.Element | null => {
  const sectionRef = useRef<HTMLSelectElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let split: SplitText;
    let tl: gsap.core.Timeline;

    const createSplit = () => {
      split && split.revert();
      tl && tl.revert();

      // Split by words instead of characters to avoid breaking words
      split = new SplitText(textRef.current, { type: "words" });

      tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true, // 🔥 Locks the section
            scrub: 0.75,
            markers: false, // Remove markers in production
          },
        })
        .set(split.words, { color: "#ffffff", stagger: 0.05 }, 0.1);
    };

    createSplit();
    const debouncer = gsap.delayedCall(0.2, createSplit).pause();
    window.addEventListener("resize", () => debouncer.restart(true));

    // Background color change when fully in view
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
    });

    return () => {
      split?.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Rotate 3D model based on scroll
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      setRotation((prev) => prev + (event.deltaY > 0 ? 0.025 : -0.025)); // Left/Right rotation
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  if (!data) return null;
  const { title, body } = data;

  return (
    <Section
      id="about"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <Image
        src="/image/background-2.png"
        alt="hero-bg"
        width={3000}
        height={3000}
        className="absolute inset-0 h-[110vh] w-full rotate-180 object-cover"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%)", // Fade out from top to bottom
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%)",
        }}
      />

      <div className="absolute -top-[60px] left-0 h-full w-full sm:top-0">
        <ThreeDViewer rotation={rotation} />
      </div>

      <div className="relative z-10 container mx-auto flex h-full items-center justify-center px-4 sm:px-6 md:px-8 xl:mt-6 xl:max-w-[1536px] 2xl:mt-14">
        <div className="">
          <h2 className="font-heading-bold text-center text-xl text-white uppercase">
            {title}
          </h2>

          <article
            ref={textRef}
            className="about-section-text mt-4 text-center leading-tight font-bold text-gray-400"
          >
            <PortableText value={body} />
          </article>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
