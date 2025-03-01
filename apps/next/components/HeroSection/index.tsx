import React, { useRef } from "react";
import { Container, Section } from "@/components";
import { SplitText } from "gsap/dist/SplitText";
import { useGSAP, gsap } from "@/lib";
import { useTheme } from "@/providers";
import styles from "./styles.module.scss";
import Image from "next/image";
interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const titleRef = useRef<(HTMLSpanElement | null)[]>([]);
  const isDarkMode = theme === "dark-theme";

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

  // Split the title into an array of words
  const heroTitleSplit = title.split(" ");
  const heroTitle1 = heroTitleSplit.slice(0, 2).join(" ");
  const heroTitle2 = heroTitleSplit[2];
  const heroTitle3 = heroTitleSplit[3];
  const words = [heroTitle1, heroTitle2, heroTitle3];

  return (
    <Section
      className={`hero h-[110vh] ${styles.heroSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
    >
      <Image
        src="/image/background-2.png"
        alt="hero-bg"
        width={3000}
        height={3000}
        className="absolute inset-0 h-[110vh] w-full object-cover"
      />
      <Container isFluid={false} className="relative h-full">
        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <h1 className={styles.title}>
            {words.map((word, index) => (
              <span key={index} ref={(el) => (titleRef.current[index] = el)}>
                {word}
              </span>
            ))}
          </h1>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
