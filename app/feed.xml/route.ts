import { NextResponse } from 'next/server'
import { getAllPosts } from '../../lib/getPosts'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://synthese.blog'
  const posts = await getAllPosts()

  const rssItemsXml = posts.map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug.current}`
    const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>investigator@synthese.press (${post.author?.name || 'Sudip Jana'})</author>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <category>${post.categories?.[0]?.title || 'Cognitive Computation'}</category>
    </item>`
  }).join('')

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Synthese (Σύνθεσις) — Computational Press &amp; Laboratory</title>
    <link>${baseUrl}</link>
    <description>Open scholarly computational press and research laboratory curated by Sudip Jana. Exploring artificial cognition, complex adaptive systems, and interactive computation.</description>
    <language>en-us</language>
    <managingEditor>investigator@synthese.press (Sudip Jana)</managingEditor>
    <webMaster>investigator@synthese.press (Sudip Jana)</webMaster>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`

  return new NextResponse(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
