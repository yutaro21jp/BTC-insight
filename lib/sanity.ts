import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // あなたのSanityのプロジェクトID
  dataset: 'production',
  apiVersion: '2023-01-01', // 最新の日付でOK
  useCdn: true,
})

// 追加
import imageUrlBuilder from '@sanity/image-url'
import { Image as SanityImageSource } from 'sanity'

// 既存の client を使って builder を作成
const builder = imageUrlBuilder(client)

// 型付きのヘルパー関数を作る（便利）
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }`
  return await client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    excerpt,
    "author": author->{name, image},
    "categories": categories[]->{title, slug}
  }`
  return await client.fetch(query, { slug })
}

export async function getPostsByCategorySlug(categorySlug: string) {
  const query = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    mainImage
  }`
  return await client.fetch(query, { categorySlug })
}

export async function getCategoryBySlug(categorySlug: string) {
  const query = `*[_type == "category" && slug.current == $categorySlug][0]{
    title
  }`
  return await client.fetch(query, { categorySlug })
}
