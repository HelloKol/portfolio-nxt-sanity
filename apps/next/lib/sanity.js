require("dotenv").config();

const sanityClient = require("@sanity/client");

// Initialize Sanity client
module.exports = sanityClient.createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});
