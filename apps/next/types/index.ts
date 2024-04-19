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
  coverImage: {
    _type: string;
    asset: {
      _id: string;
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  featuredImage: {
    _type: string;
    asset: {
      _id: string;
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
}

export interface SingleMedia {
  data: {
    attributes: {
      url: string;
      caption: string;
    };
  };
}

export interface MultiMedia {
  data: {
    attributes: {
      url: string;
      caption: string;
    };
  }[];
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
