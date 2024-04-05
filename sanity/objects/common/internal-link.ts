export default ({linkableContentTypes}: {linkableContentTypes: string[]}) => ({
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  fields: [
    {
      title: 'title',
      name: 'title',
      type: 'string',
      validation: (Rule: {required: () => boolean}) => Rule.required(),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'reference',
      to: linkableContentTypes.map((type) => ({type})),
      validation: (Rule: {required: () => boolean}) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: {title: string; subtitle: string}) {
      const {title} = selection
      return {
        title: title,
      }
    },
  },
})
