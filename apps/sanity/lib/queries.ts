// ./sanity/lib/queries.ts

import {groq} from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`

export const POSTS_SLUG_QUERY = groq`*[_type == "post" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
