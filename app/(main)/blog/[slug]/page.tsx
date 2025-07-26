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
      <div className="flex items-center text-gray-500 text-sm mb-4">
        {post.author?.image && (
          <Image
            src={urlFor(post.author.image).width(40).height(40).fit('crop').url()}
            alt={post.author.name || 'Author'}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
        )}
        {post.author?.name && <span className="mr-2">{post.author.name}</span>}
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>
      {post.mainImage && (
        <div className="mb-6 relative h-96">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="rounded object-contain"
          />
        </div>
      )}
      <article className="prose prose-lg">
        <PortableText value={post.body} />
      </article>
      {post.categories && post.categories.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category: any) => (
              <span
                key={category.title}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}