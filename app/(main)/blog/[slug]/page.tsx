import { getPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '記事が見つかりませんでした',
    }
  }

  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  }
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
        <Image
          src={post.author?.name === 'yutaro' ? '/yutaro.JPG' : urlFor(post.author?.image).width(60).height(60).fit('crop').url()}
          alt={post.author?.name || 'Author'}
          width={60}
          height={60}
          className="rounded-full mr-2 object-cover"
        />
        <div>
          {post.author?.name && <p className="text-gray-800 font-semibold">{post.author.name}</p>}
          <p className="text-gray-500 text-sm">公開日：{new Date(post.publishedAt).toLocaleDateString()}</p>
        </div>
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
      <article className="text-gray-800 leading-relaxed">
        <PortableText
          value={post.body}
          components={{
            block: {
              h1: ({children}) => <h1 className="text-4xl font-extrabold mt-8 mb-4">{children}</h1>,
              h2: ({children}) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
              h3: ({children}) => <h3 className="text-2xl font-semibold mt-5 mb-2">{children}</h3>,
              h4: ({children}) => <h4 className="text-xl font-semibold mt-4 mb-2">{children}</h4>,
              h5: ({children}) => <h5 className="text-lg font-semibold mt-3 mb-1">{children}</h5>,
              h6: ({children}) => <h6 className="text-base font-semibold mt-2 mb-1">{children}</h6>,
              normal: ({children}) => <p className="mb-4 text-lg">{children}</p>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-lg">{children}</blockquote>,
            },
            marks: {
              link: ({children, value}) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                return (
                  <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
                    {children}
                  </a>
                )
              },
            },
            list: {
              bullet: ({children}) => <ul className="list-disc list-inside mb-4 pl-5">{children}</ul>,
              number: ({children}) => <ol className="list-decimal list-inside mb-4 pl-5">{children}</ol>,
            },
            listItem: ({children}) => <li className="mb-2">{children}</li>,
          }}
        />
      </article>

      {post.categories && post.categories.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-lg font-semibold mr-2">カテゴリ：</span>
            {post.categories.map((category: any) => (
              <Link
                key={category.title}
                href={`/categories/${category.slug.current}`}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-lg font-semibold mr-2">タグ：</span>
            {post.tags.map((tag: any) => (
              <Link
                key={tag.name}
                href={`/tags/${tag.slug.current}`}
                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm hover:bg-pink-200 transition"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + '/blog/' + post.slug.current)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.84-6.317-6.109 6.317H.727l8.49-9.71L0 1.154h7.594l4.95 5.359L18.901 1.153zm-.742 19.14L6.67 3.08H4.41l13.17 17.19h2.26z"></path></svg>
          Xで共有
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + '/blog/' + post.slug.current)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.815c-3.238 0-5.185 1.237-5.185 5.007v2.993z"/></svg>
          Facebookで共有
        </a>
      </div>

      <div className="mt-10 p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">ビットコインの最新ニュースを、日本語で、わかりやすくお届け。</h2>
        <p className="text-gray-700 mb-6 text-left">基礎から最前線まで ──ビットコインに関する本質的な情報と技術的背景を、毎週わかりやすく解説しています。ノイズに惑わされず、確かな理解を手に入れたいあなたへ。</p>
        <a
          href="https://diamondhandscommunity.substack.com/t/btc-insight"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          無料ニュースレターに登録
        </a>
      </div>
    </main>
  )
}