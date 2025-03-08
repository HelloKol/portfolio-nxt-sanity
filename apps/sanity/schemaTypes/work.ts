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
    {
      name: 'rank',
      title: 'Rank',
      type: 'string',
      inputComponent: CustomSelect,
      validation: (Rule) =>
        Rule.custom(async (number, context) => {
          // Custom validation to check uniqueness of number
          const existingDocs = await sanityClient.fetch(
            `*[_type == '${context.document._type}' && number == $number && _id != $id]`,
            {number, id: context.document._id},
          )
          if (existingDocs.length > 0) {
            return 'Number is already in use. Please choose a different number.'
          }
          return true
        }).error('Number is already in use. Please choose a different number.'),
      options: {
        list: numbersList,
        documentType: 'work',
        documentId: '_id',
      },
      group: 'content',
    },
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
