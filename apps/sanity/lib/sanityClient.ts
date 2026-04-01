import sanityClient from '@sanity/client'
import config from '../config'

// Initialize Sanity client
const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  token: config.token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default client
