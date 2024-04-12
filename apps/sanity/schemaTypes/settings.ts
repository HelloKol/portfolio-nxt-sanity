import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    {
      name: 'siteHeader',
      title: 'Site Header',
      default: true,
    },
    {
      name: 'siteFooter',
      title: 'Site Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'headerNavigation',
      title: 'Navigation',
      type: 'array',
      of: [{type: 'internalLink'}, {type: 'externalLink'}],
      group: 'siteHeader',
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
      group: 'siteFooter',
    }),
    defineField({
      name: 'reserved',
      title: 'Reserved',
      type: 'string',
      group: 'siteFooter',
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'externalLink'}, {type: 'emailLink'}],
      group: 'siteFooter',
    }),
    defineField({
      title: 'SEO Settings',
      name: 'seoSettings',
      type: 'seo.settings',
      group: 'seo',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
