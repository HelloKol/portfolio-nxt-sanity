import React from 'react'
import {defineType, defineField} from 'sanity'
import type {PreviewProps} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import YouTubePlayer from 'react-player/youtube'

export function YouTubePreview(props: PreviewProps) {
  const {title: url} = props

  return <YouTubePlayer url={url as string} />
}

const youtube = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
  components: {
    preview: YouTubePreview,
  },
})

export default youtube
