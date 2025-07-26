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
        <div className="mt-10">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-lg font-semibold mr-2">Categories:</span>
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

      <div className="mt-10 p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">ビットコインの最新ニュースを、日本語で、わかりやすくお届け。</h2>
        <p className="text-gray-700 mb-6 text-left">基礎から最前線まで ──ビットコインに関する本質的な情報と技術的背景を、毎週わかりやすく解説しています。ノイズに惑わされず、確かな理解を手に入れたいあなたへ。</p>
        <a
          href="https://diamondhandscommunity.substack.com/t/btc-insight"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          無料ニュースレターに登録
        </a>
      </div>
    </main>
  )
}