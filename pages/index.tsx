import React from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next/types";
import ReactMarkdown from "react-markdown";
import { Button, Container, Grid, ImageTag, Main, Section } from "@/components";
import { useTheme } from "@/providers";
import { HOME_QUERY } from "@/services/queries";
import { Project, SEO } from "@/types";
import { apolloClient } from "@/utils";
import styles from "./_landingPage/styles.module.scss";

interface Page {
  page: {
    Title: string;
    HeroTitle: string;
    AboutTitle: string;
    AboutBodycopy: string;
    WorkTitle: string;
    WorkCta: string;
    projects: {
      data: Project[];
    };
    seo: SEO;
  };
}

export default function Home({ page }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const {
    Title,
    HeroTitle,
    AboutTitle,
    AboutBodycopy,
    WorkTitle,
    WorkCta,
    projects,
    seo,
  } = page;
  const { data: Projects }: { data: Project[] } = projects;

  const heroTitleSplit = HeroTitle.split(" ");
  const heroTitle1 = heroTitleSplit.slice(0, 2).join(" ");
  const heroTitle2 = heroTitleSplit[2];
  const heroTitle3 = heroTitleSplit[3];
  const projectLength = Projects
    ? Projects.length < 10
      ? `0${Projects.length}`
      : Projects.length
    : `00`;
  const isDarkMode = theme === "dark-theme";

  const renderProjects = () =>
    Projects &&
    Projects.slice(0, 4).map((item, index) => {
      const { attributes } = item;
      const { Title, slug, ProjectCreated, Tags, Thumbnail } = attributes;
      const currentIndex = index < 10 ? `0${index + 1}` : index + 1;

      return (
        <div key={index} className={styles.projectFeedItem}>
          <Grid>
            <p className={styles.projectIndex}>
              {currentIndex}-{projectLength}
            </p>
            <h3 className={styles.projectTitle}>
              <Link
                href={`/projects/${slug}`}
                className={styles.projectThumbnail}
              >
                {Title}
              </Link>
            </h3>
            <div className={styles.projectTags}>
              <p className={styles.projectCreated}>{ProjectCreated}</p>
              <div className={styles.tags}>
                {Tags && Tags.map((item, index) => <p key={index}>{item}</p>)}
              </div>
            </div>
            {Thumbnail && (
              <Link
                href={`/projects/${slug}`}
                className={styles.projectThumbnail}
              >
                <div className={styles.overlay}>
                  <span>View project</span>
                </div>
                <ImageTag
                  src={`${Thumbnail?.data?.attributes?.url}`}
                  alt="project Image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Link>
            )}
          </Grid>
        </div>
      );
    });

  return (
    <>
      <Head>
        <title>{seo.metaTitle || Title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Section
          className={`${styles.heroSection} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            {HeroTitle && (
              <h1 className={styles.title}>
                <span className={styles.titleLeft}>{heroTitle1}</span>
                <span className={styles.titleRight}>{heroTitle2}</span>
                <span className={styles.titleCenter}>{heroTitle3}</span>
              </h1>
            )}
          </Container>
        </Section>

        <Section
          className={`${styles.aboutSection} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            <Grid>
              {AboutTitle && <h2 className={styles.title}>{AboutTitle}</h2>}
              {AboutBodycopy && (
                <article className={styles.bodyCopy}>
                  <ReactMarkdown>{AboutBodycopy}</ReactMarkdown>
                </article>
              )}
              <Button
                className={styles.downloadCvBtn}
                href={`/static/pdf/updated_cv.pdf`}
                variant="primary"
                download={true}
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
            </Grid>
          </Container>
        </Section>

        <Section
          className={`${styles.workSection} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            <Grid>
              {WorkTitle && <h2 className={styles.title}>{WorkTitle}</h2>}
              {WorkCta && (
                <Button
                  className={styles.discoverBtn}
                  href={`/projects`}
                  variant="primary"
                  withSvg
                >
                  {WorkCta}
                </Button>
              )}
              <ul className={styles.projectFeed}>{renderProjects()}</ul>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await apolloClient.query({
      query: HOME_QUERY,
    });

    // render the 404 if there is an api error
    if (!data) {
      return {
        notFound: true,
      };
    }

    let page = data.home.data.attributes;
    page = JSON.parse(JSON.stringify(page));

    return {
      props: {
        page,
      },
      revalidate: 30,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
