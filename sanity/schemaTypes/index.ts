// Schema
import about from './about'
import category from './category'
import contact from './contact'
import home from './home'
import pageNotFound from './pageNotFound'
import settings from './settings'
import work from './work'
import workIndex from './workIndex'
// Objects
import blockContent from '../objects/common/blockContent'
import emailLink from '../objects/common/email-link'
import externalLink from '../objects/common/external-link'
import internalLink from '../objects/common/internal-link'
import seoPage from '../objects/seo/seoPage'
import seoSettings from '../objects/seo/seoSettings'

const linkableContentTypes = ['about', 'home', 'work', 'work.index', 'contact']

export const schemaTypes = [
  // Schema
  about,
  category,
  contact,
  home,
  pageNotFound,
  settings,
  work,
  workIndex,
  // Objects
  blockContent,
  emailLink,
  externalLink,
  internalLink({linkableContentTypes}),
  seoPage,
  seoSettings,
]
