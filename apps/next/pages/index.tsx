import React, { useRef } from "react";
import { GetStaticProps } from "next/types";
import { PortableTextBlock } from "@portabletext/types";
import {
  AboutSection,
  HeroSection,
  Main,
  WorkSection,
  Seo,
  Container,
} from "@/components";
import { sanityClient } from "@/lib";
import { Project, SEO } from "@/types";
import { HOME_QUERY } from "@/services/queries";
// import { ReactLenis } from "lenis/react";
import Skills from "@/components/Skills";
import ContactSection from "@/components/ContactSection";
import WorkListModal from "@/components/WorkListModal";

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
          <section id="work" className="mb-[100px] xl:mb-[150px]">
            <Container>
              <div className="mb-10 flex w-full items-center justify-between">
                <h1 className="text-center text-xl">Work</h1>
                <WorkListModal data={workSection} />
              </div>
              <WorkSection data={workSection} />
            </Container>
          </section>
          <Skills />
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
