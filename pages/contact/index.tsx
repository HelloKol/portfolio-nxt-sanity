import React from "react";
import { GetStaticProps } from "next";
import groq from "groq";
// @ts-ignore
import GoogleMapReact from "google-map-react";
import { ContactForm, Container, Main, Section, Seo } from "@/components";
import { useTheme } from "@/providers";
import { SEO } from "@/types";
import { sanityClient } from "@/lib";
import styles from "./styles.module.scss";

interface Props {
  page: {
    title: string;
    contactForm: {
      title: string;
      successMessage: string;
    };
    seo: SEO;
  };
}

export default function Page({ page }: Props): JSX.Element | null {
  const { theme } = useTheme();
  if (!page) return null;
  const { title, contactForm, seo } = page;
  const isDarkMode = theme === "dark-theme";
  const defaultProps = {
    center: {
      lat: 51.514715,
      lng: -0.096448,
    },
    zoom: 14,
    options: {
      styles: [
        {
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
        {
          stylers: [
            {
              color: "#131314",
            },
          ],
        },
        {
          featureType: "water",
          stylers: [
            {
              color: "#131313",
            },
            {
              lightness: 7,
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "on",
            },
            {
              lightness: 25,
            },
          ],
        },
      ],
    },
  };

  return (
    <>
      <Seo seo={seo} />

      <Main withPadding>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            {title && <h1 className={styles.title}>{title}</h1>}
          </Container>

          <ContactForm data={contactForm} />

          <div className={styles.googleMapwrapper}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              options={defaultProps.options}
            />
          </div>
        </Section>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    let page = await sanityClient.fetch(groq`
      *[_type == "contact" && !(_id in path('drafts.**'))][0] {
          title,
          contactForm,
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
