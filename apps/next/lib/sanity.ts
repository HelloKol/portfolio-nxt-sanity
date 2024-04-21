import sanityClient from '@sanity/client';
import { env } from '@/utils/env';

// Initialize Sanity client
const client = sanityClient({
  projectId: env.NEXT_PUBLIC_SANITY_STUDIO_ID,
  dataset: env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  token: env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false
});

export default client;
