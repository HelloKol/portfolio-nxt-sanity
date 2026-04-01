import {defineArrayMember, defineField, defineType} from 'sanity'

const gradientPresetOptions = [
  {title: '🟪🟦 Periwinkle → Indigo', value: 'periwinkle-indigo'},
  {title: '⬜⬛ Silver → Charcoal', value: 'silver-charcoal'},
  {title: '🪻🟣 Lavender → Deep Purple', value: 'lavender-deep-purple'},
  {title: '🩷🟥 Pink → Magenta', value: 'pink-magenta'},
  {title: '🟩🟢 Mint → Teal', value: 'mint-teal'},
  {title: '🩵🔵 Sky Blue → Navy', value: 'sky-blue-navy'},
  {title: '🟧🟫 Peach → Burnt Orange', value: 'peach-burnt-orange'},
  {title: '🟨🫒 Lemon → Olive', value: 'lemon-olive'},
  {title: '🪻🔷 Lilac → Royal Blue', value: 'lilac-royal-blue'},
  {title: '🩵🌊 Cyan → Deep Teal', value: 'cyan-deep-teal'},
  {title: '🌸🍇 Rose → Plum', value: 'rose-plum'},
  {title: '🟦🔵 Aqua → Cobalt', value: 'aqua-cobalt'},
  {title: '🪸🔴 Coral → Scarlet', value: 'coral-scarlet'},
  {title: '🌿🌲 Sage → Forest', value: 'sage-forest'},
  {title: '🩶🌌 Slate → Midnight', value: 'slate-midnight'},
]

const rankOptions = []
for (let i = 1; i <= 50; i++) {
  rankOptions.push({title: `${i}`, value: i})
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
      name: 'rank',
      title: 'Rank',
      description: 'Lower rank appears first. Must be unique across Work items.',
      type: 'number',
      options: {
        list: rankOptions,
        layout: 'dropdown',
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(50)
          .custom(async (value, context: any) => {
            if (typeof value !== 'number') return true

            const client = context.getClient({apiVersion: '2023-10-01'})
            const rawId = context.document?._id
            if (!rawId) return true

            const publishedId = rawId.replace(/^drafts\./, '')
            const draftId = `drafts.${publishedId}`

            const count = await client.fetch(
              `count(*[_type == "work" && rank == $rank && !(_id in [$publishedId, $draftId])])`,
              {rank: value, publishedId, draftId},
            )

            return count === 0 || `Rank "${value}" is already used by another Work item.`
          }),
      group: 'content',
    }),
    defineField({
      name: 'cardGradient',
      title: 'Card Gradient',
      description: 'Preset used for this work card background in UI.',
      type: 'string',
      options: {
        list: gradientPresetOptions,
        layout: 'dropdown',
      },
      initialValue: 'periwinkle-indigo',
      validation: (Rule) =>
        Rule.required().custom(async (value, context: any) => {
          if (!value) return true

          const client = context.getClient({apiVersion: '2023-10-01'})
          const rawId = context.document?._id
          if (!rawId) return true

          const publishedId = rawId.replace(/^drafts\./, '')
          const draftId = `drafts.${publishedId}`

          const count = await client.fetch(
            `count(*[_type == "work" && cardGradient == $value && !(_id in [$publishedId, $draftId])])`,
            {value, publishedId, draftId},
          )

          return count === 0 || 'This gradient is already used by another Work item.'
        }),
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
