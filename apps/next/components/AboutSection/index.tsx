import Image from "next/image";
import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { gsap } from "@/lib";
import Section from "../Section";
import Container from "../Container";

interface Props {
  data: {
    title: string;
    body: PortableTextBlock;
  };
}

const AboutSection = ({ data }: Props): JSX.Element | null => {
  const sectionRef = useRef<HTMLSelectElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

  if (!data) return null;
  const { title, body } = data;

  return (
    <Section id="about" className="relative">
      {/* <Image
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
      /> */}

      <Container>
        <div className="">
          <h2 className="font-heading-bold text-center text-xl uppercase">
            {title}
          </h2>

          <article
            ref={textRef}
            className="about-section-text mt-4 text-center leading-tight font-bold"
          >
            <PortableText value={body} />
          </article>
        </div>
      </Container>
    </Section>
  );
};

export default AboutSection;
