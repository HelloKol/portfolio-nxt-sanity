import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Video File',
  name: 'videoFile',
  type: 'object',
  fields: [
    defineField({
      title: 'Video',
      name: 'video',
      type: 'file',
      options: {accept: 'video/*'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Poster',
      name: 'poster',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      title: 'Caption',
      name: 'caption',
      type: 'string',
    }),
    defineField({
      title: 'Show controls',
      name: 'controls',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      title: 'Autoplay',
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Loop',
      name: 'loop',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Muted',
      name: 'muted',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'video.asset.originalFilename',
      media: 'poster',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Video',
        subtitle: subtitle || 'Uploaded video',
        media,
      }
    },
  },
})
