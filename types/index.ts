export interface Project {
  attributes: {
    Title: string;
    TitleColor: string;
    slug: string;
    BodyCopy: string;
    ProjectCreated: string;
    Tags: string[];
    Tools: string[];
    CtaProjectTitle: string;
    CtaProjectLink: string;
    CtaCodeTitle: string;
    CtaCodeLink: string;
    Thumbnail: SingleMedia;
    FeatureImage: MultiMedia;
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
