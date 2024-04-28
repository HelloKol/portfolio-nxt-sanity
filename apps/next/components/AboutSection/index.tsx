import { useRef } from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { Button, Container, Grid, Section } from '@/components';
import { gsap, useGSAP } from '@/lib';
import { useTheme } from '@/providers';
import styles from './styles.module.scss';

interface Props {
  data: {
    title: string;
    body: PortableTextBlock;
    cvLink: string;
  };
}

const AboutSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const articleRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isDarkMode = theme === 'dark-theme';

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef?.current,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        titleRef?.current,
        {
          x: -20,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.8,
          ease: 'power4.out'
        }
      );
    },
    { scope: titleRef }
  );

  useGSAP(
    () => {
      const articleChildren = gsap.utils.toArray(articleRef?.current?.children!);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: articleRef?.current,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        articleChildren,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power4.out',
          stagger: {
            each: 0.3
          }
        }
      );
    },
    { scope: articleRef }
  );

  if (!data) return null;
  const { title, body, cvLink } = data;

  return (
    <Section className={`${styles.aboutSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container isFluid={false}>
        <Grid>
          {title && (
            <h2 ref={titleRef} className={styles.title}>
              {title}
            </h2>
          )}
          {body && (
            <article ref={articleRef} className={styles.bodyCopy}>
              <PortableText value={body} />
            </article>
          )}
          <Button className={styles.downloadCvBtn} href={cvLink} variant="primary" download={true} newTab>
            Download CV
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g>
                <path d="M90,54a5.9966,5.9966,0,0,0-6,6V78H12V60A6,6,0,0,0,0,60V84a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V60A5.9966,5.9966,0,0,0,90,54Z" />
                <path d="M43.7578,64.2422a5.9979,5.9979,0,0,0,8.4844,0l18-18a5.9994,5.9994,0,0,0-8.4844-8.4844L54,45.5156V12a6,6,0,0,0-12,0V45.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844Z" />
              </g>
            </svg>
          </Button>
        </Grid>
      </Container>
    </Section>
  );
};

export default AboutSection;
