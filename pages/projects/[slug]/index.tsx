import React from "react";
import { PortableText } from "@portabletext/react";
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
import { sanityClient } from "@/lib";
import groq from "groq";

interface Page {
  page: Project;
  work: Project[];
}

export default function Page({ page, work }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const {
    title,
    excerpt,
    slug,
    // body,
    createdDate,
    tools,
    type,
    cta,
    coverImage,
    featuredImage,
  } = page;
  const isDarkMode = theme === "dark-theme";
  const currentIndex = work.findIndex(
    (item) => item.slug.current === slug.current
  );
  const nextIndex = currentIndex < work.length - 1 ? currentIndex + 1 : 0;

  console.log("page", page);

  const renderCta = (cta: any) => {
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
          <Button
            key={index}
            className={styles.visitProjectLink}
            href={`${item.url}`}
            variant="primary"
            newTab
            withSvg
          >
            {item.title}
          </Button>
        );
      }
    );
  };

  return (
    <>
      <Main>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container className={styles.container} isFluid={false}>
            {title && <h1 className={styles.title}>{title}</h1>}
          </Container>

          {coverImage && (
            <div className={styles.thumbmailImage}>
              <ImageTag
                src={`${coverImage?.asset?.url}`}
                alt="project Image"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority={true}
                blurDataURL={coverImage?.asset?.metadata?.lqip}
              />
            </div>
          )}

          <Container className={styles.containerProjectInfo} isFluid={false}>
            <Grid>
              <div className={styles.projectInfo}>
                {createdDate && (
                  <>
                    <span className={styles.redInfo}>DATE</span>
                    <span className={styles.whiteInfo}> {createdDate}</span>
                  </>
                )}
                {type && (
                  <>
                    <span className={styles.redInfo}>ROLE</span>
                    {type.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </>
                )}
                {tools && (
                  <>
                    <span className={styles.redInfo}>TOOLS</span>
                    {tools.map((item, index) => (
                      <span key={index} className={styles.whiteInfo}>
                        {item}
                      </span>
                    ))}
                  </>
                )}
              </div>

              {excerpt && (
                <article className={styles.bodyCopy}>
                  <PortableText value={excerpt} />
                </article>
              )}

              {/* <div className={styles.btnWrap}>
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
              </div> */}

              <div className={styles.projectImage}>
                {featuredImage && (
                  <ImageTag
                    src={`${featuredImage?.asset?.url}`}
                    alt="project Image"
                    layout="responsive"
                    width={1000}
                    height={1000}
                    quality={100}
                    priority={true}
                    blurDataURL={featuredImage?.asset?.metadata?.lqip}
                  />
                )}
              </div>

              <div className={styles.nextProjectWrapper}>
                <div className={styles.divider} />
                <p>Next</p>
                {nextIndex !== null && (
                  <Button
                    className={styles.nextProjectLink}
                    href={`/projects/${work[nextIndex].slug.current}`}
                    variant="text"
                  >
                    {work[nextIndex].title}
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
  let work = await sanityClient.fetch(groq`
  *[_type == "work" && !(_id in path('drafts.**'))] {
      slug,
  }`);

  const paths = work.map((project: Project) => {
    return { params: { slug: project.slug.current } };
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

  let page = await sanityClient.fetch(
    groq`
    *[_type == "work" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
      _id,
      title,
      excerpt,
      body,
      slug,
      createdDate,
      type,
      tools,
      coverImage {
        _type,
        asset->{
          _id,
          url,
          metadata{
            lqip
          }
        }
      },
      featuredImage {
        _type,
        asset->{
          _id,
          url,
          metadata{
            lqip
          }
        }
      },
      cta[] {
        _type,
        title,
        url
      },
      seo {
        ...,
        image {
          _type,
          asset->{
            _id,
            url,
            metadata{
              lqip
            }
          }
        }
      }
    }`,
    {
      slug,
    }
  );

  let work = await sanityClient.fetch(groq`
  *[_type == "work" && !(_id in path('drafts.**'))] {
    title,
    slug,
  }`);

  // render the 404 if there is an api error
  if (!page)
    return {
      notFound: true,
    };

  page = JSON.parse(JSON.stringify(page));
  work = JSON.parse(JSON.stringify(work));

  return {
    props: {
      page,
      work,
    },
    revalidate: 30,
  };
}
