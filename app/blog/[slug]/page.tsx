import { getPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return <p>記事が見つかりませんでした。</p>
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      {post.mainImage?.asset?._ref && (
        <div className="mb-6">
          <Image
            src={urlFor(post.mainImage).width(800).height(500).fit('crop').url()}
            alt={post.title}
            width={800}
            height={500}
            className="rounded"
          />
        </div>
      )}
      <article className="prose prose-lg">
        <PortableText value={post.body} />
      </article>
    </main>
  )
}