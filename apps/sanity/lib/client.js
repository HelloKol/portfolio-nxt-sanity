// ./sanity/lib/client.ts
import {createClient} from '@sanity/client'

const apiVersion = '2021-08-31',
  dataset = 'production',
  projectId = 'ivaoowdn',
  readToken =
    'sk8tirgooK1Q8QKGOMxlxq8i4lIGdMJh7S8yxatfuMbMYjp4ZHnFPQUsZIUz6kNOVhLs4vCYTrv5dRSPbhFQY2Lx07xP24JENkz5IuzyvWpZ7OjJkiGtZAWAx6tS0o66nRKOMKSJLYWgzQWLCeTgJfeMwdO1KtCazYSMXZIemEb1rRRc6KsF'

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
