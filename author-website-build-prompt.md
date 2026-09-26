# Build Prompt: Modern Author Website (Portfolio + Blog + Book Store)

Copy everything below into your AI coding tool (Claude Code, Cursor, v0, etc.) as the project brief.

---

## 1. Project Summary

Build a modern, responsive author website in **React** that blends three things into one cohesive site:

1. **Portfolio / personal brand** — who the author is, their story, press mentions, credibility
2. **Blog / content hub** — long-form posts, updates, behind-the-scenes writing
3. **E-commerce** — a storefront to sell the author's published books (physical, ebook, audiobook editions)

**Design direction:** Take the warm, editorial, reader-friendly *content structure* of a classic author site (hero book showcase, press quotes, "About the Author" with a friendly portrait, "Also in Stores," email list callout, giveaway/promo banner) and rebuild it with the **bold, high-production, conversion-focused visual language of a premium creative agency** — generous whitespace, oversized confident typography, large product/hero imagery with soft shadows and depth, smooth scroll-triggered animation, rounded-but-sharp component edges, and a restrained accent-color-on-neutral palette rather than a busy multi-color layout.

---

## 2. Tech Stack

- **Framework:** React 18+ with **Next.js** (App Router) for SSR/SEO (blog + product pages need to be crawlable)
- **Styling:** Tailwind CSS + CSS variables for theming
- **Animation:** Framer Motion (scroll reveals, hover states, page transitions) — subtle, never gimmicky
- **UI primitives:** shadcn/ui (Radix-based) for accessible dialogs, dropdowns, tabs, accordions
- **State/cart:** Zustand or React Context for cart state; persist to localStorage
- **Commerce backend:** Stripe Checkout (or Shopify Storefront API / Snipcart if headless commerce is preferred) — book formats (hardcover, paperback, ebook, audiobook) as product variants
- **CMS for blog:** MDX files, or a headless CMS (Sanity / Contentful) if the author wants a no-code editing panel
- **Images:** next/image with responsive sizing and blur placeholders
- **Deployment:** Vercel

---

## 3. Visual & Brand Direction

- **Typography:** One large, confident serif or high-contrast display font for headlines (evokes "literary" without being old-fashioned), paired with a clean grotesk/sans for body text and UI. Big type scale jumps (headline sizes should feel oversized/editorial, not timid).
- **Color palette:** A neutral base (off-white / warm white + charcoal or deep ink) plus **one signature accent color** tied to the author's brand (e.g., a deep berry, teal, or burgundy — reference the pink/magenta energy of a classic romance-author palette if that fits the genre, but keep it to one dominant accent, not many).
- **Imagery:** Large hero visuals — book cover(s) styled as a 3D/angled mockup or floating stack, soft drop shadows, occasional full-bleed photography of the author. Avoid clip-art or stock-photo feel.
- **Layout patterns to borrow from premium agency design:**
  - Full-width hero with headline + supporting subtext + single strong CTA, product visual anchored right or center
  - Editorial "quote strip" (press blurbs / reviews) directly under the hero, small caps or italic treatment
  - Alternating two-column sections (image/copy, copy/image) as you scroll — not a repetitive grid
  - Sticky or minimal nav that condenses on scroll
  - Rounded-corner cards with soft shadows for products and blog posts, consistent radius system
  - Micro-interactions: buttons that shift on hover, images that scale slightly on hover, numbers/stats that count up, sections that fade/slide in on scroll
  - A bold, high-contrast footer CTA block (mailing list / newsletter signup) before the final footer

---

## 4. Site Architecture (Pages/Routes)

```
/                      → Home (hero, featured/new book, press quotes, latest blog teaser, newsletter CTA)
/about                 → Author bio, photo, timeline/press, FAQ accordion
/books                 → Shop index: grid of all books, filter by series/genre/format
/books/[slug]          → Single book product page (cover gallery, formats + price, add to cart, synopsis, reviews, "readers also bought")
/blog                  → Blog index (filter/search, featured post, paginated list)
/blog/[slug]           → Single post (MDX content, author bio card, related posts, share buttons)
/cart                  → Cart drawer/page
/checkout              → Stripe-hosted or embedded checkout
/contact               → Contact form + social links
/newsletter (optional) → Dedicated sign-up landing page for lead magnets
```

---

## 5. Core Reusable Components (build these first)

- `<Navbar />` — logo, links (About / Books / Blog / Contact), cart icon with item-count badge, mobile hamburger with animated slide-in menu, condenses/adds shadow on scroll
- `<Hero />` — headline, subhead, CTA button(s), animated book cover mockup (parallax or slight float animation)
- `<PressQuoteStrip />` — logos/quotes from reviewers, auto-scroll or static row
- `<BookCard />` — cover image, title, one-line hook, price, "View" / quick "Add to cart"
- `<BookGrid />` — responsive grid of `<BookCard />`, filter/sort controls
- `<BookDetail />` — image gallery with format switcher (hardcover/ebook/audio), sticky add-to-cart on scroll, expandable synopsis/reviews tabs
- `<AuthorBioCard />` — portrait, short bio, "read more" link — reused on Home, About, and Blog post footer
- `<BlogCard />` — thumbnail, title, excerpt, date, read-time
- `<BlogPostLayout />` — MDX content wrapper with pull-quotes, styled headings, share bar
- `<NewsletterCTA />` — full-width high-contrast band with email input + submit
- `<CartDrawer />` — slide-in panel, line items, quantity steppers, subtotal, checkout button
- `<Footer />` — nav links, social icons, mailing list, legal links
- `<SectionReveal />` — wrapper component using Framer Motion's `whileInView` for consistent scroll-in animation across all sections
- `<Badge />` / `<PromoBanner />` — for "New Release," "Bestseller," giveaway/promo callouts

---

## 6. Content Model (what data each section needs)

**Book**
```ts
{
  slug, title, series?, coverImage, gallery: string[],
  synopsis, formats: [{ type: "hardcover" | "paperback" | "ebook" | "audiobook", price, stock, retailerLinks? }],
  publishDate, isFeatured, isNew, reviews: [{ source, quote, url }]
}
```

**Blog Post**
```ts
{ slug, title, excerpt, coverImage, publishDate, tags: string[], readTimeMinutes, bodyMDX }
```

**Author**
```ts
{ name, tagline, bio, longBio, portraitImage, pressMentions: string[], socialLinks: {} }
```

---

## 7. UX / Functional Requirements

- Fully responsive (mobile-first), smooth on touch devices
- Cart persists across sessions (localStorage) and page reloads
- Blog supports tag filtering and basic search
- Book detail pages have proper SEO metadata + Open Graph tags (important for social shares of new releases)
- Accessible: semantic HTML, keyboard-navigable nav/cart/modals, sufficient color contrast, alt text on all covers/photos
- Fast: optimized images, lazy-load below-the-fold sections, Lighthouse performance target 90+
- Newsletter and contact forms should have clear success/error states and basic validation

---

## 8. Deliverable Expectations

- Clean, componentized React/Next.js codebase (no giant single-file pages)
- Tailwind config with the brand's color/typography tokens defined centrally (no magic hex values scattered in components)
- Placeholder content and images clearly marked so the author can swap in real book covers, bio, and posts
- A short README explaining how to add a new book or blog post

---

### Reference inspiration to keep in mind while designing
- **Content/structure reference:** a classic author site — hero book showcase with press quotes, "also in stores" secondary release, warm About section, monthly giveaway/promo banner, newsletter footer CTA
- **Visual/interaction reference:** premium agency-style e-commerce and brand sites — bold oversized type, large product hero imagery with depth/shadow, editorial alternating layouts, smooth scroll-triggered reveals, restrained one-accent-color palette, sticky product actions on detail pages
