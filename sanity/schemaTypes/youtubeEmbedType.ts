import { defineField, defineType } from 'sanity'

export const youtubeEmbedType = defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Enter the URL of the YouTube video to embed.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const { url } = selection
      return {
        title: url ? `YouTube: ${url}` : 'YouTube Embed',
        subtitle: url ? 'Embedded YouTube video' : 'No URL provided',
      }
    },
  },
})
