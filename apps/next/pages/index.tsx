import React from "react";
import { GetStaticProps } from "next/types";
import { PortableTextBlock } from "@portabletext/types";
import { AboutSection, HeroSection, Main, Seo } from "@/components";
import { sanityClient } from "@/lib";
import { Project, SEO } from "@/types";
import { HOME_QUERY, PROJECT_INDEX_LIST_QUERY } from "@/services/queries";
// import { ReactLenis } from "lenis/react";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";

interface Page {
  page: {
    heroSection: {
      title: string;
      body: Array<string>;
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
  allWorks: Project[];
}

export default function Home({ page, allWorks }: Page): JSX.Element | null {
  if (!page) return null;
  const { heroSection, aboutSection, workSection, seo } = page;

  return (
    // <ReactLenis root>
    <>
      <Seo seo={seo} />
      <Main withPadding={false}>
        <HeroSection data={heroSection} />
        <AboutSection data={aboutSection} />
        <WorkSection data={workSection} allWorks={allWorks} />
        <SkillsSection />
      </Main>
    </>
    // </ReactLenis>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(HOME_QUERY);
    let allWorks = await sanityClient.fetch(PROJECT_INDEX_LIST_QUERY);

    // render the 404 if there is an api error
    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        page,
        allWorks,
      },
      revalidate: 30,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
