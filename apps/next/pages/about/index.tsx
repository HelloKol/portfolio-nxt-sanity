import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { Container, ImageTag, Main, Section, Button, Seo } from '@/components';
import { useTheme } from '@/providers';
import { SEO } from '@/types';
import { sanityClient, useGSAP, gsap } from '@/lib';
import { ABOUT_QUERY } from '@/services/queries';
import styles from './styles.module.scss';

interface Page {
  page: {
    title: string;
    name: string;
    body: PortableTextBlock;
    featuredImage: {
      _type: string;
      asset: {
        _id: string;
        url: string;
        metadata: {
          lqip: string;
        };
      };
    };
    skillsTitle: string;
    skills: string[];
    seo: SEO;
  };
}

export default function About({ page }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const articleRef = useRef<HTMLElement>(null);
  const { name, body, featuredImage, skillsTitle, skills, seo } = page;
  const isDarkMode = theme === 'dark-theme';

  useGSAP(
    () => {
      gsap.set(containerRef.current, { scaleX: 1 });
      gsap.set(imageRef.current, {
        scale: 1.5,
        filter: 'blur(50px)'
      });

      // Image block reveal
      const tl = gsap.timeline();
      tl.to(
        containerRef.current,
        {
          duration: 1,
          scaleX: 0,
          transformOrigin: 'left',
          ease: 'power2.inOut'
        },
        '+=0.2'
      ).to(
        imageRef.current,
        {
          duration: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.inOut'
        },
        '-=1'
      );
    },
    { scope: containerRef }
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
          ease: 'power4.out',
          stagger: {
            each: 0.2
          }
        }
      );
    },
    { scope: articleRef }
  );

  const renderSkills = () =>
    skills &&
    skills.map((item: string, index: number) => (
      <li key={index} className={styles.skillItem}>
        <div className={styles.bubble}>{item}</div>
      </li>
    ));

  return (
    <>
      <Seo seo={seo} />

      <Main>
        <Section className={`${styles.section} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
          <Container isFluid={false}>
            <div className={styles.left}>
              {featuredImage && (
                <div className={styles.imageWrapper}>
                  <div ref={containerRef} className={styles.block} />
                  <ImageTag
                    imageRef={imageRef}
                    src={`${featuredImage?.asset?.url}`}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    quality={100}
                    blurDataURL={featuredImage?.asset?.metadata?.lqip}
                  />
                </div>
              )}
            </div>
            <div className={styles.right}>
              {body && (
                <article ref={articleRef} className={styles.bodyCopy}>
                  {name && <h3>{name}</h3>}
                  <PortableText value={body} />
                </article>
              )}
              <Button
                className={styles.downloadCvBtn}
                href={`https://utfs.io/f/876b1740-6dc7-4222-8033-937ac9e958a1-4vwtqh.pdf`}
                variant="primary"
                download={true}
                newTab
              >
                Download CV
                <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g>
                    <path d="M90,54a5.9966,5.9966,0,0,0-6,6V78H12V60A6,6,0,0,0,0,60V84a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V60A5.9966,5.9966,0,0,0,90,54Z" />
                    <path d="M43.7578,64.2422a5.9979,5.9979,0,0,0,8.4844,0l18-18a5.9994,5.9994,0,0,0-8.4844-8.4844L54,45.5156V12a6,6,0,0,0-12,0V45.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844Z" />
                  </g>
                </svg>
              </Button>
              {skillsTitle && <p className={styles.skillsTitle}>{skillsTitle}</p>}
              <ul className={styles.skills}>{renderSkills()}</ul>
            </div>
          </Container>
        </Section>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(ABOUT_QUERY);

    // render the 404 if there is an api error
    if (!page) {
      return {
        notFound: true
      };
    }

    page = JSON.parse(JSON.stringify(page));

    return {
      props: {
        page
      },
      revalidate: 30
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};
