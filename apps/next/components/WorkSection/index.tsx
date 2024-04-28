import { useRef } from 'react';
import Link from 'next/link';
import SplitType from 'split-type';
import { Button, Container, Grid, ImageTag, Section } from '@/components';
import { useTheme } from '@/providers';
import { Project } from '@/types';
import { useGSAP, gsap } from '@/lib';
import { formatDate } from '@/utils';
import styles from './styles.module.scss';

interface Props {
  data: {
    title: string;
    cta: {
      title: string;
      _type: string;
      content: {
        slug: {
          current: string;
        };
      };
    };
    workList: Project[];
  };
}

const WorkSection = ({ data }: Props): JSX.Element | null => {
  const { theme } = useTheme();
  const listItemRefs = useRef<HTMLDivElement[] | null[]>([]);
  const projectTitleRef = useRef<HTMLHeadingElement[] | null[]>([]);
  const projectTypeRef = useRef<HTMLDivElement[] | null[]>([]);
  const projectCreatedRef = useRef<HTMLDivElement[] | null[]>([]);
  const isDarkMode = theme === 'dark-theme';

  if (!data) return null;
  const { title, cta, workList } = data;
  const projectLength = workList ? (workList.length < 10 ? `0${workList.length}` : workList.length) : `00`;

  useGSAP(() => {
    listItemRefs.current.forEach((ref) => {
      gsap.set(ref?.children[0], { scaleX: 1 });
      gsap.set(ref, {
        scale: 1.5,
        filter: 'blur(50px)'
      });

      // Image block reveal
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
  }, [listItemRefs]);

  useGSAP(() => {
    projectTitleRef.current.forEach((ref) => {
      // Text reveal
      const split = new SplitType(ref, { types: 'chars' });
      const chars = split.chars;

      // Image block reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        chars,
        {
          y: 150,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1.5,
          ease: 'power4.out'
        }
      );
    });
  }, [projectTitleRef]);

  useGSAP(() => {
    projectTypeRef.current.forEach((ref) => {
      const tags = gsap.utils.toArray(ref.children); // Convert HTMLCollection of tags to array

      const tl = gsap.timeline({
        delay: 1,
        scrollTrigger: {
          trigger: ref,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        tags,
        {
          x: -20,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: {
            each: 0.2
          }
        }
      );
    });
  }, [projectTypeRef]);

  useGSAP(() => {
    projectCreatedRef.current.forEach((ref) => {
      const tl = gsap.timeline({
        delay: 0.8,
        scrollTrigger: {
          trigger: ref,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom center', // end after scrolling 500px beyond the start
          onEnter: () => tl.play()
        }
      });

      tl.fromTo(
        ref,
        {
          x: -20,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out'
        }
      );
    });
  }, [projectCreatedRef]);

  const renderProjects = () =>
    workList &&
    workList
      .sort((a, b) => a.rank - b.rank)
      .map((item, index) => {
        const { _id, title, slug, createdDate, type, coverImage } = item;
        const formattedDate = formatDate(createdDate);
        const currentIndex = index < 10 ? `0${index + 1}` : index + 1;

        return (
          <div key={_id} className={styles.projectFeedItem}>
            <Grid>
              <p className={styles.projectIndex}>
                {currentIndex}-{projectLength}
              </p>
              <h3 ref={(el) => (projectTitleRef.current[index] = el)} className={styles.projectTitle}>
                <Link href={`/projects/${slug.current}`}>{title}</Link>
              </h3>
              <div className={styles.projectTags}>
                <p ref={(el) => (projectCreatedRef.current[index] = el)} className={styles.projectCreated}>
                  {formattedDate}
                </p>
                <div ref={(el) => (projectTypeRef.current[index] = el)} className={styles.tags}>
                  {type && type.map((item: string, index: number) => <p key={index}>{item}</p>)}
                </div>
              </div>
              {coverImage && (
                <Link href={`/projects/${slug.current}`} className={styles.projectThumbnail}>
                  <div className={styles.overlay}>
                    <span>View project</span>
                  </div>

                  <div
                    ref={(el) => (listItemRefs.current[index] = el)}
                    style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}
                  >
                    <div
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
                </Link>
              )}
            </Grid>
          </div>
        );
      });

  return (
    <Section className={`${styles.workSection} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Container isFluid={false}>
        <Grid>
          {title && <h2 className={styles.title}>{title}</h2>}
          {cta && (
            <Button
              className={styles.discoverBtn}
              href={`/${cta.content.slug.current}`}
              variant="primary"
              withSvg
            >
              {cta.title}
            </Button>
          )}
          <ul className={styles.projectFeed}>{renderProjects()}</ul>
        </Grid>
      </Container>
    </Section>
  );
};

export default WorkSection;
