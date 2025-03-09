import React, { useEffect, useState } from "react";
import { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import {
  CodeBlock,
  VideoPlayerCustom,
  VideoPlayerYoutube,
  BlockContentImage,
} from "@/components";

interface Props {
  value: PortableTextBlock;
}

const serializers = {
  types: {
    code: ({ value }: any) => <CodeBlock value={value} />,
    videoLink: ({ value }: any) => <VideoPlayerCustom value={value} />,
    image: ({ value }: any) => <BlockContentImage value={value} />,
    youtube: ({ value }: any) => <VideoPlayerYoutube value={value} />,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="font-body mb-8 max-w-[940px] text-xl">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="font-heading-regular mb-4 max-w-[650px] text-4xl md:text-5xl lg:text-6xl">
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
