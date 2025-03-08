import React, { useRef } from "react";
import { Container, Section } from "@/components";
import { SplitText } from "gsap/dist/SplitText";
import { useGSAP, gsap } from "@/lib";
import styles from "./styles.module.scss";
import Image from "next/image";

interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const titleRef = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphRef = useRef<(HTMLDivElement | null)[]>([]); // Add this ref for paragraph lines

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      titleRef.current.forEach((wordRef, index) => {
        if (wordRef) {
          const splitText = new SplitText(wordRef, { type: "lines" });

          timeline.fromTo(
            splitText.lines,
            {
              yPercent: 100, // Start from below
              visibility: "visible",
            },
            {
              yPercent: 0, // Move to original position
              stagger: 0.2,
              duration: 2,
              ease: "power4.out",
            },
            index === 0 ? 0 : `-=${1.8}`,
          );
        }
      });

      // Updated paragraph animation with curtain reveal effect
      timeline.fromTo(
        paragraphRef.current,
        {
          yPercent: 100, // Start from below
          visibility: "visible",
        },
        {
          yPercent: 0, // Move to original position
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=2",
      );

      // Scroll animation for second word
      if (titleRef.current[1]) {
        gsap.to(titleRef.current[1], {
          x: -100, // Move left by 100px
          scrollTrigger: {
            trigger: ".heroSection", // Use the section as trigger
            start: "top top", // Start at the top of the section
            end: "+=500", // End 500px after start
            scrub: 1, // Smooth scrolling
          },
        });
      }
    });

    return () => ctx.revert();
  });

  if (!data) return null;
  const { title } = data;
  const words = title.split(" ");

  return (
    <Section id="hero" className={`heroSection h-screen ${styles.heroSection}`}>
      <Image
        src="/image/background-2.png"
        alt="hero-bg"
        width={3000}
        height={3000}
        className="absolute inset-0 h-screen w-full object-cover"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)", // Fix the gradient to start at full
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <Container className="relative h-full">
        <div className="mt-30 w-full sm:absolute sm:top-[25%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-[35%] sm:px-6 md:px-8">
          <h1
            className={`${styles.title} font-heading-regular invisible text-white uppercase`}
          >
            {words.map((word, index) => (
              <span
                className={`block overflow-hidden nth-of-type-1:text-center nth-of-type-2:text-right nth-of-type-3:text-center`}
                key={index}
                ref={(el) => (titleRef.current[index] = el)}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Mobile paragraph wrapper - Updated version */}
        <div className="invisible mt-14 font-bold sm:absolute sm:top-[32%] sm:left-16 sm:mt-20 md:left-20 lg:left-30">
          <div className="overflow-hidden">
            <div
              className={`font-body text-white sm:pl-10 md:pl-14 lg:pl-20 ${styles.heroParagraph}`}
              ref={(el) => (paragraphRef.current[0] = el)}
            >
              Motto® is the leading global branding
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={`font-body text-white ${styles.heroParagraph}`}
              ref={(el) => (paragraphRef.current[1] = el)}
            >
              consultancy for positioning, scaling
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={`font-body text-white ${styles.heroParagraph}`}
              ref={(el) => (paragraphRef.current[2] = el)}
            >
              and reinventing companies in the
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={`font-body text-white ${styles.heroParagraph}`}
              ref={(el) => (paragraphRef.current[3] = el)}
            >
              tech and innovation space.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
