// News & press releases. No CMS — each release is one entry in
// `newsArticles` below; /news/ and /news/<slug>/ (src/pages/news/) render
// from this list, and @astrojs/sitemap picks up every generated route
// automatically.
//
// Adding an item: copy an entry, fill in the fields, drop the original PDF
// in public/news/ and point `pdfUrl` at it, deploy.

export type NewsBodyBlock = string | { heading: string } | { note: string }

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
  /** Text of the release: plain strings are paragraphs; `{ heading }` renders an H2; `{ note }` renders a small footnote-style paragraph. */
  body: NewsBodyBlock[]
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'ryan-legal-files-complaint-on-behalf-of-clinica-sierra-vista',
    type: 'Court Filing',
    title: 'Ryan Legal, PC Files Complaint on Behalf of Clinica Sierra Vista',
    summary:
      'Filed in Kern County Superior Court, the complaint alleges that Feldesman, LLP attorneys not licensed to practice law in California provided legal services to Clinica Sierra Vista, a California nonprofit health center. Claims include breach of fiduciary duty and the unauthorized practice of law.',
    seoDescription:
      'Ryan Legal, PC complaint for Clinica Sierra Vista alleging breach of fiduciary duty and the unauthorized practice of law by Feldesman, LLP attorneys.',
    datePublished: '2026-09-16',
    pdfUrl: '/news/clinica-sierra-vista-complaint-2026-09-16.pdf',
    pdfLabel: 'View filed complaint (PDF)',
    excerptNote:
      'The text above is the introduction to the complaint as filed. The complete complaint, including the facts alleged and all causes of action, is available in the original PDF.',
    // Verbatim from the filed complaint (Introductory Allegations, ¶¶ 1–11,
    // with footnote 1), including its original typos — do not edit.
    body: [
      'Plaintiff Clinica Sierra Vista (“Plaintiff”), a California non-profit corporation, alleges as follows:',
      { heading: 'Introductory Allegations' },
      '1. Plaintiff Clinica Sierra Vista (“Plaintiff’ or “Clinica Sierra Vista”) is a non-profit corporation organized and existing under the laws of the State of California, with its principal place of business located in the City of Bakersfield, County of Kern, State of California. It operates and is designated as a federally qualified health center (“FQHC”) and provides comprehensive primary health care services to the medically underserved and indigent (often migrant farm-worker) populations in underserved rural and urban communities. The services are funded through state and federal grants, public benefit programs such as Medi-Cal and Medicare, and private insurance, and has more than 40 locations throughout the San Joaquin Valley as well as in Inyo County. These include more than 26 community health centers as well as dental and behavioral health centers, serving more than 200,000 community members, and is a community health center national quality leader.',
      '2. Defendant Mario A. Valenzuela is an individual residing in the City of Bakersfield, County of Kern, State of California. At all relevant times, Valenzuela was serving as a member of the Board of Directors of Clinica Sierra Vista and served in the officer position of Treasurer.',
      '3. Defendant Feldesman LLP (“Feldesman”), formerly known as Feldesman Leifer LLP and formerly known as Feldesman, Tucker, Leifer, Fidell, LLP, is, on information and belief, a District of Columbia limited liability partnership engaged in the practice of law with its principal place of business at 1129 20th Street NW, Suite 400, Washington, D.C. 20036. As detailed herein, while Feldesman has an office located in Sacramento, California—which confers personal jurisdiction on the firm for this action—the Feldesman attorneys who provided the legal services detailed in this complaint were not licensed to practice law in the State of California, and billing records and documentation generated based on the work provided do not establish that Feldesman ever consulted with any of its attorneys located in the Sacramento, California office or any other attorneys in their firm authorized to practice law in California to provide the requested legal investigatory services with one notable exception detailed below,¹ other than after they learned that Plaintiff had discovered their lack of licensure. These includes, without limitation, defendants Edward T. Waters and Stephen Kuperberg, and Natalie S. Lesnick, as well as attorneys Brendan M. Tyler, and Adam H. Oppenheim, who all appear on the invoices Feldesman sent to Clinica Sierra Vista.',
      '4. Defendant Edward T. Waters is an attorney licensed to practice law in the State of Virginia and Washington, D.C. and is the managing partner of Feldesman. Waters holds himself out as an expert in healthcare law, governance, crisis management, internal investigations and litigation, with specific reference to FQHCs. As noted, Waters is not licensed to practice law in the State of California, yet he provided legal representation, advice, and work to Clinica Sierra Vista and its Board of Directors regarding matters of state and federal law, governance, board authority, investigative procedures, alleged misconduct by management, the necessity of continuing the investigation, etc. This work included providing legal counsel with regard to compliance with California law regarding the governance of non-profit corporations organized and operating in California, conducting an investigation compliant with California and federal law, and other types of legal work impacted by California law.',
      '5. Waters oversaw the internal investigation detailed below and traveled to Bakersfield, California several times to meet with and interview individuals in connection with the investigation. In doing so, Feldesman’s invoices show that Waters billed 157 hours to Clinica Sierra Vista between October 2025 through May 2026 at a rate of $720.00 per hour for a total exceeding $113,000.00 without California licensure. Clinica Sierra is also informed and believes that Waters regularly performs other legal work in the State of California for both health care clients and Head Start clients.',
      '6. Defendant Stephen Kuperberg is an attorney licensed to practice law in the State of Maryland and the District of Columbia and is a partner in Feldesman and holds himself out as having expertise in healthcare law, litigation and government investigations. Kuperberg is not licensed to practice law in the State of California, yet he provided legal representation, advice, and work to Clinica Sierra Vista and its Board of Directors regarding matters of state and federal law, governance, board authority, investigative procedures, alleged misconduct by management, the necessity of continuing the investigation, etc. This work included providing legal counsel with regard to compliance with California law regarding the governance of non-profit corporations organized and operating in California, conducting an investigation compliant with California and federal law, and other types of legal work impacted by California law.',
      '7. Kuperberg was perhaps the attorney most actively involved in the oversaw the internal investigation detailed below and traveled to Bakersfield, California several times to meet with and interview individuals in connection with the investigation. In doing so, Feldesman’s invoices show that Kuperberg billed over 344 hours to Clinica Sierra Vista between October 2025 through May 2026 at a rate of $675.00 per hour for a total exceeding $232,000.00 without California licensure. Clinica Sierra is also informed and believes that Kuperberg regularly performs other legal work in the State of California for health care clients.',
      '8. Natalie S. Lesnick is an attorney licensed to practice law in the State of Ohio and the District of Columbia, is “Health Care Compliance Counsel” at Feldesman, and holds herself out as having expertise in healthcare law with specific reference to FQHCs and working “closely with clients to develop, implement, and monitor compliance programs aligned with federal, state, and industry standards and supports healthcare providers with compliance program effectiveness evaluations, compliance risk assessments, policy development, internal investigations,” etc. Lesnick is not licensed to practice law in the State of California yet provided research, advice and counsel for the internal investigation that included discussions and analysis regarding witness interviews, preparation of board minutes and other matters that would have required analysis of both California and federal law, governance, board authority, investigative procedures, alleged misconduct by management, the necessity of continuing the investigation, etc. This work would have required research and analysis of California law regarding the governance of non-profit corporations organized and operating in California, conducting an investigation compliant with California and federal law, and other types of legal work for Clinica Sierra on which California law impacted. Feldesman’s invoices show that Lesnick billed over 105 hours to Clinica Sierra Vista between October 2025 through May 2026 at a rate of $435.00 per hour for a total exceeding $45,675.00 without California licensure. Clinica Sierra Vista is also informed and believes that Lesnick regularly performs other legal work in the State of California for health care clients.',
      '9. Plaintiff is unaware of the true names and capacities of defendants sued herein as DOES 1 through 100, inclusive, and therefore sues these defendants by such fictitious names. Plaintiff will seek leave of court to amend this complaint to allege the true names and capacities of these defendants when the same has been ascertained. Plaintiff is informed and believes and thereon alleges that each of the fictitiously-named defendants is responsible in some manner for the occurrences alleged herein, and Plaintiff’s injuries are proximately caused by their misconduct.',
      '10. Defendants, and each of them, agreed and acted in concert to accomplish unlawful objectives or lawful objectives through unlawful means.',
      '11. Defendants, and each of them, participated in a common plan to continue and expand the investigation despite conflicts of interest, licensing deficiencies, and other material concerns.',
      {
        note: '¹ As discussed below, Valenzuela leaked a copy of a report provided by the lawyer providing a second opinion who had discovered the lack of licensure by the attorneys identified herein. At that point, Feldesman had one of its California-licensed attorneys analyze that issue, consult with ethics counsel, then abruptly withdrew from further representation of Plaintiff. Sadly, but on brand, Feldesman actually billed Plaintiff for its work in discovering its error and consulting with ethics counsel.',
      },
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
