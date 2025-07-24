import { getPosts, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="px-4 md:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          ビットコインの最新ニュースを、日本語で、わかりやすく。
        </h1>
        <Link
          href="https://your-newsletter-url"
          className="inline-block bg-black text-white font-semibold px-6 py-2 rounded hover:opacity-80"
        >
          無料ニュースレターに登録
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link
            href={`/blog/${post.slug.current}`}
            key={post._id}
            className="rounded-lg border p-4 hover:shadow transition"
          >
            <div className="mb-4">
              <Image
                src={
                  post.mainImage?.asset
                    ? urlFor(post.mainImage).width(600).height(400).fit('crop').url()
                    : "/no-image.jpeg" // public フォルダに配置
                }
                alt={post.title}
                width={600}
                height={400}
                className="rounded object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h2 className="text-lg font-bold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-700 truncate">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}