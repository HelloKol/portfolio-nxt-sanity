import React, { useRef } from 'react';
import { Container, Section } from '@/components';
import { SplitText } from 'gsap/dist/SplitText';
import { useGSAP, gsap } from '@/lib';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const titleRef = useRef<HTMLSpanElement | null>([]);
  const isDarkMode = theme === 'dark-theme';

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({});
      timeline.fromTo(
        titleRef.current,
        {
          y: 150,
          opacity: 0
        },
        { y: 0, opacity: 1, stagger: 0.3, duration: 2, ease: 'power4.out' }
      );
    });

    return () => ctx.revert(); // Clean up on unmount
  });

  if (!data) return null;
  const { title } = data;
  const heroTitleSplit = title.split(' ');
  const heroTitle1 = heroTitleSplit.slice(0, 2).join(' ');
  const heroTitle2 = heroTitleSplit[2];
  const heroTitle3 = heroTitleSplit[3];
  const test = [heroTitle1, heroTitle2, heroTitle3];

  return (
    <Section className={`${styles.heroSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container isFluid={false}>
        <h1 className={styles.title}>
          {test.map((word, index) => (
            <span
              key={index}
              ref={(el) => (titleRef.current[index] = el)} // Assign each word to the ref array
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
      </Container>
    </Section>
  );
};

export default HeroSection;
