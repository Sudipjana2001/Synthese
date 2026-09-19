'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Download,
  FileText,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  BookOpen,
  Compass,
  ShieldCheck,
  MapPin,
} from 'lucide-react'
import { AboutData, PublicationItem } from '../../lib/sampleAbout'
import styles from './about.module.css'

interface AboutClientProps {
  about: AboutData
}

export function AboutClient({ about }: AboutClientProps) {
  const [copiedPgp, setCopiedPgp] = useState(false)
  const [copiedBibtex, setCopiedBibtex] = useState(false)
  const [copiedDoiId, setCopiedDoiId] = useState<string | null>(null)

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(about.pgpKey)
    setCopiedPgp(true)
    setTimeout(() => setCopiedPgp(false), 2000)
  }

  const handleCopyAllBibtex = () => {
    const bibtexArchive = about.publications
      .map(
        (p) => `@article{${p.id},
  title={${p.title}},
  author={${p.authors}},
  journal={${p.venue}},
  year={${p.year}},
  doi={${p.doi}}
}`
      )
      .join('\n\n')

    navigator.clipboard.writeText(bibtexArchive)
    setCopiedBibtex(true)
    setTimeout(() => setCopiedBibtex(false), 2000)
  }

  const handleCopySingleBibtex = (pub: PublicationItem) => {
    const snippet = `@article{${pub.id},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${pub.year}},
  doi={${pub.doi}}
}`
    navigator.clipboard.writeText(snippet)
    setCopiedDoiId(pub.id)
    setTimeout(() => setCopiedDoiId(null), 2000)
  }

  const handleDownloadCv = () => {
    const cvContent = `# CURRICULUM VITAE — ${about.name}
Role: ${about.role}
Affiliation: ${about.affiliation}
Location: ${about.location}
ORCID: ${about.orcid}
PGP Key: ${about.pgpKey}

## RESEARCH SUMMARY
${about.headline}

## ACADEMIC APPOINTMENTS & EDUCATION
${about.timeline
  .map(
    (t) => `* [${t.dateRange}] ${t.title} — ${t.company} (${t.location})
  ${t.description}
  Tags: ${t.technologies.join(', ')}`
  )
  .join('\n\n')}

## SELECTED PUBLICATIONS
${about.publications
  .map(
    (p) => `* ${p.authors} (${p.year}). "${p.title}". ${p.venue}. DOI: ${p.doi}`
  )
  .join('\n')}
`
    const blob = new Blob([cvContent], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CV_Sudip_Jana_Synthese_2026.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ── Top Masthead ── */}
      <section className={styles.masthead}>
        <div className="container">
          <div className={styles.kicker}>
            <span className={styles.kickerDot} />
            {about.kicker || 'CURRICULUM VITAE & SCHOLARLY DOSSIER // DEPT. OF COGNITIVE COMPUTATION'}
          </div>

          <h1 className={styles.pageTitle}>{about.title || 'Curriculum & Editorial Dossier'}</h1>
          <p className={styles.pageSubtitle}>
            {about.headline}
          </p>

          <div className={styles.actionRow}>
            {about.resumeUrl ? (
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <Download size={14} />
                Download Complete CV (.pdf / .md)
              </a>
            ) : (
              <button className={styles.primaryBtn} onClick={handleDownloadCv}>
                <Download size={14} />
                Download Complete CV (.md / .pdf)
              </button>
            )}

            <button className={styles.secondaryBtn} onClick={handleCopyAllBibtex}>
              {copiedBibtex ? <Check size={14} /> : <Copy size={14} />}
              {copiedBibtex ? 'BibTeX Copied' : 'BibTeX Archive (.bib)'}
            </button>

            <button
              className={styles.pgpChip}
              onClick={handleCopyPgp}
              title="Click to copy PGP Public Fingerprint"
            >
              <ShieldCheck size={13} />
              <span>PGP: {about.pgpKey}</span>
              {copiedPgp && <Check size={12} style={{ color: 'var(--color-accent)' }} />}
            </button>
          </div>
        </div>
      </section>

      {/* ── Two-Column Profile & Epistemic Statement ── */}
      <section className={styles.profileSection}>
        <div className="container">
          <div className={styles.profileGrid}>
            {/* Left Column: Scholar Profile Card */}
            <aside className={styles.profileCard}>
              <div className={styles.portraitContainer}>
                {about.profileImageUrl ? (
                  <img
                    src={about.profileImageUrl}
                    alt={about.name}
                    className={styles.portraitGraphic}
                  />
                ) : (
                  <div className={styles.portraitPlaceholder}>
                    <Compass size={48} strokeWidth={1.2} />
                    <span>SYNTHESE LAB // INVESTIGATOR</span>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>BERLIN • CAMBRIDGE</span>
                  </div>
                )}
              </div>

              <div className={styles.profileMeta}>
                <h2 className={styles.profileName}>{about.name}</h2>
                <div className={styles.profileRole}>{about.role}</div>
                <div className={styles.profileAffiliation}>{about.affiliation}</div>
              </div>

              {/* Bibliometric Telemetry */}
              <div className={styles.metricGrid}>
                <div className={styles.metricBox}>
                  <div className={styles.metricVal}>{about.metrics.citations}</div>
                  <div className={styles.metricLabel}>Citations</div>
                </div>
                <div className={styles.metricBox}>
                  <div className={styles.metricVal}>{about.metrics.hIndex}</div>
                  <div className={styles.metricLabel}>h-Index</div>
                </div>
                <div className={styles.metricBox}>
                  <div className={styles.metricVal}>{about.metrics.publications}</div>
                  <div className={styles.metricLabel}>Manuscripts</div>
                </div>
                <div className={styles.metricBox}>
                  <div className={styles.metricVal}>{about.metrics.activeSimulations}</div>
                  <div className={styles.metricLabel}>Active Models</div>
                </div>
              </div>

              {/* Verification & Credentials */}
              <div className={styles.identityLinks}>
                <div className={styles.idRow}>
                  <span>ORCID</span>
                  <a
                    href={`https://orcid.org/${about.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.idVal}
                  >
                    {about.orcid}
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className={styles.idRow}>
                  <span>Location</span>
                  <span className={styles.idVal}>{about.location}</span>
                </div>
                <div className={styles.idRow}>
                  <span>Repository</span>
                  <a
                    href="https://github.com/Sudipjana2001/Synthese"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.idVal}
                  >
                    Sudipjana2001/Synthese
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className={styles.idRow}>
                  <span>Dispatch</span>
                  <a href={`mailto:${about.email}`} className={styles.idVal}>
                    {about.email}
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Editorial Statement & Research Pillars */}
            <main className={styles.statementColumn}>
              <div>
                <h2 className={styles.sectionHeading}>The Epistemic Thesis of Synthese</h2>
                <blockquote className={styles.statementLead}>
                  &ldquo;{about.headline}&rdquo;
                </blockquote>
                <div className={styles.statementBody}>
                  <p>
                    Modern artificial intelligence is overwhelmingly framed through the lens of static Euclidean parameter optimization in deep feed-forward topologies. While empirically formidable, this paradigm often neglects the thermodynamic and continuous dynamical substrates that give rise to physical morphogenesis and biological cognition.
                  </p>
                  <p>
                    {about.abstract}
                  </p>
                  <p>
                    Through the Synthese Computational Press, all theoretical treatises are formally accompanied by browser-native, interactive numerical simulations. Reviewers and fellows can directly perturb physical parameters, test boundary conditions, and verify mathematical lemmas in real time.
                  </p>
                </div>
              </div>

              {/* Research Pillars */}
              <div>
                <h3 className={styles.sectionHeading} style={{ fontSize: '1.5rem' }}>
                  Core Theoretical Pillars
                </h3>
                <div className={styles.pillarsGrid}>
                  {about.epistemicPillars.map((pillar, idx) => (
                    <div key={idx} className={styles.pillarCard}>
                      <span className={styles.pillarDiscipline}>{pillar.discipline}</span>
                      <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                      <p className={styles.pillarSummary}>{pillar.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills and competencies if provided */}
              {about.skills && about.skills.length > 0 && (
                <div style={{ marginTop: 'var(--space-8)' }}>
                  <h3 className={styles.sectionHeading} style={{ fontSize: '1.25rem' }}>
                    {about.skillsHeadline || 'Core Competencies & Tooling'}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                    {about.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          padding: '4px 10px',
                          backgroundColor: 'var(--color-bg-alt)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--color-text)',
                        }}
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ── Curriculum Temporale (Timeline) ── */}
      {about.showTimeline !== false && (
        <section className={styles.timelineSection}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <span className={styles.kicker}>CHRONOLOGY OF RESEARCH</span>
              <h2 className={styles.sectionHeading}>
                {about.timelineHeading || 'Curriculum Temporale & Appointments'}
              </h2>
              <p className={styles.pageSubtitle} style={{ margin: '0 auto' }}>
                Academic milestones, fellowships, institutional directorships, and foundational research degrees.
              </p>
            </div>

            <div className={styles.timelineStream}>
              {about.timeline.map((item) => (
                <div key={item._id} className={styles.timelineNode}>
                  <div className={styles.timelineMarker} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineTop}>
                      <span className={styles.timelineDate}>{item.dateRange}</span>
                      <span className={styles.timelineLocation}>
                        <MapPin size={11} style={{ display: 'inline', marginRight: '3px' }} />
                        {item.location}
                      </span>
                    </div>
                    <h3 className={styles.timelineRole}>{item.title}</h3>
                    <div className={styles.timelineCompany}>{item.company}</div>
                    <p className={styles.timelineDesc}>{item.description}</p>
                    <div className={styles.timelineTags}>
                      {item.technologies.map((tech, i) => (
                        <span key={i} className={styles.timelineTag}>
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Selected Publications Section ── */}
      <section className={styles.publicationsSection}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className={styles.kicker}>BIBLIOMETRIC RECORD</span>
              <h2 className={styles.sectionHeading}>Selected Treatises & Preprints</h2>
              <p className={styles.pageSubtitle} style={{ marginBottom: 0 }}>
                Peer-reviewed papers, computational monographs, and conference proceedings with verified DOIs.
              </p>
            </div>
            <Link href="/blog" className={styles.secondaryBtn}>
              <BookOpen size={14} />
              View Full Journal Archive →
            </Link>
          </div>

          <div className={styles.pubList}>
            {about.publications.map((pub) => (
              <article key={pub.id} className={styles.pubCard}>
                <div className={styles.pubHeader}>
                  <span className={styles.pubBadge}>{pub.type}</span>
                  <span className={styles.pubYear}>{pub.year}</span>
                </div>

                <h3 className={styles.pubTitle}>
                  {pub.slug ? (
                    <Link href={`/blog/${pub.slug}`}>
                      {pub.title}
                    </Link>
                  ) : pub.externalUrl ? (
                    <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                <div className={styles.pubAuthors}>{pub.authors}</div>
                <div className={styles.pubVenue}>{pub.venue}</div>
                <p className={styles.pubAbstract}>{pub.abstract}</p>

                <div className={styles.pubFooter}>
                  <span className={styles.pubDoi}>
                    <FileText size={12} />
                    DOI: {pub.doi}
                  </span>

                  <div className={styles.pubActions}>
                    <button
                      className={styles.secondaryBtn}
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => handleCopySingleBibtex(pub)}
                    >
                      {copiedDoiId === pub.id ? <Check size={12} /> : <Copy size={12} />}
                      {copiedDoiId === pub.id ? 'BibTeX Copied' : 'BibTeX'}
                    </button>

                    {pub.slug && (
                      <Link href={`/blog/${pub.slug}`} className={styles.pubActionLink}>
                        Read Manuscript <ArrowUpRight size={13} />
                      </Link>
                    )}
                    {pub.externalUrl && (
                      <a
                        href={pub.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.pubActionLink}
                      >
                        External Link <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Computational Substrates & Instrumentarium ── */}
      <section className={styles.instrumentariumSection}>
        <div className="container">
          <span className={styles.kicker}>LABORATORY INFRASTRUCTURE</span>
          <h2 className={styles.sectionHeading}>Computational Substrates & Tooling</h2>
          <p className={styles.pageSubtitle}>
            Specialized hardware nodes, formal verification engines, and numerical runtime kernels supporting Synthese press publications.
          </p>

          <div className={styles.instrumentGrid}>
            {about.instrumentarium.map((inst, i) => (
              <div key={i} className={styles.instrumentCard}>
                <span className={styles.instrumentCategory}>{inst.category}</span>
                <h3 className={styles.instrumentName}>{inst.name}</h3>
                <p className={styles.instrumentDesc}>{inst.description}</p>
                <ul className={styles.specList}>
                  {inst.specs.map((spec, j) => (
                    <li key={j} className={styles.specItem}>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Institutional Contact Drawer */}
          <div className={styles.contactBox}>
            <div className={styles.contactCol}>
              <span className={styles.contactHeading}>Academic Inquiries</span>
              <div className={styles.contactVal}>investigator@synthese.press</div>
              <div className={styles.contactSub}>Encrypted PGP submissions encouraged</div>
            </div>

            <div className={styles.contactCol}>
              <span className={styles.contactHeading}>Laboratory Location</span>
              <div className={styles.contactVal}>Synthese Computational Press Labs</div>
              <div className={styles.contactSub}>Room 402, Inst. for Non-Equilibrium Systems</div>
            </div>

            <div className={styles.contactCol}>
              <span className={styles.contactHeading}>Fellowships & Sabbaticals</span>
              <div className={styles.contactVal}>Visiting Scholar Program</div>
              <div className={styles.contactSub}>Applications open annually for Autumn semester</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
