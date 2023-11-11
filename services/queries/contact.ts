import { gql } from "@apollo/client";
import SEO from "../seo";

const CONTACT_QUERY = gql`
  query {
    contact {
      data {
        attributes {
          Title
          ${SEO}
        }
      }
    }
  }
`;

export default CONTACT_QUERY;
