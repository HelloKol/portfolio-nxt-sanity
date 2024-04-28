import React, { useRef } from 'react';
import { Container, Section } from '@/components';
import { useGSAP, gsap } from '@/lib';
import { useTheme } from '@/providers';
import SplitType from 'split-type';
import styles from './styles.module.scss';

interface Props {
  data: {
    title: string;
  };
}

const HeroSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const titleRef3 = useRef<HTMLHeadingElement>(null);
  const isDarkMode = theme === 'dark-theme';

  useGSAP(() => {
    const split1 = new SplitType(titleRef1.current!, { types: 'chars' });
    const split2 = new SplitType(titleRef2.current!, { types: 'chars' });
    const split3 = new SplitType(titleRef3.current!, { types: 'chars' });

    const animateTitle = (split: SplitType, delay: number) => {
      gsap.fromTo(
        split.chars,
        {
          y: 150,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 2,
          delay: delay,
          ease: 'power4.out'
        }
      );
    };

    animateTitle(split1, 0);
    animateTitle(split2, 0.5);
    animateTitle(split3, 0.7);
  });

  if (!data) return null;
  const { title } = data;
  const heroTitleSplit = title.split(' ');
  const heroTitle1 = heroTitleSplit.slice(0, 2).join(' ');
  const heroTitle2 = heroTitleSplit[2];
  const heroTitle3 = heroTitleSplit[3];

  return (
    <Section className={`${styles.heroSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container isFluid={false}>
        {title && (
          <h1 className={styles.title}>
            <span className={styles.titleLeft} ref={titleRef1}>
              {heroTitle1}
            </span>
            <span className={styles.titleRight} ref={titleRef2}>
              {heroTitle2}
            </span>
            <span className={styles.titleCenter} ref={titleRef3}>
              {heroTitle3}
            </span>
          </h1>
        )}
      </Container>
    </Section>
  );
};

export default HeroSection;
