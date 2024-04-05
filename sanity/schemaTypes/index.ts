// Schema
import category from './category'
import contact from './contact'
import home from './home'
import pageNotFound from './pageNotFound'
import settings from './settings'
import work from './work'
import workIndex from './workIndex'
// Objects
import blockContent from '../objects/common/blockContent'
import externalLink from '../objects/common/external-link'
import internalLink from '../objects/common/internal-link'
import seoPage from '../objects/seo/seoPage'

const linkableContentTypes = ['home', 'work', 'work.index', 'contact']

export const schemaTypes = [
  // Schema
  category,
  contact,
  home,
  pageNotFound,
  settings,
  work,
  workIndex,
  // Objects
  blockContent,
  externalLink,
  internalLink({linkableContentTypes}),
  seoPage,
]
