import React, { useRef } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticPropsResult } from 'next/types';
import groq from 'groq';
import SplitType from 'split-type';
import { Button, BlockContent, Container, Grid, ImageTag, Main, Section, Seo } from '@/components';
import { useTheme } from '@/providers';
import { Project, SEO } from '@/types';
import { sanityClient, useGSAP, gsap } from '@/lib';
import { PROJECT_QUERY } from '@/services/queries';
import { formatDate } from '@/utils';
import styles from './styles.module.scss';
import { PortableText } from '@portabletext/react';

interface Page {
  page: Project & {
    seo: SEO;
  };
  work: Project[];
}

export default function Page({ page, work }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const { title, excerpt, body, slug, createdDate, tools, type, cta, coverImage, seo } = page;
  const formattedDate = formatDate(createdDate);
  const isDarkMode = theme === 'dark-theme';
  const currentIndex = work.findIndex((item) => item.slug.current === slug.current);
  const nextIndex = currentIndex < work.length - 1 ? currentIndex + 1 : 0;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const articleRef = useRef<HTMLElement>(null);

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
    { scope: titleRef, dependencies: [slug.current] }
  );

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
    { scope: containerRef, dependencies: [slug.current] }
  );

  useGSAP(
    () => {
      const articleChildren = gsap.utils.toArray(articleRef?.current?.children!);

      const tl = gsap.timeline({
        delay: 0.2,
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
    { scope: articleRef, dependencies: [slug.current] }
  );

  useGSAP(
    () => {
      const projectInfo = gsap.utils.toArray(projectInfoRef?.current?.children!);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectInfoRef?.current,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        projectInfo,
        {
          x: -15,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          delay: 0.2,
          stagger: {
            each: 0.3,
            ease: 'power2.inOut'
          }
        }
      );
    },
    { scope: projectInfoRef }
  );

  const renderCta = () => {
    if (!cta) return null;

    return cta.map(
      (
        item: {
          title: string;
          url: string;
        },
        index: number
      ) => {
        return (
          <Button key={index} href={`${item.url}`} variant="primary" newTab withSvg>
            {item.title}
          </Button>
        );
      }
    );
  };

  return (
    <>
      <Seo seo={seo} />

      <Main>
        <Section className={`${styles.section} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
          <Container className={styles.container} isFluid={false}>
            {title && (
              <h1 ref={titleRef} key={title} className={styles.title}>
                {title}
              </h1>
            )}
          </Container>

          <div style={{ position: 'relative', overflow: 'hidden' }} className={`${styles.projectThumbnail}`}>
            <div
              ref={containerRef}
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
              imageRef={imageRef}
              src={`${coverImage?.asset?.url}`}
              alt="project Image"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority={true}
              blurDataURL={coverImage?.asset?.metadata?.lqip}
            />
          </div>

          <Container className={styles.containerProjectInfo} isFluid={false}>
            <Grid>
              <div ref={projectInfoRef} className={styles.projectInfoWrapper}>
                {formattedDate && (
                  <div className={styles.projectInfo}>
                    <span className={styles.greyInfo}>Date</span>
                    <span className={styles.whiteInfo}> {formattedDate}</span>
                  </div>
                )}
                {type && (
                  <div ref={projectInfoRef} className={styles.projectInfo}>
                    <span className={styles.greyInfo}>Role</span>
                    {type.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {tools && (
                  <div ref={projectInfoRef} className={styles.projectInfo}>
                    <span className={styles.greyInfo}>Tools</span>
                    {tools.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {excerpt && (
                <article ref={articleRef} className={styles.excerpt}>
                  <PortableText value={excerpt} />
                </article>
              )}

              <div className={styles.btnWrap}>{renderCta()}</div>

              {body && (
                <article className={styles.bodyCopy}>
                  <BlockContent value={body} />
                </article>
              )}

              <div className={styles.nextProjectWrapper}>
                <div className={styles.divider} />
                <p>Next</p>
                {nextIndex !== null && (
                  <Link className={styles.nextProjectLink} href={`/projects/${work[nextIndex].slug.current}`}>
                    {work[nextIndex].title}
                  </Link>
                )}
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let work = await sanityClient.fetch(groq`
  *[_type == "work" && !(_id in path('drafts.**'))] {
      slug,
  }`);

  const paths = work.map((project: Project) => {
    return { params: { slug: project.slug.current } };
  });

  return {
    paths,
    fallback: false
  };
};

type pathParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: pathParams): Promise<GetStaticPropsResult<Page>> {
  const { slug } = params;

  let page = await sanityClient.fetch(PROJECT_QUERY, {
    slug
  });

  let work = await sanityClient.fetch(groq`
  *[_type == "work" && !(_id in path('drafts.**'))] {
    title,
    slug,
  }`);

  // render the 404 if there is an api error
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
}
