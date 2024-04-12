import React from "react";
import { GetStaticProps } from "next/types";
import { PortableTextBlock } from "@portabletext/types";
import {
  AboutSection,
  HeroSection,
  Main,
  WorkSection,
  Seo,
} from "@/components";
import { sanityClient } from "@/lib";
import { Project, SEO } from "@/types";
import { HOME_QUERY } from "@/services/queries";

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
          slug: {
            current: string;
          };
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
      <Seo seo={seo} />

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
    let page = await sanityClient.fetch(HOME_QUERY);

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
