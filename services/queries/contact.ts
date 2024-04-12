import groq from "groq";
import SEO from "../seo";

const CONTACT_QUERY = groq`
*[_type == "contact" && !(_id in path('drafts.**'))][0] {
    title,
    contactForm,
    ${SEO}
}`;

export default CONTACT_QUERY;
