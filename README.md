# Synthese (Σύνθεσις)
> **An Open Scholarly Computational Press & Personal Research Laboratory**

Synthese is a modern academic editorial and personal research platform exploring the intersection of artificial cognition, complex adaptive systems, and interactive computation. Designed with the aesthetic of high-tier computational presses, Synthese blends long-form philosophical treatises and mathematical derivations with executable simulations and living digital garden notes.

---

## Key Features

- **Embedded Sanity Studio v3 (`/studio`)**: Integrated headless CMS admin suite allowing live editing of all page titles, hero headers, publication singletons, blog posts, interactive projects, and digital garden notes directly from the web interface.
- **Academic Preprint & Manuscript Engine (`/blog`)**:
  - Live client-side search across titles, excerpts, tags, and authors.
  - Discipline filter tabs (*Cognitive Computation*, *Physical Substrates*, *Philosophy of Mind*, *Dynamical Systems*).
  - Featured manuscript spotlight with open-access metadata, DOI indexing, and citation telemetry.
- **Scholarly Article Reader (`/blog/[slug]`)**:
  - Pinned real-time reading progress bar.
  - Dynamic, sticky Table of Contents with smooth scrollspy navigation.
  - Rich Portable Text renderer with syntax-highlighted code blocks, one-click copy buttons, blockquotes, and callout alerts.
  - Institutional volume/article citation bar and author profile cards.
- **Refined Typography & Micro-Aesthetic**:
  - Curated font triad: **Instrument Serif** for editorial headlines, **Inter** for crisp body legibility, and **JetBrains Mono** for code and DOI identifiers.
  - Calibrated character and word spacing without synthetic faux-bolding distortion.
- **Global Command Palette (`⌘K` / `Ctrl+K`)**:
  - Instant keyboard-driven global search modal with fuzzy query matching and quick route navigation.
- **Persistent Theme Engine**:
  - Seamless Light and Dark mode with automatic system detection, manual toggle, and `localStorage` persistence.
- **Vanilla CSS Design System**:
  - Fluid fluid clamp() scale, modular variables, and zero-runtime CSS tokens built without third-party utility bloat.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Content Management** | [Sanity Studio v3](https://www.sanity.io/) (`next-sanity`, `@sanity/image-url`, `@sanity/vision`) |
| **Rich Content** | `@portabletext/react` |
| **Styling** | Vanilla CSS Modules + CSS Variables (`styles/variables.css`, `styles/typography.css`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Instrument Serif, Inter, JetBrains Mono (via Google Fonts) |

---

## Project Structure

```
.
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx      # Article detail reader with TOC & telemetry
│   │   ├── blog.module.css      # Blog archive & reader styles
│   │   └── page.tsx             # Blog / Essays archive with live search & filters
│   ├── studio/
│   │   └── [[...tool]]/page.tsx # Embedded Sanity Studio v3 route
│   ├── globals.css              # Reset, utility classes, and theme root variables
│   ├── layout.tsx               # Root layout with Header, Footer, and ThemeProvider
│   ├── page.module.css          # Homepage styling
│   └── page.tsx                 # Journal & Lab homepage
├── components/
│   ├── BlogListClient.tsx       # Interactive search & discipline filter component
│   ├── Footer.tsx               # Scholarly editorial footer
│   ├── Header.tsx               # Sticky navigation header with brand icon & tabs
│   ├── MobileNav.tsx            # Slide-out drawer navigation
│   ├── PortableTextRenderer.tsx # Rich text renderer (code blocks, callouts)
│   ├── ReadingProgressBar.tsx   # Pinned reading scroll progress indicator
│   ├── SearchModal.tsx          # ⌘K Command Palette modal
│   ├── TableOfContents.tsx      # Sticky scrollspy table of contents
│   ├── ThemeProvider.tsx        # Persistent theme engine context
│   └── ThemeToggle.tsx          # Light/dark mode animated switch
├── lib/
│   ├── getPosts.ts              # Data layer fetching from Sanity with fallback
│   ├── samplePosts.ts           # Curated pre-built manuscripts & data
│   └── toc.ts                   # Heading extraction utility
├── public/
│   └── images/
│       └── synthese-icon.png    # Official Synthese brand mark
├── sanity/
│   ├── env.ts                   # Sanity project ID, dataset, and API version
│   ├── lib/                     # Sanity client & image URL builder
│   ├── schemaTypes/             # Document & object schemas (post, project, garden, etc.)
│   └── structure.ts             # Custom Studio Desk structure with singletons
├── styles/
│   ├── animations.css           # Micro-animations and keyframe reveals
│   ├── typography.css           # Typography definitions and hierarchy
│   └── variables.css            # Color palettes, spacing tokens, and radius scale
├── sanity.config.ts             # Sanity Studio configuration
└── package.json
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Clone Repository
```bash
git clone https://github.com/Sudipjana2001/Synthese.git
cd Synthese
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Sanity project credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_sanity_api_token
```

### 5. Run the Development Server
```bash
npm run dev
```

Visit the following endpoints in your browser:
- **Publication Journal**: [http://localhost:3000](http://localhost:3000)
- **Essays & Manuscripts**: [http://localhost:3000/blog](http://localhost:3000/blog)
- **Admin Studio (CMS)**: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Sanity Studio CMS Structure

The embedded Sanity Studio at `/studio` provides intuitive, singleton-driven editing for all aspects of the site:

- **Editorial Content**:
  - `post` — Long-form treatises, manuscripts, and papers with rich markdown/code blocks, DOI, reading time, and author references.
  - `project` — Experimental WebGL sandboxes, code repositories, and interactive simulations.
  - `gardenNote` — Digital garden field notes categorized by growth stage (🌱 Seedling, 🌿 Budding, 🌳 Evergreen).
  - `timeline` — Academic career milestones and institutional affiliations.
- **Page Singletons** (Edit page text without modifying code):
  - `homePage`, `blogPage`, `projectsPage`, `gardenPage`, `aboutPage`, `siteSettings`.
- **Taxonomies & People**:
  - `category` — Research disciplines and topic taxonomy.
  - `author` — Principal investigators, fellows, and contributors with bio & avatar.

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts development server on port 3000 |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the production server |
| `npm run lint` | Runs Next.js ESLint verification |
| `npx tsc --noEmit` | Runs strict TypeScript type-checking |

---

## License

Curated under the **CC-BY-4.0** Computational Press License. Code is open-sourced under the **MIT License**.
