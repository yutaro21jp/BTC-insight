import { defineField, defineType } from 'sanity'

export const tweetEmbedType = defineType({
  name: 'tweetEmbed',
  title: 'Tweet Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Tweet URL',
      type: 'url',
      description: 'Enter the URL of the tweet to embed.',
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
        title: url ? `Tweet: ${url}` : 'Tweet Embed',
        subtitle: url ? 'Embedded tweet' : 'No URL provided',
      }
    },
  },
})
