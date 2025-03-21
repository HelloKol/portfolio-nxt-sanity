// ./src/pages/api/draft.ts

import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'next-sanity';

const token =
  'sk8tirgooK1Q8QKGOMxlxq8i4lIGdMJh7S8yxatfuMbMYjp4ZHnFPQUsZIUz6kNOVhLs4vCYTrv5dRSPbhFQY2Lx07xP24JENkz5IuzyvWpZ7OjJkiGtZAWAx6tS0o66nRKOMKSJLYWgzQWLCeTgJfeMwdO1KtCazYSMXZIemEb1rRRc6KsF';

const apiVersion = '2021-08-31',
  dataset = 'production',
  projectId = 'ivaoowdn';

if (!token) {
  throw new Error('A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
});

export default async function handle(req: NextApiRequest, res: NextApiResponse<string | void>) {
  if (!req.url) {
    throw new Error('Missing url');
  }
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, req.url);
  if (!isValid) {
    return res.status(401).send('Invalid secret');
  }
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
