export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  createdDate: string;
  type: string[];
  tools: string[];
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
  __typename: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: {
    __typename: string;
    data: {
      __typename: string;
      attributes: {
        __typename: string;
        url: string;
        caption: string;
      };
    };
  };
}
