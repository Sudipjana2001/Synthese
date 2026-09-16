export interface HeadingItem {
  id: string
  text: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractHeadings(body: any[]): HeadingItem[] {
  if (!body || !Array.isArray(body)) return []

  const headings: HeadingItem[] = []

  for (const block of body) {
    if (block._type === 'block' && ['h1', 'h2', 'h3'].includes(block.style)) {
      const text = block.children?.map((c: any) => c.text).join('') || ''
      if (text.trim()) {
        const level = parseInt(block.style.replace('h', ''), 10)
        headings.push({
          id: slugify(text),
          text,
          level,
        })
      }
    }
  }

  return headings
}
