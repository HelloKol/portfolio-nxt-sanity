import React from "react";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { Container, ImageTag, Main, Section, Button } from "@/components";
import { useTheme } from "@/providers";
import { ABOUT_QUERY } from "@/services/queries";
import { SEO, SingleMedia } from "@/types";
import { apolloClient } from "@/utils";
import styles from "./styles.module.scss";
import groq from "groq";
import { sanityClient } from "@/lib";

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
  const { title, name, body, featuredImage, skillsTitle, skills, seo } = page;
  const isDarkMode = theme === "dark-theme";

  const renderSkills = () =>
    skills &&
    skills.map((item: string, index: number) => (
      <li key={index} className={styles.skillItem}>
        <div className={styles.bubble}>{item}</div>
      </li>
    ));

  return (
    <>
      <Main>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            <div className={styles.left}>
              {featuredImage && (
                <div className={styles.imageWrapper}>
                  <ImageTag
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
                <article className={styles.bodyCopy}>
                  {name && <h3>{name}</h3>}
                  <PortableText value={body} />
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
              {skillsTitle && (
                <p className={styles.skillsTitle}>{skillsTitle}</p>
              )}
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
    let page = await sanityClient.fetch(groq`
      *[_type == "about" && !(_id in path('drafts.**'))][0] {
          title,
          name,
          body,
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
          skillsTitle,
          skills,
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
    }`);

    // render the 404 if there is an api error
    if (!page) {
      return {
        notFound: true,
      };
    }

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
