import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'text', rows: 1}],
          validation: (Rule) => Rule.max(4),
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'blockContent',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'workSection',
      title: 'Work Section',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'cta',
          title: 'Call to action (CTA)',
          type: 'internalLink',
        }),
        defineField({
          name: 'workList',
          title: 'Work',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'work'}],
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'Seo',
      type: 'seo.page',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
