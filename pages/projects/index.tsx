import React, { useContext } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  Container,
  Grid,
  ImageTag,
  Main,
  ProjectFilter,
  Section,
} from "@/components";
import { Context } from "@/contexts/Context";
import { useWindowDimension } from "@/hooks";
import { useTheme } from "@/providers";
import { ALL_PROJECT_QUERY, WORK_QUERY } from "@/services/queries";
import { Project, SEO } from "@/types";
import { apolloClient } from "@/utils";
import styles from "./styles.module.scss";

interface Page {
  page: {
    Title: string;
    Projects: Project[];
    seo: SEO;
  };
}

export default function Projects({ page }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const { projectFilterTag, setProjectFilterTag } = useContext(Context);
  const { isMobile, isMobileLarge, isTablet } = useWindowDimension();
  const { Title, Projects, seo } = page;
  const isDarkMode = theme === "dark-theme";

  const filteredData = Projects.filter(
    (item) =>
      item?.attributes?.Tags &&
      item.attributes.Tags.some((tag) =>
        tag.toLowerCase().includes(projectFilterTag.toLocaleLowerCase())
      )
  );

  return (
    <>
      <Head>
        <title>{seo.metaTitle || Title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            <Grid>
              {Title && (
                <h1
                  className={`${styles.title} ${
                    isDarkMode ? styles.darkMode : styles.lightMode
                  }`}
                >
                  {Title}
                </h1>
              )}
              <div className={styles.filterWrap}>
                <div className={styles.projectView}>
                  <p>Change view</p>
                  <button
                    className={`${styles.filterBtn} ${styles.activeFilterBtn}`}
                    disabled
                  >
                    Grid
                  </button>
                  <button
                    className={`${styles.filterBtn} ${styles.inActiveFilterBtn}`}
                    disabled
                  >
                    List
                  </button>
                </div>

                <div className={styles.filterList}>
                  <p>Type</p>
                  <button
                    className={`${styles.filterBtn} ${
                      projectFilterTag === "" && styles.activeFilterBtn
                    }`}
                    onClick={() => setProjectFilterTag("")}
                  >
                    All
                  </button>
                  <button
                    className={`${styles.filterBtn} ${
                      projectFilterTag === "design" && styles.activeFilterBtn
                    }`}
                    onClick={() => setProjectFilterTag("design")}
                  >
                    Design
                  </button>
                  <button
                    className={`${styles.filterBtn} ${
                      projectFilterTag === "web" && styles.activeFilterBtn
                    }`}
                    onClick={() => setProjectFilterTag("web")}
                  >
                    Web
                  </button>
                </div>
              </div>
              {isMobile || isMobileLarge || isTablet ? (
                <ul className={styles.projectFeedMobile}>
                  {filteredData.map((item, index) => {
                    const { attributes } = item;
                    const { Title, TitleColor, slug, Tags, Thumbnail } =
                      attributes;

                    return (
                      <Link
                        key={index}
                        href={`/projects/${slug}`}
                        className={styles.projectItem}
                      >
                        {Thumbnail && (
                          <div className={styles.thumbmailImage}>
                            <ImageTag
                              src={`${Thumbnail?.data?.attributes?.url}`}
                              alt="project Image"
                              layout="fill"
                              objectFit="cover"
                              quality={100}
                            />
                          </div>
                        )}
                        <div className={styles.projectTitleWrap}>
                          {Title && (
                            <h1
                              className={styles.projectTitle}
                              style={{
                                color: TitleColor,
                              }}
                            >
                              {Title}
                            </h1>
                          )}
                          <div className={styles.projectTags}>
                            {Tags &&
                              Tags.map((item, index) => {
                                return <p key={index}>{item}</p>;
                              })}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </ul>
              ) : (
                <ul className={styles.projectFeedDesktop}>
                  <Grid>
                    {filteredData.map((item: any, index: any) => {
                      const { attributes } = item;
                      const { Title, TitleColor, slug, Thumbnail } = attributes;

                      return (
                        <Link
                          key={index}
                          href={`/projects/${slug}`}
                          className={styles.projectItem}
                        >
                          {Thumbnail && (
                            <div className={styles.thumbmailImage}>
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
                            </div>
                          )}
                          {Title && (
                            <h1
                              className={styles.projectTitle}
                              style={{
                                color: TitleColor,
                              }}
                            >
                              {Title}
                            </h1>
                          )}
                        </Link>
                      );
                    })}
                  </Grid>
                </ul>
              )}
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
    const { data: pageData } = await apolloClient.query({
      query: WORK_QUERY,
    });

    const { data } = await apolloClient.query({
      query: ALL_PROJECT_QUERY,
    });

    // render the 404 if there is no page in cms
    if (!pageData)
      return {
        notFound: true,
      };

    let page = pageData.work.data.attributes;
    page = JSON.parse(JSON.stringify(page));
    const Title = page.Title;
    const seo = page.seo;

    let Projects = data.projects.data;
    Projects = JSON.parse(JSON.stringify(Projects));

    return {
      props: {
        page: {
          Title,
          Projects,
          seo,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
