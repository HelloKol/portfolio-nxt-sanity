import React from "react";
import { GetStaticProps } from "next";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import groq from "groq";
import { Section, Container, Main, Button, Seo } from "@/components";
import { sanityClient } from "@/lib";
import { SEO } from "@/types";
import styles from "./styles.module.scss";
import { RainbowButton } from "@/components/RainbowButton";
import Link from "next/link";

interface Props {
  page: {
    title: string;
    body: PortableTextBlock;
    cta: {
      _type: string;
      title: string;
      content: {
        slug: {
          current: string;
        };
      };
    };
    seo: SEO;
  };
}

export default function Page({ page }: Props): JSX.Element | null {
  if (!page) return null;
  const { title, body, cta, seo } = page;
  const { content } = cta;

  return (
    <>
      <Seo seo={seo} />

      <Main>
        <Section className={`text-center`}>
          <Container>
            {title && <h1 className={styles.title}>{title}</h1>}

            {body && (
              <article className={"font-body mb-4 text-xl text-black"}>
                <PortableText value={body} />
              </article>
            )}

            {cta && (
              <RainbowButton href={content.slug.current}>
                {cta.title}
              </RainbowButton>
            )}
          </Container>
        </Section>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(groq`
      *[_type == "pageNotFound" && !(_id in path('drafts.**'))][0] {
          title,
          body,
          cta {
            title,
            _type,
            content -> {
              slug
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
