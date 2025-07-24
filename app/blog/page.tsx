import { getPosts } from '@/lib/sanity'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <ul className="space-y-6">
        {posts.map((post: any) => (
          <li key={post._id} className="border-b pb-4">
            <a href={`/blog/${post.slug.current}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="mt-2 w-full h-auto rounded"
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}