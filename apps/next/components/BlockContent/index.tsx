import React, { useEffect, useState } from "react";
import { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { env } from "@/utils/env";
import { getSanityVideoUrlFromBlock } from "@/lib";
import { CodeBlock, VideoPlayerYoutube, BlockContentImage } from "@/components";

interface Props {
  value: PortableTextBlock[];
}

const serializers = {
  types: {
    code: ({ value }: any) => <CodeBlock value={value} />,
    videoFile: ({ value }: any) => {
      const src = getSanityVideoUrlFromBlock(
        value,
        env.NEXT_PUBLIC_SANITY_STUDIO_ID,
        env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
      );
      if (!src) return null;

      return (
        <figure className="my-8">
          <video
            className="w-full rounded-lg"
            controls={value?.controls ?? true}
            autoPlay={Boolean(value?.autoplay)}
            loop={Boolean(value?.loop)}
            muted={Boolean(value?.muted)}
            playsInline
            preload="metadata"
            poster={value?.poster?.asset?.url}
          >
            <source src={src} />
          </video>
          {value?.caption ? (
            <figcaption className="mt-2 text-sm opacity-80">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    image: ({ value }: any) => <BlockContentImage value={value} />,
    youtube: ({ value }: any) => <VideoPlayerYoutube value={value} />,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="font-body mb-5 max-w-[940px] text-xl">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="font-heading-regular mb-4 max-w-[650px] text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-heading-regular max-w-[650px]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-heading-regular max-w-[650px]">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-heading-regular max-w-[650px]">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-body mb-8 ml-4 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-body mb-8 ml-4 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="font-body text-xl">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="font-body text-xl">{children}</li>
    ),
  },
};

export default function BlockContent({ value }: Props): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!value) return null;
  if (!isMounted) return null;

  // @ts-ignore
  return <PortableText value={value} components={serializers} />;
}
