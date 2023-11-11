import { gql } from "@apollo/client";

const ALL_PROJECT_QUERY = gql`
  query {
    projects {
      data {
        attributes {
          Title
          TitleColor
          slug
          Tags
          Thumbnail {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
      }
    }
  }
`;

const SINGLE_PROJECT_QUERY = gql`
  query ($slugUrl: String!) {
    projects(filters: { slug: { eq: $slugUrl } }) {
      data {
        attributes {
          Title
          slug
          BodyCopy
          ProjectCreated
          Tags
          Tools
          CtaProjectTitle
          CtaProjectLink
          CtaCodeTitle
          CtaCodeLink
          Thumbnail {
            data {
              attributes {
                url
                caption
              }
            }
          }
          FeatureImage {
            data {
              attributes {
                url
                caption
              }
            }
          }
        }
      }
    }
  }
`;

export { ALL_PROJECT_QUERY, SINGLE_PROJECT_QUERY };
