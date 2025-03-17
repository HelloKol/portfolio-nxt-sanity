import groq from "groq";
import SEO from "../seo";

const HOME_QUERY = groq`
*[_type == "home" && !(_id in path('drafts.**'))][0] {
    heroSection {
      title,
      body
    },
    aboutSection {
      title,
      body,
      excerptLeft,
      excerptRight,
    },
    workSection {
      title,
      cta {
        title,
        _type,
        content -> {
          slug
        }
      },
      workList[]->{
        _id,
        title,
        excerpt,
        slug,
        createdDate,
        type,
        rank,
        coverImage {
          _type,
          asset->{
            _id,
            url,
            metadata{
              lqip
            }
          }
        }
      }
    },
    ${SEO}
}`;

export default HOME_QUERY;
