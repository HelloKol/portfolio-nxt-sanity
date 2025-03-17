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
    excerptLeft: string;
    excerptRight: string;
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
  const { title, body, excerptLeft, excerptRight } = data;

  return (
    <Section id="about" className="relative">
      <Container>
        <div className="md:w-5/6 lg:w-3/4 xl:w-2/3">
          <h2 className="font-heading-bold mb-10 text-xl uppercase">{title}</h2>
          <article
            ref={textRef}
            className="about-section-text font-manrope-medium leading-tight"
          >
            <PortableText value={body} />
          </article>
          <p className="my-14 w-[350px] text-sm md:text-base">{excerptLeft}</p>
          <p className="w-[350px] text-sm sm:ml-[200px] md:text-base lg:ml-[350px] xl:ml-[400px]">
            {excerptRight}
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AboutSection;
