import React, { useContext, useRef } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import SplitType from 'split-type';
import { Container, Grid, ImageTag, Main, ProjectFilter, Section, Seo } from '@/components';
import { Context } from '@/contexts/Context';
import { useTheme } from '@/providers';
import { Project, SEO } from '@/types';
import { sanityClient, useGSAP, gsap } from '@/lib';
import { PROJECT_INDEX_LIST_QUERY, PROJECT_INDEX_QUERY } from '@/services/queries';
import styles from './styles.module.scss';

interface Page {
  page: {
    title: string;
    seo: SEO;
  };
  work: Project[];
}

export default function Projects({ page, work }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<HTMLDivElement | null[]>([]);
  const { projectFilterTag, setProjectFilterTag } = useContext(Context);
  const { title, seo } = page;
  const isDarkMode = theme === 'dark-theme';

  const filteredData = work
    .filter(
      (item) =>
        item?.type &&
        item.type.some((type) => type.toLowerCase().includes(projectFilterTag.toLocaleLowerCase()))
    )
    .sort((a, b) => a.rank - b.rank);

  useGSAP(
    () => {
      // Text reveal
      const split = new SplitType(titleRef.current!, { types: 'chars' });
      const chars = split.chars;

      gsap.fromTo(
        chars,
        {
          y: 150,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: 'power4.out'
        }
      );
    },
    { scope: titleRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        filterRef?.current,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 1,
          ease: 'power4.out'
        }
      );
    },
    { scope: filterRef }
  );

  useGSAP(
    () => {
      listItemRefs.current.forEach((ref, index) => {
        // Image block reveal
        gsap.set(ref, {
          scale: 1.5,
          filter: 'blur(50px)'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
            end: 'bottom center', // end after scrolling 500px beyond the start
            onEnter: () => tl.play()
          }
        });

        tl.to(
          ref?.children[0],
          {
            duration: 1.2,
            scaleX: 0,
            transformOrigin: 'left',
            ease: 'power2.inOut'
          },
          '+=0.2'
        ).to(
          ref,
          {
            duration: 1.2,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power2.inOut'
          },
          '-=1'
        );
      });
    },
    { scope: listItemRefs }
  );

  const renderProjects = () =>
    filteredData.map((item: any, index: any) => {
      const { title, color, slug, coverImage } = item;

      return (
        <Link key={index} href={`/projects/${slug.current}`} className={styles.projectItem}>
          {coverImage && (
            <div className={styles.projectThumbnail}>
              <div className={styles.overlay}>
                <span>View project</span>
              </div>

              <div
                ref={(el) => (listItemRefs.current[index] = el)}
                style={{ position: 'relative', overflow: 'hidden' }}
                className={`${styles.projectThumbnail}`}
              >
                <div
                  // ref={containerRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    background: '#0F0F0F',
                    transformOrigin: 'left',
                    zIndex: 2
                  }}
                />
                <ImageTag
                  src={`${coverImage?.asset?.url}`}
                  alt="project Image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  blurDataURL={coverImage?.asset?.metadata?.lqip}
                />
              </div>
            </div>
          )}
          {title && (
            <h1
              className={styles.projectTitle}
              style={{
                color: color.value
              }}
            >
              {title}
            </h1>
          )}
        </Link>
      );
    });

  return (
    <>
      <Seo seo={seo} />

      <Main>
        <Section className={`${styles.section} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
          <Container isFluid={false}>
            <Grid>
              {title && (
                <h1
                  ref={titleRef}
                  className={`${styles.title} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                >
                  {title}
                </h1>
              )}

              <div ref={filterRef} className={styles.filterWrap}>
                <div className={styles.projectView}>
                  <p>Change view</p>
                  <button className={`${styles.filterBtn} ${styles.activeFilterBtn}`} disabled>
                    Grid
                  </button>
                  <button className={`${styles.filterBtn} ${styles.inActiveFilterBtn}`} disabled>
                    List
                  </button>
                </div>

                <div className={styles.filterList}>
                  <p>Type</p>
                  <button
                    className={`${styles.filterBtn} ${projectFilterTag === '' && styles.activeFilterBtn}`}
                    onClick={() => setProjectFilterTag('')}
                  >
                    All
                  </button>
                  <button
                    className={`${styles.filterBtn} ${
                      projectFilterTag === 'design' && styles.activeFilterBtn
                    }`}
                    onClick={() => setProjectFilterTag('design')}
                  >
                    Design
                  </button>
                  <button
                    className={`${styles.filterBtn} ${projectFilterTag === 'web' && styles.activeFilterBtn}`}
                    onClick={() => setProjectFilterTag('web')}
                  >
                    Web
                  </button>
                </div>
              </div>

              <ul className={styles.projectFeed}>
                <Grid>{renderProjects()}</Grid>
              </ul>
            </Grid>
          </Container>
        </Section>
      </Main>
      <ProjectFilter />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(PROJECT_INDEX_QUERY);

    let work = await sanityClient.fetch(PROJECT_INDEX_LIST_QUERY);

    // render the 404 if there is no page in cms
    if (!page)
      return {
        notFound: true
      };

    page = JSON.parse(JSON.stringify(page));
    work = JSON.parse(JSON.stringify(work));

    return {
      props: {
        page,
        work
      },
      revalidate: 30
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};
