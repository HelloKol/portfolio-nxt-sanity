import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
import groq from "groq";
import SplitType from "split-type";
import {
  BlockContent,
  Container,
  Grid,
  Main,
  Section,
  Seo,
} from "@/components";
import { Project, SEO, Layout } from "@/types";
import { sanityClient, useGSAP, gsap } from "@/lib";
import { PROJECT_QUERY } from "@/services/queries";
import { PortableText } from "@portabletext/react";
import { RainbowButton } from "@/components/RainbowButton";
import ContentLayout from "@/components/ContentLayout";

interface Page {
  page: Project & {
    layout: Layout[];
    seo: SEO;
  };
  work: Project[];
}

export default function Page({ page, work }: Page): JSX.Element | null {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!page) return null;
  const {
    title,
    excerpt,
    body,
    slug,
    tools,
    type,
    cta,
    coverImage,
    seo,
    layout,
  } = page;
  const currentIndex = work.findIndex(
    (item) => item.slug.current === slug.current,
  );
  const nextIndex = currentIndex < work.length - 1 ? currentIndex + 1 : 0;

  useGSAP(
    () => {
      const split = new SplitType(titleRef.current!, { types: "lines" });
      const lines = split.lines;

      gsap.fromTo(
        lines,
        {
          y: 150,
          visibility: "visible",
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        },
      );
    },
    { scope: titleRef, dependencies: [slug.current] },
  );
  useGSAP(
    () => {
      const article = articleRef.current;
      if (!article) return;

      gsap.set(article, { visibility: "visible" });

      gsap.fromTo(
        article,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.4 },
      );

      return () => {
        gsap.set(article, { clearProps: "all" });
      };
    },
    { scope: articleRef, dependencies: [slug.current] },
  );

  useGSAP(
    () => {
      const container = imageContainerRef.current;
      if (!container) return;

      gsap.set(container, {
        width: "80%",
        xPercent: -50,
        left: "50%",
      });

      gsap.to(container, {
        width: "100%",
        xPercent: 0,
        left: "0",
        duration: 1.2,
        ease: "power4.inOut",
      });
    },
    { scope: imageContainerRef, dependencies: [slug.current] },
  );

  const renderCta = () => {
    if (!cta) return null;

    return cta.map(
      (
        item: {
          title: string;
          url: string;
        },
        index: number,
      ) => {
        return (
          <RainbowButton key={index}>
            <Link href={`${item.url}`} target="_blank">
              {item.title}
            </Link>
          </RainbowButton>
        );
      },
    );
  };

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section>
          <Container>
            {title && (
              <h1
                key={slug.current}
                className={
                  "project-title invisible mb-4 text-3xl uppercase md:mb-8"
                }
              >
                <span ref={titleRef} className="block overflow-hidden">
                  {title}
                </span>
              </h1>
            )}

            {excerpt && (
              <div className="mb-8 text-lg md:mb-16 md:w-10/12 md:text-3xl lg:w-8/12">
                <article ref={articleRef} className="project-excerpt invisible">
                  <PortableText value={excerpt} />
                </article>
              </div>
            )}

            <div
              ref={imageContainerRef}
              className="relative mb-16 h-80 w-full max-w-full overflow-hidden rounded-lg transition-[height] sm:h-94 md:h-[500px] lg:h-[700px] xl:h-[850px]"
            >
              <Image
                src={coverImage?.asset?.url}
                alt="Project Image"
                layout="fill"
                objectFit="cover"
                priority
                blurDataURL={coverImage?.asset?.metadata?.lqip}
              />
            </div>

            <Grid>
              {body && (
                <article
                  className={"project-body col-span-12 text-xl 2xl:col-span-7"}
                >
                  <BlockContent value={body} />
                </article>
              )}

              <div
                className={
                  "col-span-12 mb-16 flex w-fit flex-col gap-4 2xl:col-start-9 2xl:col-end-13 2xl:row-start-1 2xl:mt-auto 2xl:mb-8 2xl:pt-30"
                }
              >
                {renderCta()}
              </div>

              {type && (
                <div
                  className={
                    "col-span-6 2xl:col-start-9 2xl:col-end-11 2xl:row-start-1"
                  }
                >
                  <p className={"text-sm md:text-base"}>Services</p>
                  {type.map((item, index) => (
                    <p
                      key={index}
                      className={"text-base md:text-lg lg:text-xl"}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}

              {tools && (
                <div
                  className={
                    "col-span-6 2xl:col-start-11 2xl:col-end-13 2xl:row-start-1"
                  }
                >
                  <p className={"text-sm md:text-base"}>Technology</p>
                  {tools.map((item, index) => (
                    <p
                      key={index}
                      className={"text-base md:text-lg lg:text-xl"}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </Grid>

            <ContentLayout layout={layout} />
          </Container>
        </Section>

        {nextIndex !== null && (
          <Section withMargin={false}>
            <Container>
              <Grid>
                <Link
                  href={`/projects/${work[nextIndex].slug.current}`}
                  className={"col-span-12"}
                >
                  <Grid>
                    <div className="relative col-span-12 h-[240px] w-full overflow-hidden rounded-lg transition-[height] sm:col-span-6 sm:h-[220px] md:h-[250px] lg:h-[350px] xl:h-[430px] 2xl:h-[550px]">
                      <Image
                        src={work[nextIndex].coverImage?.asset?.url}
                        alt="Project Image"
                        layout="fill"
                        objectFit="cover"
                        priority
                        blurDataURL={
                          work[nextIndex].coverImage?.asset?.metadata?.lqip
                        }
                      />
                    </div>

                    <h2 className="next-project-title col-span-12 uppercase sm:col-span-6 sm:mt-auto">
                      <span className="block">Next</span>
                      <span className="block">Project</span>
                    </h2>
                  </Grid>
                </Link>
              </Grid>
            </Container>
          </Section>
        )}
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

  let page = await sanityClient.fetch(PROJECT_QUERY, {
    slug,
  });

  let work = await sanityClient.fetch(groq`
  *[_type == "work" && !(_id in path('drafts.**'))] {
    slug,
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
  }`);

  // render the 404 if there is an api error
  if (!page)
    return {
      notFound: true,
    };

  return {
    props: {
      page,
      work,
    },
    revalidate: 30,
  };
}
