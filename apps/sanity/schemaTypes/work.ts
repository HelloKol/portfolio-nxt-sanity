import {defineArrayMember, defineField, defineType} from 'sanity'
import sanityClient from '../lib/sanityClient'
import CustomSelect from '../components/CustomSelect'

const numbersList = []
for (let i = 1; i <= 50; i++) {
  numbersList.push({title: `${i}`, value: `${i}`})
}

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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'work.category'}],
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
          {title: 'Web development', value: 'Web Development'},
          {title: 'UI/UX Design', value: 'UI/UX Design'},
          {title: 'Full stack', value: 'Full stack'},
          {title: 'Extension', value: 'Extension'},
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
      name: 'layout',
      title: 'Layout',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'layout.textSection',
        }),
        defineArrayMember({
          type: 'image',
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
      media: 'coverImage',
    },
  },
})
