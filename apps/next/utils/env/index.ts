import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_TOKEN: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_SANITY_STUDIO_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_STUDIO_DATASET: z.string().min(1),
    NEXT_PUBLIC_SENDGRID_API_KEY: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().min(1),
    NEXT_PUBLIC_SENDER_EMAIL: z.string().min(1),
    NEXT_PUBLIC_RECIEVER_EMAIL: z.string().min(1)
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_TOKEN: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SANITY_STUDIO_ID: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID,
    NEXT_PUBLIC_SANITY_STUDIO_DATASET: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
    NEXT_PUBLIC_SENDGRID_API_KEY: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    NEXT_PUBLIC_SENDER_EMAIL: process.env.NEXT_PUBLIC_SENDER_EMAIL,
    NEXT_PUBLIC_RECIEVER_EMAIL: process.env.NEXT_PUBLIC_RECIEVER_EMAIL
  }
});
