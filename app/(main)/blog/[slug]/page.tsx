import { getPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Tweet } from 'react-tweet'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '記事が見つかりませんでした',
    }
  }

  const siteName = 'BTCインサイト';
  const pageTitle = `${post.title} | ${siteName}`;

  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined

  return {
    title: pageTitle,
    description: post.excerpt,
    openGraph: {
      title: pageTitle,
      description: post.excerpt,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  console.log("post.mainImage data:", JSON.stringify(post?.mainImage, null, 2));
  if (post?.mainImage) {
    console.log("Generated Image URL:", urlFor(post.mainImage).url());
  }

  if (!post) {
    return <p>記事が見つかりませんでした。</p>
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-gray-500 text-sm mb-4">
        {post.author?.slug && (
          <Link href={`/authors/${post.author.slug}`} className="mr-2">
            <Image
              src={post.author?.name === 'yutaro' ? '/yutaro.JPG' : urlFor(post.author?.image).width(60).height(60).fit('crop').url()}
              alt={post.author?.name || 'Author'}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          </Link>
        )}
        {!post.author?.slug && (
          <Image
            src={post.author?.name === 'yutaro' ? '/yutaro.JPG' : urlFor(post.author?.image).width(60).height(60).fit('crop').url()}
            alt={post.author?.name || 'Author'}
            width={60}
            height={60}
            className="rounded-full mr-2 object-cover"
          />
        )}
        <div>
          {post.author?.name && (
            post.author.slug ? (
              <Link href={`/authors/${post.author.slug}`} className="text-gray-800 font-semibold hover:underline">
                {post.author.name}
              </Link>
            ) : (
              <p className="text-gray-800 font-semibold">{post.author.name}</p>
            )
          )}
          <p className="text-gray-500 text-sm">公開日：{new Date(post.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          width={800} // Next.jsの最適化のための幅
          height={400} // Next.jsの最適化のための高さ
          className="rounded w-full h-auto mb-6"
        />
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
                const rel = value.blank ? 'noreferrer noopener' : undefined;
                const target = value.blank ? '_blank' : undefined;
                return (
                  <a href={value.href} rel={rel} target={target} className="text-blue-600 hover:underline">
                    {children}
                  </a>
                )
              },
            },
            list: {
              bullet: ({children}) => <ul className="list-disc list-outside mb-4 pl-5 text-lg">{children}</ul>,
              number: ({children}) => <ol className="list-decimal list-outside mb-4 pl-5 text-lg">{children}</ol>,
            },
            listItem: ({children}) => <li className="mb-2">{children}</li>,
            types: {
              tweetEmbed: ({ value }) => {
                const tweetId = value.url.split('/').pop()
                return tweetId ? (
                  <div className="flex justify-center my-8">
                    <Tweet id={tweetId} />
                  </div>
                ) : null
              },
              youtubeEmbed: ({ value }) => {
                const url = value.url;
                let videoId = null;

                // Extract video ID from both standard and shortened YouTube URLs
                const standardMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                if (standardMatch && standardMatch[1]) {
                  videoId = standardMatch[1];
                }

                if (!videoId) return null;
                return (
                  <div className="relative w-full overflow-hidden my-8" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                    ></iframe>
                  </div>
                );
              },
              image: ({ value }) => {
                if (!value || !value.asset || !value.asset._ref) return null;
                return (
                  <div className="my-8 flex justify-center">
                    <Image
                      src={urlFor(value).url()}
                      alt={value.alt || ''}
                      width={800} // 適切な幅を設定
                      height={450} // 適切な高さを設定
                      className="rounded-lg max-w-full h-auto"
                    />
                  </div>
                );
              },
            },
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

      <div className="mt-6 flex gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + '/blog/' + post.slug.current)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white font-bold p-2 rounded-lg flex items-center justify-center w-10 h-10"
          aria-label="Xで共有"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.84-6.317-6.109 6.317H.727l8.49-9.71L0 1.154h7.594l4.95 5.359L18.901 1.153zm-.742 19.14L6.67 3.08H4.41l13.17 17.19h2.26z"></path></svg>
        </a>
        <a
          href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${post.title} ${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-lg flex items-center justify-center w-10 h-10"
          aria-label="Blueskyで共有"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 18h-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5zm7.5-6h-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5zm-6-6h-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5z"/></svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + '/blog/' + post.slug.current)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-lg flex items-center justify-center w-10 h-10"
          aria-label="Facebookで共有"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.815c-3.238 0-5.185 1.237-5.185 5.007v2.993z"/></svg>
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