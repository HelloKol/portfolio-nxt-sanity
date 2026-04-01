// ./sanity/lib/client.ts
import {createClient} from '@sanity/client'

const apiVersion = '2021-08-31',
  dataset = 'production',
  projectId = 'ivaoowdn'

export function getClient(previewToken) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !previewToken,
    perspective: previewToken ? 'previewDrafts' : 'published',
    stega: {
      enabled: previewToken ? true : false,
      studioUrl: '/studio',
    },
    token: previewToken,
  })
}
