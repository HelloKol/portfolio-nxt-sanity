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

  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const articleRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Text reveal
      const split = new SplitType(titleRef.current!, { types: "chars" });
      const chars = split.chars;

      gsap.fromTo(
        chars,
        {
          y: 150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
        },
      );
    },
    { scope: titleRef, dependencies: [slug.current] },
  );

  useGSAP(
    () => {
      gsap.set(containerRef.current, { scaleX: 1 });
      gsap.set(imageRef.current, {
        scale: 1.5,
        filter: "blur(50px)",
      });

      // Image block reveal
      const tl = gsap.timeline();
      tl.to(
        containerRef.current,
        {
          duration: 1,
          scaleX: 0,
          transformOrigin: "left",
          ease: "power2.inOut",
        },
        "+=0.2",
      ).to(
        imageRef.current,
        {
          duration: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
        },
        "-=1",
      );
    },
    { scope: containerRef, dependencies: [slug.current] },
  );

  useGSAP(
    () => {
      const articleChildren = gsap.utils.toArray(
        articleRef?.current?.children!,
      );

      const tl = gsap.timeline({
        delay: 0.2,
        scrollTrigger: {
          trigger: articleRef?.current,
          start: "top bottom", // when the top of the trigger hits the bottom of the viewport
          end: "bottom center", // end after scrolling 500px beyond the start
          onEnter: () => tl.play(),
        },
      });

      tl.fromTo(
        articleChildren,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: {
            each: 0.2,
          },
        },
      );
    },
    { scope: articleRef, dependencies: [slug.current] },
  );

  useGSAP(
    () => {
      const projectInfo = gsap.utils.toArray(
        projectInfoRef?.current?.children!,
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectInfoRef?.current,
          start: "top bottom", // when the top of the trigger hits the bottom of the viewport
          end: "bottom center", // end after scrolling 500px beyond the start
          onEnter: () => tl.play(),
        },
      });

      tl.fromTo(
        projectInfo,
        {
          x: -15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          delay: 0.2,
          stagger: {
            each: 0.3,
            ease: "power2.inOut",
          },
        },
      );
    },
    { scope: projectInfoRef, dependencies: [slug.current] },
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
                // ref={titleRef}
                key={slug.current}
                className={"project-title mb-4 text-3xl uppercase md:mb-8"}
              >
                {title}
              </h1>
            )}

            {excerpt && (
              <article className="project-excerpt mb-8 text-lg md:mb-16 md:w-10/12 md:text-3xl lg:w-8/12">
                <PortableText value={excerpt} />
              </article>
            )}

            <div className="relative mb-16 h-80 w-full max-w-full overflow-hidden rounded-lg transition-[height] sm:h-94 md:h-[500px] lg:h-[700px] xl:h-[850px]">
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
              {/* <div
                ref={projectInfoRef}
                key={slug.current}
                className={styles.projectInfoWrapper}
              > */}
              {/* </div> */}

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
                  ref={projectInfoRef}
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
                  ref={projectInfoRef}
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
