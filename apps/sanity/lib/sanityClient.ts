import sanityClient from '@sanity/client'
import config from '../config'

// Initialize Sanity client
const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: false,
})

export default client
