import React, { useRef } from "react";
import { Container, Section } from "@/components";
import { SplitText } from "gsap/dist/SplitText";
import { useGSAP, gsap } from "@/lib";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";
import Image from "next/image";
import windowDimension from "@/hooks/useWindowDimension";

interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const titleRef = useRef<(HTMLSpanElement | null)[]>([]);
  const isDarkMode = theme === "dark-theme";
  const { isMobile, isMobileLarge } = windowDimension();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      titleRef.current.forEach((wordRef, index) => {
        if (wordRef) {
          const splitText = new SplitText(wordRef, { type: "chars" }); // Split the word into characters

          // Set visibility to visible for animation
          gsap.set(splitText.chars, { visibility: "visible" });

          timeline.fromTo(
            splitText.chars,
            {
              y: 350,
            },
            {
              y: 0,
              stagger: 0.03,
              duration: 2.5,
              ease: "power4.out",
            },
            index === 0 ? 0 : `-=${2.2}`, // Overlap animations by 1.5 seconds
          );
        }
      });
    });

    return () => ctx.revert();
  });

  if (!data) return null;
  const { title } = data;
  const words = title.split(" ");

  return (
    <Section
      id="hero"
      className={`hero h-screen ${styles.heroSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
    >
      <Image
        src="/image/background-2.png"
        alt="hero-bg"
        width={3000}
        height={3000}
        className="absolute inset-0 h-screen w-full object-cover"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)", // Fix the gradient to start at full opacity
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <Container className="relative h-full">
        <div className="mt-30 w-full sm:absolute sm:top-[25%] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-[35%]">
          <h1 className={styles.title}>
            {words.map((word, index) => (
              <span
                className="text-white"
                key={index}
                ref={(el) => (titleRef.current[index] = el)}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {isMobile || isMobileLarge ? (
          <div className="mt-14 font-bold sm:absolute sm:top-[37%] sm:left-16">
            <div className={`text-white ${styles.heroParagraph}`}>
              Motto® is the leading global branding consultancy for
              positioning, scaling, and reinventing companies in the tech and
              innovation space.
            </div>
          </div>
        ) : (
          <div className="mt-20 font-bold sm:absolute sm:top-[32%] sm:left-16">
            <div className={`text-white sm:pl-20 ${styles.heroParagraph}`}>
              Motto® is the leading global branding
            </div>
            <div className={`text-white ${styles.heroParagraph}`}>
              consultancy for positioning, scaling, and
            </div>
            <div className={`text-white ${styles.heroParagraph}`}>
              reinventing companies in the tech and
            </div>
            <div className={`text-white ${styles.heroParagraph}`}>
              innovation space.
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default HeroSection;
