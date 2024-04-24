import { PortableTextBlock } from '@portabletext/types';

export interface Project {
  _id: string;
  title: string;
  excerpt: PortableTextBlock;
  body: PortableTextBlock;
  slug: {
    current: string;
  };
  createdDate: string;
  type: string[];
  tools: string[];
  rank: number;
  color: {
    value: string;
  };
  cta: {
    title: string;
    url: string;
    _type: string;
  }[];
  coverImage: Media;
  featuredImage: Media;
}

export interface Media {
  _type: string;
  asset: {
    _id: string;
    url: string;
    metadata: {
      lqip: string;
    };
  };
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string;
  tags?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
}
