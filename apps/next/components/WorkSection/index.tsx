import Link from 'next/link';
import { Button, Container, Grid, ImageTag, Section } from '@/components';
import { useTheme } from '@/providers';
import { Project } from '@/types';
import styles from './styles.module.scss';
import { formatDate } from '@/utils';

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
  const isDarkMode = theme === 'dark-theme';

  if (!data) return null;
  const { title, cta, workList } = data;
  const projectLength = workList ? (workList.length < 10 ? `0${workList.length}` : workList.length) : `00`;

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
              <h3 className={styles.projectTitle}>
                <Link href={`/projects/${slug.current}`} className={styles.projectThumbnail}>
                  {title}
                </Link>
              </h3>
              <div className={styles.projectTags}>
                <p className={styles.projectCreated}>{formattedDate}</p>
                <div className={styles.tags}>
                  {type && type.map((item: string, index: number) => <p key={index}>{item}</p>)}
                </div>
              </div>
              {coverImage && (
                <Link href={`/projects/${slug.current}`} className={styles.projectThumbnail}>
                  <div className={styles.overlay}>
                    <span>View project</span>
                  </div>
                  <ImageTag
                    src={`${coverImage?.asset?.url}`}
                    alt="project Image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    blurDataURL={coverImage?.asset?.metadata?.lqip}
                  />
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
