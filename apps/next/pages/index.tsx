import React, { useRef } from "react";
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
// import { ReactLenis } from "lenis/react";
import Skills from "@/components/Skills";
import ContactSection from "@/components/ContactSection";
import WorkListModal from "@/components/WorkListModal";
import ScrollHighlightText from "@/components/ScrollHighlightText";
import ThreeDViewer from "@/components/ThreeViewer";
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
  const container = useRef<HTMLDivElement>(null);

  if (!page) return null;
  const { heroSection, aboutSection, workSection, seo } = page;

  return (
    // <ReactLenis root>
    <>
      <Seo seo={seo} />
      <Main withPadding={false}>
        <div ref={container}>
          <HeroSection data={heroSection} />
          <AboutSection data={aboutSection} />
          <Skills />
          <section id="work" className="mt-[200px]">
            <div className="container mx-auto">
              <h1 className="text-center text-xl">Work</h1>
              <WorkSection data={workSection} />
              <WorkListModal data={workSection} />
            </div>
          </section>
          <ContactSection />
        </div>
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
