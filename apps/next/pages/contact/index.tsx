import React, { useRef } from 'react';
import { GetStaticProps } from 'next';
import SplitType from 'split-type';
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import { ContactForm, Container, Main, Section, Seo } from '@/components';
import { useTheme } from '@/providers';
import { SEO } from '@/types';
import { sanityClient, useGSAP, gsap } from '@/lib';
import { env } from '@/utils/env';
import { CONTACT_QUERY } from '@/services/queries';
import styles from './styles.module.scss';

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
  const isDarkMode = theme === 'dark-theme';
  const textRef = useRef(null);
  const defaultProps = {
    center: {
      lat: 51.514715,
      lng: -0.096448
    },
    zoom: 14,
    options: {
      styles: [
        {
          stylers: [
            {
              visibility: 'simplified'
            }
          ]
        },
        {
          stylers: [
            {
              color: '#131314'
            }
          ]
        },
        {
          featureType: 'water',
          stylers: [
            {
              color: '#131313'
            },
            {
              lightness: 7
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              visibility: 'on'
            },
            {
              lightness: 25
            }
          ]
        }
      ]
    }
  };

  useGSAP(
    () => {
      // Text reveal
      const split = new SplitType(textRef.current, { type: 'chars' });
      const chars = split.chars;

      gsap.fromTo(
        chars,
        {
          y: 150,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: 'power4.out'
        }
      );
    },
    { scope: textRef }
  );

  return (
    <>
      <Seo seo={seo} />

      <Main withPadding>
        <Section className={`${styles.section} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
          <Container isFluid={false}>
            {title && (
              <h1 ref={textRef} className={styles.title}>
                {title}
              </h1>
            )}
          </Container>

          <ContactForm data={contactForm} />

          <div className={styles.googleMapwrapper}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
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
    let page = await sanityClient.fetch(CONTACT_QUERY);

    // render the 404 if there is an api error
    if (!page) {
      return {
        notFound: true
      };
    }

    page = JSON.parse(JSON.stringify(page));

    return {
      props: {
        page
      },
      revalidate: 30
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};
