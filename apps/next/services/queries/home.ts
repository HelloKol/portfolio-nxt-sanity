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
      "workList": workList[]-> | order(rank asc) {
        _id,
        title,
        excerpt,
        slug,
        rank,
        cardGradient,
        type,
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
