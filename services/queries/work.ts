import { gql } from "@apollo/client";
import SEO from "../seo";

const WORK_QUERY = gql`
  query {
    work {
      data {
        attributes {
          Title
          ${SEO}
        }
      }
    }
  }
`;

export default WORK_QUERY;
