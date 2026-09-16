'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Footer.module.css'

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/studio')) {
    return null
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandGroup}>
          <span className={styles.brandName}>Synthese</span>
          <span className={styles.brandSub}>An Open Scholarly Computational Press</span>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/blog" className={styles.navLink}>
              Publications
            </Link>
          </li>
          <li>
            <Link href="/projects" className={styles.navLink}>
              Simulations
            </Link>
          </li>
          <li>
            <Link href="/garden" className={styles.navLink}>
              Zettelkasten Archive
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              Curriculum
            </Link>
          </li>
          <li>
            <Link href="/studio" className={styles.navLink} target="_blank">
              Admin Studio
            </Link>
          </li>
        </ul>

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Synthese Lab. ISSN 2769-188X. Open Access CC-BY-4.0.
        </div>
      </div>
    </footer>
  )
}
