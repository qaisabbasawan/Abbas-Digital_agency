/* One-off seeder: publishes a single Industry Insights blog on optimizing for
   AI search (AI Overviews, AI Mode, ChatGPT) — companion piece to a LinkedIn
   post on the same topic, so the post can link straight to it.
   Run:  node scripts/seed-blog-ai-search-seo-2026.mjs
   Re-runnable — upserts on id, so it won't create duplicates. */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bwhqdzzlsrjomqppoide.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHFkenpsc3Jqb21xcHBvaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDU4MzUsImV4cCI6MjA5NDQyMTgzNX0.FuK7Yy7M9DOnYidE5gxbXmLch0eqP36NgD8pC7N_-Gw'
)

const AUTHOR = 'Abbas Digital Agency'

const post = {
  id: 'seed-ai-search-seo-2026',
  category: 'Industry Insights',
  date: '2026-08-27',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80',
  title: 'SEO Is Changing: How to Optimize for AI Overviews, AI Mode, and ChatGPT',
  metaTitle: 'AI SEO Guide: How to Optimize for AI Overviews, AI Mode & ChatGPT',
  metaDesc: "Google's AI Overviews and tools like ChatGPT are changing how people find businesses. Here's how to optimize your content so AI systems find, trust, and cite you.",
  tags: 'AI SEO, AI search optimization, AI Overviews, generative engine optimization, GEO, answer engine optimization, ChatGPT SEO, Google AI Mode, topical authority, future of search',
  content: `For twenty years, "SEO" meant one thing: earn a spot in ten blue links and hope for a click. That world is not gone, but it is no longer the whole picture. Google's AI Overviews now sit above traditional results on a large share of searches, AI Mode answers entire questions without a single click-through, and a growing number of people start their research in ChatGPT, Perplexity, or Claude instead of a search box at all. The ranking game hasn't disappeared — but a second game has started next to it, and most businesses haven't noticed they're already playing it.

## What Actually Changed

Search used to be a matching problem: rank the pages most relevant to a query, list them, let the user pick. AI-powered search is a synthesis problem: an AI system reads across many sources, decides which ones are trustworthy and clear enough to draw from, and writes a direct answer — sometimes with citations, sometimes without. That shift changes what "getting found" even means.

- **The unit of ranking is shrinking.** AI systems don't just rank your page — they extract a fact, a definition, or a paragraph from it. A page can be well-optimized for keywords and still never get pulled into an AI answer if the actual information isn't stated clearly enough to lift out.
- **Trust signals matter more than keyword density.** An AI system deciding what to cite is effectively asking "does this source know what it's talking about?" — clear authorship, consistent expertise across your content, and structured data all feed that judgment.
- **Zero-click is now a majority outcome for many queries.** When AI Overviews or AI Mode fully answer a question, the user often never visits a website at all. Visibility inside the answer — being named as the source — has become as valuable as the click used to be.

## Traditional SEO vs. AI Search Optimization

These aren't competing strategies — the second builds on the first. But the emphasis shifts in a few concrete ways.

| Traditional SEO | AI Search Optimization |
|---|---|
| Optimize a page to rank for a keyword | Optimize a fact or answer to be extractable and citable |
| Success = position on the results page | Success = being named/cited inside the AI-generated answer |
| Backlinks as the primary trust signal | Backlinks + structured data + consistent topical authority across your site |
| One page competes for one query | A cluster of connected pages builds authority on a topic |
| Meta description written for a human skimming results | Content written to directly and unambiguously answer the question |

> The goal is no longer just to rank on Google. The goal is to become a source that AI can understand, trust, and surface when people search.

## Five Things You Can Start Doing This Month

None of this requires a rebuild. It requires being deliberate about a few things most sites already do poorly.

1. **Answer the real question in the first two sentences.** AI systems extract answers, they don't hunt for them. If a visitor has to scroll past three paragraphs of scene-setting to find the actual answer, so does the AI system trying to summarize your page — and it will often just skip you for a competitor who states it plainly.
2. **Build topical authority, not isolated posts.** One great article on a topic is a data point. Ten connected pieces that all reference each other and cover a topic from different angles is a body of expertise — and that's what AI systems weigh when deciding whose "understanding" to trust.
3. **Use structured data (schema markup) properly.** JSON-LD for articles, FAQs, organizations, and services gives AI crawlers an explicit, machine-readable map of what your content is and who's behind it, instead of making them infer it from prose.
4. **Make your site's structure legible.** Clear headings, logical internal linking, and a sitemap that actually reflects your content hierarchy all help AI crawlers understand how your pages relate to each other — which is exactly how they decide what "authority" on a topic looks like on your site.
5. **Keep expertise consistent across the site, not just on one page.** If your "about" page, your service pages, and your blog all reinforce the same specific expertise, that consistency is a trust signal. Scattered, generic content across a site works against you even if any single page reads well.

## What Doesn't Change

It's tempting to treat "AI search" as an entirely new discipline, but the fundamentals underneath it are the same ones that have always mattered: genuinely useful content, a fast and well-structured site, and real expertise instead of thin, generic pages written to hit a word count. AI systems are, in a sense, just better at detecting the difference between real expertise and content that only looks like it on the surface. The businesses that were already writing helpful, specific, well-organized content are the ones AI search rewards first — this shift raises the cost of shortcuts more than it invents new rules.

## Frequently Asked Questions

**Do I need to abandon traditional SEO to optimize for AI search?**
No — traditional SEO fundamentals (site speed, clear structure, quality backlinks, relevant content) are still the foundation. AI search optimization adds a layer on top: making sure your content is structured and stated clearly enough for an AI system to extract and trust, not just for a search algorithm to rank.

**How do I know if AI Overviews are already showing up for my industry?**
Search a handful of your core service and product terms yourself and watch for an AI-generated summary above the traditional results. If it's already appearing for your key terms, your competitors are being cited there or missing from it right now — worth checking either way.

**Does schema markup actually help with AI search?**
Yes — structured data doesn't guarantee a citation, but it removes ambiguity for both traditional crawlers and AI systems about what a page is, who wrote it, and what specific questions it answers, which makes it easier to be selected as a trustworthy source.

**Is this the same thing people mean by "GEO" (generative engine optimization)?**
Largely, yes — GEO and AI search optimization describe the same underlying shift: optimizing content to be understood, trusted, and surfaced by generative AI systems, not just ranked by traditional search algorithms.

## Make Sure AI Search Can Find You Before Your Competitors Do

Search is evolving faster than most businesses' content strategy is keeping up with. [Talk to our team](/contact) for a free consultation — we'll audit how your site currently shows up (or doesn't) across AI Overviews and AI-powered search, and map out the content structure, schema, and topical authority work needed to fix it. If you want the technical and content foundation done right, our [digital marketing](/services/digital-marketing) and [web development](/services/web-development) teams handle exactly this kind of work end to end.`,
}

const row = {
  id:         post.id,
  title:      post.title,
  slug:       'ai-search-seo-optimizing-ai-overviews-chatgpt',
  content:    post.content,
  category:   post.category,
  status:     'published',
  author:     AUTHOR,
  date:       post.date,
  updated_at: post.date,
  image:      post.image,
  meta_title: post.metaTitle,
  meta_desc:  post.metaDesc,
  tags:       post.tags,
  views:      0,
}

const { data, error } = await supabase.from('blogs').upsert([row], { onConflict: 'id' }).select('id, slug, status')

if (error) {
  console.error('❌ Upsert failed:', error)
  process.exit(1)
}
console.log(`✅ Upserted ${data.length} blog(s):`)
data.forEach(d => console.log(`   • [${d.status}] /blog/${d.slug}`))
