import { gql } from "@apollo/client";
import SEO from "../seo";

const HOME_QUERY = gql`
  query {
    home {
      data {
        attributes {
          Title
          HeroTitle
          AboutTitle
          AboutBodycopy
          WorkTitle
          WorkCta
          projects {
            data {
              attributes {
                Title
                slug
                BodyCopy
                ProjectCreated
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
          ${SEO}
        }
      }
    }
  }
`;

export default HOME_QUERY;
