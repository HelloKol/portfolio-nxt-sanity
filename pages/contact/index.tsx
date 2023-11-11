import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import GoogleMapReact from "google-map-react";
import { Button, Container, Main, Section } from "@/components";
import { useTheme } from "@/providers";
import { CONTACT_QUERY } from "@/services/queries";
import { Project, SEO } from "@/types";
import { apolloClient } from "@/utils";
import styles from "./styles.module.scss";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().min(10).required(),
});

interface Page {
  page: {
    Title: string;
    Projects: Project[];
    seo: SEO;
  };
}

export default function ContactForm({ page }: Page): JSX.Element | null {
  if (!page) return null;
  const { theme } = useTheme();
  const { Title, seo } = page;
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      console.log("Message sent!");
    } else {
      console.log("Failed to send message.");
    }
  };

  return (
    <>
      <Head>
        <title>{seo.metaTitle || Title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main withPadding>
        <Section
          className={`${styles.section} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
        >
          <Container isFluid={false}>
            <h1 className={styles.title}>Contact me</h1>
          </Container>

          <Container isFluid={false}>
            <div className={styles.formWrap}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <p>MESSAGE ME THROUGH THIS FORM</p>
                <div className={styles.inputWrap}>
                  <div className={styles.group}>
                    <input type="text" {...register("name")} required />
                    <span className={styles.bar} />
                    <label>Name</label>
                  </div>
                </div>
                <div className={styles.inputWrap}>
                  <div className={styles.group}>
                    <input type="text" {...register("email")} required />
                    <span className={styles.bar} />
                    <label>Email</label>
                  </div>
                  <p className={styles.error}>{errors.email?.message}</p>
                </div>
                <div className={styles.inputWrap}>
                  <div className={styles.group}>
                    <textarea rows={9} {...register("message")} required />
                    <span className={styles.bar} />
                    <label>Message</label>
                  </div>
                  <p className={styles.error}>{errors.message?.message}</p>
                </div>

                <Button
                  className={styles.btnSubmit}
                  type="submit"
                  variant="primary"
                  withSvg
                >
                  Send Message
                </Button>
              </form>
            </div>
          </Container>

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
    const { data } = await apolloClient.query({
      query: CONTACT_QUERY,
    });

    // render the 404 if there is an api error
    if (!data) {
      return {
        notFound: true,
      };
    }

    let page = data.contact.data.attributes;
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
