export default {
  name: 'layout.textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    {
      title: 'Body',
      name: 'body',
      type: 'blockContent',
      validation: (Rule: {required: () => boolean}) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare(selection: {title: string}) {
      const {title} = selection
      return {
        title: title,
      }
    },
  },
}
