import React from "react";
import { GetStaticProps } from "next/types";
import { PortableTextBlock } from "@portabletext/types";
import groq from "groq";
import { AboutSection, HeroSection, Main, WorkSection } from "@/components";
import { sanityClient } from "@/lib";
import { Project, SEO } from "@/types";

interface Page {
  page: {
    heroSection: {
      title: string;
    };
    aboutSection: {
      title: string;
      body: PortableTextBlock;
    };
    workSection: {
      title: string;
      cta: {
        title: string;
        _type: string;
        content: {
          slug: string;
        };
      };
      workList: Project[];
    };
    seo: SEO;
  };
}

export default function Home({ page }: Page): JSX.Element | null {
  if (!page) return null;
  const { heroSection, aboutSection, workSection, seo } = page;

  return (
    <>
      <Main>
        <HeroSection data={heroSection} />

        <AboutSection data={aboutSection} />

        <WorkSection data={workSection} />
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(groq`
    *[_type == "home" && !(_id in path('drafts.**'))][0] {
        heroSection {
          title
        },
        aboutSection {
          title,
          body
        },
        workSection {
          title,
          cta {
            title,
            _type,
            content -> {
              slug
            }
          },
          workList[]->{
            _id,
            title,
            slug,
            createdDate,
            type,
            coverImage {
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
