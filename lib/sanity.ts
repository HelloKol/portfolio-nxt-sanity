import sanityClient from "@sanity/client";

// Initialize Sanity client
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  useCdn: false,
});

export default client;
