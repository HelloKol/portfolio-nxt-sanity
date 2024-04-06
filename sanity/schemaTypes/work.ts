import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
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
      name: 'color',
      title: 'Color',
      type: 'simplerColor',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'work.category'}],
      group: 'content',
    }),
    defineField({
      name: 'createdDate',
      title: 'Created date',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      title: 'Tools',
      name: 'tools',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      group: 'content',
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'Web development', value: 'webDevelopment'},
          {title: 'UI/UX Design', value: 'uxDesign'},
          {title: 'Full stack', value: 'fullStack'},
        ],
        layout: 'grid',
      },
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call to action (CTA)',
      type: 'array',
      of: [{type: 'internalLink'}, {type: 'externalLink'}],
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
      media: 'coverImage',
    },
  },
})
