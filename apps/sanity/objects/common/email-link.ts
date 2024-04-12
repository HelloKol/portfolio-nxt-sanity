export default {
  title: 'Email address',
  name: 'emailLink',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: {required: () => boolean}) => Rule.required(),
    },
    {
      title: 'Email Address',
      name: 'email',
      type: 'email',
      validation: (Rule: {required: () => boolean}) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'email',
    },
    prepare(selection: {title: string; subtitle: string}) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `${subtitle ? subtitle : 'unknown'}`,
      }
    },
  },
}
