import React from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
import ReactMarkdown from "react-markdown";
import { Button, Container, Grid, ImageTag, Main, Section } from "@/components";
import { useTheme } from "@/providers";
import {
  ALL_PROJECT_QUERY,
  SINGLE_PROJECT_QUERY,
  WORK_QUERY,
} from "@/services/queries";
import { Project, SEO } from "@/types";
import { apolloClient } from "@/utils";
import styles from "./styles.module.scss";

interface Page {
  page: Project;
  Projects: Project[];
}

export default function Project({ page, Projects }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const { attributes } = page;
  const {
    Title,
    slug,
    BodyCopy,
    ProjectCreated,
    Tags,
    Tools,
    CtaProjectTitle,
    CtaProjectLink,
    CtaCodeTitle,
    CtaCodeLink,
    Thumbnail,
    FeatureImage,
  } = attributes;
  const isDarkMode = theme === "dark-theme";
  const currentIndex = Projects.findIndex(
    (item) => item.attributes.slug === slug
  );
  const nextIndex = currentIndex < Projects.length - 1 ? currentIndex + 1 : 0;

  const renderFeatureImage = () =>
    FeatureImage &&
    FeatureImage.data.map((item, index) => {
      const { attributes } = item;

      return (
        <div key={index} className={styles.projectImage}>
          {attributes && (
            <ImageTag
              src={`${attributes.url}`}
              alt="project Image"
              layout="responsive"
              width={1000}
              height={1000}
              quality={100}
            />
          )}
        </div>
      );
    });

  return (
    <>
      <Head>
        <title>{Title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container className={styles.container} isFluid={false}>
            {Title && <h1 className={styles.title}>{Title}</h1>}
          </Container>

          {Thumbnail && (
            <div className={styles.thumbmailImage}>
              <ImageTag
                src={`${Thumbnail?.data?.attributes?.url}`}
                alt="project Image"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority={true}
              />
            </div>
          )}

          <Container className={styles.containerProjectInfo} isFluid={false}>
            <Grid>
              <div className={styles.projectInfo}>
                {ProjectCreated && (
                  <>
                    <span className={styles.redInfo}>DATE</span>
                    <span className={styles.whiteInfo}> {ProjectCreated}</span>
                  </>
                )}
                {Tags && (
                  <>
                    <span className={styles.redInfo}>ROLE</span>
                    {Tags.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </>
                )}
                {Tools && (
                  <>
                    <span className={styles.redInfo}>TOOLS</span>
                    {Tools.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </>
                )}
              </div>

              <article className={styles.bodyCopy}>
                <ReactMarkdown>{BodyCopy}</ReactMarkdown>
              </article>

              <div className={styles.btnWrap}>
                {CtaProjectLink && (
                  <Button
                    className={styles.visitProjectLink}
                    href={`${CtaProjectLink}`}
                    variant="primary"
                    newTab
                    withSvg
                  >
                    {CtaProjectTitle}
                  </Button>
                )}

                {CtaCodeLink && (
                  <Button
                    className={styles.visitCodeLink}
                    href={`${CtaCodeLink}`}
                    variant="primary"
                    newTab
                    withSvg
                  >
                    {CtaCodeTitle}
                  </Button>
                )}
              </div>

              {renderFeatureImage()}

              <div className={styles.nextProjectWrapper}>
                <div className={styles.divider} />
                <p>Next</p>
                {nextIndex !== null && (
                  <Button
                    className={styles.nextProjectLink}
                    href={`/projects/${Projects[nextIndex].attributes.slug}`}
                    variant="text"
                  >
                    {Projects[nextIndex].attributes.Title}
                  </Button>
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
  const { data } = await apolloClient.query({ query: ALL_PROJECT_QUERY });

  const paths = data.projects.data.map((project: any) => {
    return { params: { slug: project.attributes.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

type pathParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({
  params,
}: pathParams): Promise<GetStaticPropsResult<Page>> {
  const { slug } = params;

  const { data } = await apolloClient.query({
    query: SINGLE_PROJECT_QUERY,
    variables: { slugUrl: slug },
  });

  const { data: projects } = await apolloClient.query({
    query: ALL_PROJECT_QUERY,
  });

  // render the 404 if there is an api error
  if (!data)
    return {
      notFound: true,
    };

  let page = data.projects.data[0];
  page = JSON.parse(JSON.stringify(page));

  let Projects = projects.projects.data;
  Projects = JSON.parse(JSON.stringify(Projects));

  return {
    props: {
      page,
      Projects,
    },
    revalidate: 30,
  };
}
