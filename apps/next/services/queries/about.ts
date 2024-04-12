import groq from "groq";
import SEO from "../seo";

const ABOUT_QUERY = groq`
*[_type == "about" && !(_id in path('drafts.**'))][0] {
    title,
    name,
    body,
    featuredImage {
      _type,
      asset->{
        _id,
        url,
        metadata{
          lqip
        }
      }
    },
    skillsTitle,
    skills,
    ${SEO}
}`;

export default ABOUT_QUERY;
