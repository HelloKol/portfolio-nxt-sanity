import sanityClient from "@sanity/client";
import { env } from "./env";

// Initialize Sanity client
const client = sanityClient({
  projectId: env.NEXT_PUBLIC_SANITY_STUDIO_ID,
  dataset: env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  useCdn: false,
});

export default client;
