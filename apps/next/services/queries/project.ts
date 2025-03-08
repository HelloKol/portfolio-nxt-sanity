import groq from "groq";
import SEO from "../seo";

const PROJECT_QUERY = groq`
*[_type == "work" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  _id,
  title,
  excerpt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
  slug,
  type,
  tools,
  coverImage {
    _type,
    asset->{
      _id,
      url,
      metadata{
        lqip
      }
    }
  },
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
  cta[] {
    _type,
    title,
    url
  },
  layout[] {
    _type == "image" => {
      _type,
      asset->{
        _id,
        url,
        metadata{
          lqip
        }
      }
    },
    _type == "layout.textSection" => {
      _type,
      body[]{
        ...,
        _type == "image" => {
          _type,
          asset->{
            _id,
            url,
            metadata{
              lqip
            }
          }
        }
      },
    }
  },
  ${SEO}
}`;

export default PROJECT_QUERY;
