'use client'

import { useEffect } from 'react'

/**
 * In development, libraries like @sanity/client's EventSource polyfill emit
 * benign reconnection notices (e.g. "No activity within 45000 milliseconds... Reconnecting.")
 * when the real-time listener sits idle with no document changes.
 *
 * Next.js Turbopack dev server treats all `console.error` calls as critical dev overlays.
 * This filter intercepts and redirects these benign heartbeat reconnect messages to `console.debug`,
 * preventing disruptive full-screen overlays while keeping all genuine errors intact.
 */
export function DevConsoleFilter() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    const originalError = console.error

    console.error = (...args: any[]) => {
      const firstArg = args[0]
      const msg =
        typeof firstArg === 'string'
          ? firstArg
          : firstArg instanceof Error
            ? firstArg.message
            : typeof firstArg?.message === 'string'
              ? firstArg.message
              : ''

      // Intercept benign SSE idle heartbeat reconnect notice from Sanity client/Studio
      if (msg.includes('No activity within') && msg.includes('Reconnecting')) {
        console.debug('[Sanity SSE Heartbeat]', ...args)
        return
      }

      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
