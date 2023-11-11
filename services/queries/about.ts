import { gql } from "@apollo/client";
import SEO from "../seo";

const ABOUT_QUERY = gql`
  query {
    about {
      data {
        attributes {
          Title
          Name
          Description
          FeatureImage {
            data {
              attributes {
                url
                caption
              }
            }
          }
          SkillsTitle
          Skills
          ${SEO}
        }
      }
    }
  }
`;

export default ABOUT_QUERY;
