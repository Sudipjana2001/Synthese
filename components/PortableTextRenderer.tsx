'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Check, Copy, Info, AlertTriangle, Lightbulb, ShieldAlert, Code } from 'lucide-react'
import { urlForImage } from '../sanity/lib/image'
import styles from './PortableTextRenderer.module.css'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function CodeBlockComponent({ value }: { value: any }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (value?.code) {
      navigator.clipboard.writeText(value.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.codeHeader}>
        <div className={styles.codeFilename}>
          <Code size={13} />
          <span>{value?.filename || value?.language || 'Code'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={styles.copyBtn}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={12} color="#16a34a" />
              <span style={{ color: '#16a34a' }}>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={styles.codePre}>
        <code>{value?.code}</code>
      </pre>
    </div>
  )
}

function CalloutComponent({ value }: { value: any }) {
  const type = value?.type || 'note'

  const icons: Record<string, any> = {
    note: Info,
    tip: Lightbulb,
    warning: AlertTriangle,
    important: ShieldAlert,
  }

  const titles: Record<string, string> = {
    note: 'Note',
    tip: 'Tip',
    warning: 'Warning',
    important: 'Important',
  }

  const typeClasses: Record<string, string> = {
    note: styles.calloutNote,
    tip: styles.calloutTip,
    warning: styles.calloutWarning,
    important: styles.calloutImportant,
  }

  const Icon = icons[type] || Info
  const title = titles[type] || 'Note'
  const className = typeClasses[type] || styles.calloutNote

  return (
    <div className={`${styles.callout} ${className}`}>
      <div className={styles.calloutTitle}>
        <Icon size={14} />
        <span>{title}</span>
      </div>
      <div>{value?.text}</div>
    </div>
  )
}

function ImageComponent({ value }: { value: any }) {
  const imageUrl = urlForImage(value)?.url()
  if (!imageUrl) return null

  return (
    <figure className={styles.figure}>
      <Image
        src={imageUrl}
        alt={value?.alt || 'Article image'}
        width={800}
        height={500}
        className={styles.image}
      />
      {value?.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
    </figure>
  )
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => {
      const text = String(children || '')
      const id = slugify(text)
      return (
        <h1 id={id} className={styles.heading1}>
          {children}
        </h1>
      )
    },
    h2: ({ children }) => {
      const text = String(children || '')
      const id = slugify(text)
      return (
        <h2 id={id} className={styles.heading2}>
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const text = String(children || '')
      const id = slugify(text)
      return (
        <h3 id={id} className={styles.heading3}>
          {children}
        </h3>
      )
    },
    h4: ({ children }) => {
      const text = String(children || '')
      const id = slugify(text)
      return (
        <h4 id={id} className={styles.heading4}>
          {children}
        </h4>
      )
    },
    normal: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={styles.listBullet}>{children}</ul>,
    number: ({ children }) => <ol className={styles.listNumber}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.listItem}>{children}</li>,
    number: ({ children }) => <li className={styles.listItem}>{children}</li>,
  },
  marks: {
    code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
    link: ({ value, children }) => {
      const isExternal = (value?.href || '').startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal || value?.blank ? '_blank' : undefined}
          rel={isExternal || value?.blank ? 'noopener noreferrer' : undefined}
          className={styles.link}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    codeBlock: CodeBlockComponent,
    callout: CalloutComponent,
    image: ImageComponent,
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className={styles.portableText}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
