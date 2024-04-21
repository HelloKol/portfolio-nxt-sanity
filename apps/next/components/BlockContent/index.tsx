import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyCode, ImageTag } from '@/components';

interface Props {
  value: PortableTextBlock;
}

interface CodeProps {
  value: {
    code: string;
    language: string;
  };
}

const Code = ({ value }: CodeProps) => {
  if (!value || !value.code) return null;
  const { language, code } = value;

  return (
    <div
    // className="relative group"
    >
      <SyntaxHighlighter
        language={language || 'text'}
        // style={solarizedlight}
        customStyle={{
          background: '#1C1E20',
          borderRadius: `10px`,
          padding: `20px`
        }}
      >
        {code}
      </SyntaxHighlighter>

      <div className="absolute top-[20px] right-[20px]">
        <CopyCode code={code} />
      </div>
    </div>
  );
};

const serializers = {
  types: {
    code: Code,
    image: ({ value }: any) => {
      const { asset } = value;
      return (
        <div
          style={{
            height: `600px`,
            margin: `0 0 30px 0`
          }}
        >
          <ImageTag
            src={`${asset?.url}`}
            alt="project Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={true}
            blurDataURL={asset?.metadata?.lqip}
          />
        </div>
      );
    },
    youtube: ({ value }: any) => {
      const { url } = value;
      return (
        <div
          style={{
            height: `600px`,
            margin: `0 0 30px 0`
          }}
        >
          <ReactPlayer width="100%" height="100%" url={url} playing={true} />
        </div>
      );
    }
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
