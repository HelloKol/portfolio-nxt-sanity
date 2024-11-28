// ./sanity/lib/token.ts

export const token =
  'sk8tirgooK1Q8QKGOMxlxq8i4lIGdMJh7S8yxatfuMbMYjp4ZHnFPQUsZIUz6kNOVhLs4vCYTrv5dRSPbhFQY2Lx07xP24JENkz5IuzyvWpZ7OjJkiGtZAWAx6tS0o66nRKOMKSJLYWgzQWLCeTgJfeMwdO1KtCazYSMXZIemEb1rRRc6KsF'

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}
