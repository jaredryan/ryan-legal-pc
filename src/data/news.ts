// News & press releases. No CMS — each release is one entry in
// `newsArticles` below; /news/ and /news/<slug>/ (src/pages/news/) render
// from this list, and @astrojs/sitemap picks up every generated route
// automatically.
//
// Adding an item: copy an entry, fill in the fields, drop the original PDF
// in public/news/ and point `pdfUrl` at it, deploy.

export type NewsBodyBlock = string | { html: string } | { heading: string } | { note: string }

export interface NewsArticle {
  /** URL segment — derived from the real headline, e.g. 'ryan-legal-pc-opens-new-office'. Becomes /news/<slug>/. */
  slug: string
  /** Shown as the eyebrow label and in the list's "Read …" link. */
  type: 'Press Release' | 'Court Filing' | 'Announcement'
  /** The headline — the page's H1, <title>, and JSON-LD headline. */
  title: string
  /** One- or two-line deck under the headline; also the default meta/OG description. */
  summary: string
  /** Optional separate meta description (~150 chars) when the summary isn't a good fit. */
  seoDescription?: string
  /** ISO calendar date, YYYY-MM-DD. */
  datePublished: string
  /** ISO calendar date, YYYY-MM-DD — only when the release was materially revised. */
  dateModified?: string
  /** Optional social-share overrides; default to `title` / the description. */
  ogTitle?: string
  ogDescription?: string
  /** Optional site-relative share image (e.g. '/news/foo-og.png', ideally 1200×630). Defaults to the site OG image. */
  image?: string
  /** Optional site-relative or absolute URL of the original PDF (linked at the top and bottom of the article). The HTML page stays canonical. */
  pdfUrl?: string
  /** PDF link text; defaults to 'View original <type> (PDF)'. */
  pdfLabel?: string
  /** When `body` is only an excerpt (e.g. a complaint's introduction), a note shown above the bottom PDF link pointing readers to the full document. */
  excerptNote?: string
  /** Text of the release: plain strings are paragraphs; `{ html }` is a paragraph with inline emphasis from the source; `{ heading }` renders an H2; `{ note }` renders a small footnote-style paragraph. */
  body: NewsBodyBlock[]
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'clinica-sierra-vista-sues-national-law-firm-and-former-board-member',
    type: 'Press Release',
    title: 'Clinica Sierra Vista Sues National Law Firm and Former Board Member Over Botched Investigation',
    summary:
      'Clinica Sierra Vista’s lawsuit alleges that Feldesman attorneys and a former Board member, none of them licensed to practice law in California, botched a workplace investigation for which the firm billed more than $500,000. It seeks at least $1 million in damages.',
    seoDescription:
      'Clinica Sierra Vista sues Feldesman attorneys and a former Board member over a workplace investigation allegedly conducted without California licensure.',
    datePublished: '2026-09-17',
    // The press release summarizes the complaint, which is the linked PDF.
    pdfUrl: '/news/clinica-sierra-vista-complaint-2026-09-16.pdf',
    pdfLabel: 'View filed complaint (PDF)',
    // Verbatim from the September 17, 2026 press release, except for
    // corrected typos — do not reword without the client's sign-off.
    body: [
      {
        html: '<strong>Bakersfield, California</strong>. On September 16, 2026, Clinica Sierra Vista, a federally qualified health center headquartered in Bakersfield, California and honored as a Community Health Center National Quality Leader in its care for the medically underserved, filed a lawsuit against nationally known law firm Feldesman, LLP, its managing partner Edward T. Waters and other firm attorneys, as well as Mario Valenzuela, a former Clinica Sierra Vista Board Member and Treasurer. The lawsuit alleges that the Feldesman attorneys and Valenzuela—also an attorney—botched a workplace investigation that gave rise to a recently publicized lawsuit against Clinica Sierra by two employees whose allegations are largely based on false and inaccurate allegations resulting from the shoddy and mishandled investigation. The allegations in the lawsuit detail how a team of at least <strong><em>seven</em></strong> Feldesman attorneys directed by managing partner Waters billed more than $500,000 working on the investigation over a period of several months and not a single one of these attorneys—including Waters—was actually licensed in California and therefore not authorized to conduct or participate in a California workplace investigation. The lawsuit also alleges that Board Member Valenzuela—who also holds himself out as an attorney practicing in California and who conducted initial interviews and provided legal counsel and advice as part of the investigation and acted as a primary liaison between the Feldesman law firm and the Clinica Sierra Board—is likewise not licensed to practice law in California and, perhaps more significantly, had a conflict of interest even participating in the investigation as he had expressed considerable interest in the recent past in taking over the CEO position at Clinica Sierra Vista and had been lobbying (now former) Board members to do so.',
      },
      'The lawsuit further alleges that contrary to a recently publicized lawsuit by disaffected employees, the Feldesman investigation was not interfered with or stopped by the Clinica Sierra Board or legal counsel; it was the Feldesman law firm who quit the investigation and withdrew from representing Clinica Sierra Vista just days after a Clinica Board report detailing their lack of California licensure was leaked by Valenzuela to Waters even though the report was marked confidential, attorney-client privileged and not to be provided to Waters or the Feldesman law firm. The allegations also detail how the investigation was taken over and completed by Russell K. Ryan, an independent California-licensed attorney with more than 30 years’ experience working with health clinics such as Clinica Sierra Vista and conducting workplace investigations, who found no evidence of wrongdoing, of any type of unlawful scheme of senior management seeking to establish a separate clinic at Clinica Sierra Vista, workplace retaliation, financial irregularities, improper consulting agreements, or questionable accounting practices (which recent audited financial statements confirm). The lawsuit further details how Clinica Sierra Vista actually opened a new clinic, Westpoint, at the same site referenced in the recently publicized case and staffed as a standard and typical clinic site by CSV providers and employees.',
      'The lawsuit alleges claims against Feldesman, its attorneys and Valenzuela arising out of the mishandled investigation for unauthorized practice of law, professional negligence, breaches of fiduciary duty and other duties of loyalty, fraud, misrepresentation, corporate waste, unfair competition and breach of contract. Clinica Sierra Vista seeks at least $1 million in damages plus attorney’s fees, costs, disgorgement and return of all attorney’s fees paid to Feldesman, and indemnity for all other costs and damages related to their misconduct.',
      'For further information, please feel free to contact Clinica Sierra Vista’s legal counsel, Russell K. Ryan, at (559) 499-4000.',
    ],
  },
]

/** Newest first. */
export const sortedNewsArticles = [...newsArticles].sort((a, b) => b.datePublished.localeCompare(a.datePublished))

export const newsArticlePath = (article: Pick<NewsArticle, 'slug'>) => `/news/${article.slug}/`

export const newsArticleDescription = (article: NewsArticle) => article.seoDescription ?? article.summary

/** 'November 1, 2026'. Formatted in UTC so a date-only ISO string never shifts a day with the build machine's timezone. */
export const formatNewsDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
