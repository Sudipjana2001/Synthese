'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'fade' | 'scale'
  as?: React.ElementType
  threshold?: number
  style?: React.CSSProperties
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Component = 'div',
  threshold = 0.1,
  style = {},
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const el = elementRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const initialClass = direction === 'fade' ? 'reveal-fade-init' : 'reveal-init'
  const visibleClass = direction === 'fade' ? 'reveal-fade-visible' : 'reveal-visible'

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
  }

  return (
    <Component
      ref={elementRef as any}
      className={`${initialClass} ${isVisible ? visibleClass : ''} ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Component>
  )
}
