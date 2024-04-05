// Schema
import blockContent from './blockContent'
import category from './category'
import home from './home'
import settings from './settings'
import work from './work'
import workIndex from './workIndex'
// Objects
import externalLink from '../objects/common/external-link'
import internalLink from '../objects/common/internal-link'
import seoPage from '../objects/seo/seoPage'

const linkableContentTypes = ['home', 'work', 'work.index']

export const schemaTypes = [
  // Schema
  blockContent,
  category,
  home,
  settings,
  work,
  workIndex,
  // Objects
  externalLink,
  internalLink({linkableContentTypes}),
  seoPage,
]
