import groq from 'groq';
import SEO from '../seo';

const PROJECT_INDEX_QUERY = groq`
*[_type == "workIndex" && !(_id in path('drafts.**'))][0] {
    title,
    ${SEO}
}`;

const PROJECT_INDEX_LIST_QUERY = groq`
    *[_type == "work" && !(_id in path('drafts.**'))] {
        _id,
        title,
        slug,
        tools,
        type,
        color,
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
        },
        ${SEO}
    }`;

export { PROJECT_INDEX_QUERY, PROJECT_INDEX_LIST_QUERY };
