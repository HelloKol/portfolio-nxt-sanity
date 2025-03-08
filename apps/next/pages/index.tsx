import React from "react";
import { GetStaticProps } from "next/types";
import { PortableTextBlock } from "@portabletext/types";
import { AboutSection, HeroSection, Main, Seo } from "@/components";
import { sanityClient } from "@/lib";
import { Project, SEO } from "@/types";
import { HOME_QUERY } from "@/services/queries";
// import { ReactLenis } from "lenis/react";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import WorkSection from "@/components/WorkSection";

interface Page {
  page: {
    heroSection: {
      title: string;
    };
    aboutSection: {
      title: string;
      body: PortableTextBlock;
      cvLink: string;
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
    // <ReactLenis root>
    <>
      <Seo seo={seo} />
      <Main withPadding={false}>
        <HeroSection data={heroSection} />
        <AboutSection data={aboutSection} />
        <WorkSection data={workSection} />
        <SkillsSection />
        <ContactSection />
      </Main>
    </>
    // </ReactLenis>
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
