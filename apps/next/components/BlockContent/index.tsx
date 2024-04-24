import React, { useEffect, useState } from 'react';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import { CodeBlock, VideoPlayerCustom, VideoPlayerYoutube, BlockContentImage } from '@/components';

interface Props {
  value: PortableTextBlock;
}

const serializers = {
  types: {
    code: ({ value }: any) => <CodeBlock value={value} />,
    videoLink: ({ value }: any) => <VideoPlayerCustom value={value} />,
    image: ({ value }: any) => <BlockContentImage value={value} />,
    youtube: ({ value }: any) => <VideoPlayerYoutube value={value} />
  }
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
