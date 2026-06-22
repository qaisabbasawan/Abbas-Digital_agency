/* One-off seeder: inserts 5 SEO-optimised Montana, USA blogs into Supabase.
   Run:  node scripts/seed-montana-blogs.mjs
   Re-runnable — upserts on id, so it won't create duplicates. */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bwhqdzzlsrjomqppoide.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHFkenpsc3Jqb21xcHBvaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDU4MzUsImV4cCI6MjA5NDQyMTgzNX0.FuK7Yy7M9DOnYidE5gxbXmLch0eqP36NgD8pC7N_-Gw'
)

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const AUTHOR = 'Abbas Digital Agency'

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&h=630&fit=crop&q=80`

const posts = [
  /* ───────────────────────── WEB DESIGN MONTANA (most recent → featured) ── */
  {
    id: 'seed-web-design-montana-2026',
    category: 'Web Development',
    date: '2026-06-21',
    image: img('1461749280684-dccba630e2f6'),
    title: 'Web Design in Montana 2026: How Bozeman, Billings & Missoula Businesses Win Online',
    metaTitle: 'Web Design Montana 2026 | Bozeman, Billings & Missoula Web Designers',
    metaDesc: 'A 2026 web design guide for Montana businesses. Learn what a high-converting website costs, the features that rank in Bozeman, Billings & Missoula, and how to choose a web designer.',
    tags: 'web design Montana, web design Bozeman, web design Billings, web designer Missoula, website design Montana, Montana web development, small business website Montana',
    content: `If you run a business in Montana — from a Bozeman outfitter to a Billings law firm or a Missoula restaurant — your website is now your hardest-working employee. In 2026, Montana customers research almost everything on their phones before they call, visit, or buy. This guide explains exactly what a modern, high-converting website looks like for Montana businesses, what it should cost, and how to choose the right web designer.

## Why Montana Businesses Need a Better Website in 2026

Montana's economy is booming. Tourism around Glacier and Yellowstone, a fast-growing tech scene in Bozeman, and a steady stream of new residents and businesses mean more competition for attention online. A dated, slow, or mobile-unfriendly website quietly costs you customers every single day.

Here's what's changed: Google now ranks websites primarily on **mobile experience, page speed, and helpful content**. If a potential customer in Missoula searches "best HVAC company near me" and your site takes five seconds to load, they're gone before it even appears.

## What a High-Converting Montana Website Includes

A website that actually generates leads and sales — not just "looks nice" — needs these fundamentals:

- **Fast loading on mobile** — most Montana searches happen on phones, often on rural connections. Speed is non-negotiable.
- **Clear local positioning** — your city, service area, and "near me" signals so Google knows you serve Bozeman, Billings, Helena or Great Falls.
- **A single obvious call-to-action** — call now, book online, get a quote — repeated throughout the page.
- **Trust signals** — Google reviews, real photos of your team and work, licenses, and local affiliations.
- **Service and location pages** — a dedicated page for each service and each town you serve.

> A beautiful website that doesn't load fast or rank locally is just an expensive brochure. The goal is a site that turns Montana searchers into paying customers.

## How Much Does Web Design Cost in Montana?

Pricing varies, but here's a realistic 2026 range for Montana businesses:

- **Starter business site (5–7 pages):** a clean, fast, mobile-first website with local SEO basics built in.
- **Lead-generation site:** the above plus service pages, location pages, blog, and conversion tracking.
- **E-commerce / custom build:** online store, booking systems, or custom functionality.

The cheapest option is rarely the best value. A $500 template that never ranks costs far more in lost customers than a properly built site that brings in leads month after month.

## Local SEO: The Montana Advantage

The biggest opportunity for Montana businesses is **local SEO**. Because many Montana towns have less online competition than major US metros, a well-optimized site can rank quickly for searches like "web design Bozeman," "plumber Billings," or "wedding photographer Missoula."

Winning locally means:

- A complete, optimized **Google Business Profile**.
- Consistent name, address, and phone number across the web.
- Genuine, recent customer reviews.
- Location-specific pages with real, helpful content.

## Common Mistakes Montana Businesses Make

- **Using a generic template** with no local focus or speed optimization.
- **Hiding the phone number** or making it hard to contact you.
- **Ignoring mobile** — where the majority of your traffic actually is.
- **No analytics** — so you never know which pages bring in business.

## Frequently Asked Questions

**How long does it take to build a Montana business website?**
A focused business site typically takes two to four weeks — discovery, design, content, and launch — depending on the number of pages and features.

**Will my new website rank on Google in Montana?**
A well-built, fast website with proper local SEO has a strong chance of ranking, especially in less-saturated Montana markets. Ranking is earned over weeks through content and authority, not overnight.

**Do I need a local Montana web designer?**
You need a designer who understands local SEO and your market — whether across town or working remotely. What matters is results: speed, ranking, and conversions.

## Ready for a Website That Actually Brings in Customers?

If your current site is slow, outdated, or simply not bringing in Montana customers, [get a free consultation](/contact). We'll review your website, show you exactly what's holding it back, and build you a fast, modern site designed to rank and convert.`,
  },

  /* ───────────────────────── SEO SERVICES MONTANA ── */
  {
    id: 'seed-seo-services-montana-2026',
    category: 'Digital Marketing',
    date: '2026-06-19',
    image: img('1460925895917-afdab827c52f'),
    title: 'SEO Services in Montana 2026: How to Rank #1 in Billings, Bozeman & Beyond',
    metaTitle: 'SEO Services Montana 2026 | Rank #1 in Billings & Bozeman',
    metaDesc: 'A practical 2026 SEO guide for Montana businesses. Discover the local SEO strategy that ranks you in Billings, Bozeman, Missoula and Great Falls and brings in steady leads.',
    tags: 'SEO Montana, SEO services Montana, local SEO Montana, SEO Billings, SEO Bozeman, SEO company Montana, Montana search engine optimization, rank on Google Montana',
    content: `Every Montana business owner wants the same thing: to show up first when a local customer searches Google. The good news is that ranking in Montana is often easier than in crowded US metros — if you follow a proven SEO strategy. This 2026 guide breaks down exactly how SEO works for Montana businesses and how to rank in Billings, Bozeman, Missoula and Great Falls.

## Why SEO Is the Best Marketing Investment in Montana

Unlike ads that stop the moment you stop paying, SEO builds a lasting asset. Once you rank for "roofing Billings" or "dentist Bozeman," you collect free, high-intent traffic month after month. For Montana's small and mid-sized businesses, that compounding return is unmatched.

And because many Montana markets are less saturated than major cities, businesses that take SEO seriously can climb the rankings **faster** than they could elsewhere.

## The 3 Pillars of Montana SEO

### 1. Local SEO & Google Business Profile

For most Montana businesses, **local SEO is everything**. When someone searches "near me," Google pulls from the local map pack. To win it you need:

- A fully optimized **Google Business Profile** with correct categories, hours, photos and services.
- Consistent **NAP** (name, address, phone) across every directory.
- A steady flow of **genuine reviews** — Google rewards recency and volume.
- **Location pages** for each town you serve.

### 2. On-Page & Technical SEO

Your website has to be technically sound:

- Fast loading on mobile (Core Web Vitals).
- Clear page titles and meta descriptions with Montana keywords.
- Logical structure with a page for every service and city.
- Helpful, original content that answers real customer questions.

### 3. Content & Authority

Google ranks the most helpful, trustworthy result. That means:

- Blog posts answering local questions ("How much does a metal roof cost in Montana?").
- Real expertise and accurate information.
- Quality backlinks from local news, directories and partners.

> The Montana businesses that win at SEO aren't the biggest — they're the ones that consistently publish helpful content and earn local trust.

## How Long Does SEO Take in Montana?

Expect early movement in 1–3 months, with stronger rankings and steady lead flow building over 4–8 months. Less competitive Montana keywords often rank faster than national terms. SEO is a marathon that pays dividends long after the work is done.

## Local SEO Keywords That Win in Montana

Target buyer-intent phrases such as:

- "[your service] + Billings / Bozeman / Missoula / Great Falls / Helena"
- "best [service] near me"
- "[service] company Montana"
- "affordable [service] Montana"

These phrases capture people who are ready to call or buy — not just browsing.

## How to Choose an SEO Company in Montana

- Ask for **real results and case studies**, not vague promises.
- Make sure they focus on **local SEO and Google Business Profile**.
- Demand **transparent reporting** — rankings, traffic, and leads.
- Avoid anyone guaranteeing "#1 in a week." Real SEO is earned.

## Frequently Asked Questions

**Can a small Montana business actually outrank big competitors?**
Yes. With less competition in many Montana markets and a focused local strategy, small businesses regularly outrank larger, less-optimized rivals.

**How much do SEO services cost in Montana?**
Pricing depends on your market and goals. Local SEO for a single-location business is far more affordable than statewide campaigns. The real question is return — good SEO pays for itself in leads.

**Is SEO better than Google Ads?**
They work best together. Ads bring instant traffic; SEO builds free, compounding traffic over time. Start with whichever your budget allows, then combine both.

## Want to Rank #1 in Your Montana Market?

If you're tired of being invisible on Google while competitors get the calls, [get a free SEO consultation](/contact). We'll audit your site, identify your fastest ranking opportunities in Montana, and build a strategy that brings in steady local leads.`,
  },

  /* ───────────────────────── DIGITAL MARKETING MONTANA ── */
  {
    id: 'seed-digital-marketing-montana-2026',
    category: 'Digital Marketing',
    date: '2026-06-17',
    image: img('1512941937669-90a1b58e7e9c'),
    title: 'Digital Marketing for Montana Small Businesses: The 2026 Growth Playbook',
    metaTitle: 'Digital Marketing Montana 2026 | Small Business Growth Playbook',
    metaDesc: 'The complete 2026 digital marketing guide for Montana small businesses — SEO, Google Ads, social media and local strategy that turns clicks into customers across the Treasure State.',
    tags: 'digital marketing Montana, Montana digital marketing agency, online marketing Montana, social media marketing Montana, Google Ads Montana, small business marketing Montana, marketing agency Bozeman',
    content: `Montana businesses face a unique marketing challenge: a vast state, spread-out towns, and customers who increasingly discover, research and buy online. In 2026, the businesses that grow fastest aren't the loudest — they're the ones with a smart, measurable digital marketing system. Here's the complete playbook for Montana small businesses.

## Why Digital Marketing Matters in Montana

With customers spread across Billings, Bozeman, Missoula, Great Falls, Helena and dozens of smaller towns, traditional advertising is expensive and hard to measure. Digital marketing flips that: you can reach the exact customer searching for your service, in the exact town you serve, and track every dollar to a lead or sale.

Add Montana's strong tourism economy and steady population growth, and the opportunity online has never been bigger.

## 1. Local SEO: Your Foundation

For most Montana businesses, local search is the single highest-ROI channel. When someone searches "near me," you want to be in the map pack. That means an optimized Google Business Profile, consistent listings, real reviews, and a fast, local-focused website.

## 2. Google Ads: Demand You Can Buy Today

While SEO builds over months, Google Ads puts you at the top of search results immediately. For Montana businesses, the winning approach is:

- **Search ads** targeting high-intent local keywords.
- **Tight geo-targeting** so you only pay for clicks in your service area.
- **Conversion tracking** so you optimize for actual leads, not clicks.

A well-run campaign focuses on **return on ad spend (ROAS)** — and in less competitive Montana markets, clicks are often cheaper than in major metros.

## 3. Social Media: Building Local Community

Facebook and Instagram are where Montana communities connect. Effective social marketing here is less about going viral and more about:

- Showing real work, real people, and real local stories.
- Engaging with your community and local groups.
- Running targeted local ads to nearby customers.
- Using short-form video to build trust and reach.

## 4. Email & SMS: The Channels You Own

Your customer list is an asset no algorithm can take away. Simple automated flows — welcome messages, seasonal promotions, review requests and re-engagement — quietly produce some of the best returns in marketing.

## 5. Reviews & Reputation

In Montana's tight-knit communities, reputation travels fast. A steady stream of genuine 5-star Google reviews boosts both your rankings and your conversion rate. Make asking for reviews a built-in part of your process.

> The Montana businesses winning online treat marketing as a connected system — local SEO, ads, social and reviews all reinforcing each other — not random one-off efforts.

## Measuring What Matters

Before spending a dollar, set up:

- **Google Analytics 4** with conversion events.
- **Google Search Console** to track keyword rankings.
- **Call and form tracking** so you know which channel drives leads.

Every month, you should be able to answer: *which channel brought in revenue, and which wasted budget?*

## How Much Should a Montana Business Spend?

A healthy rule for Montana SMEs is reinvesting 7–12% of revenue into marketing, split across SEO (long-term), paid ads (short-term demand) and content. Start lean, measure ruthlessly, and scale what works.

## Frequently Asked Questions

**What's the best marketing channel for a Montana small business?**
For most, local SEO and Google Business Profile deliver the highest ROI, followed by targeted Google Ads. The ideal mix depends on your industry and budget.

**Do I need a marketing agency or can I do it myself?**
You can start the basics yourself — claim your Google profile, ask for reviews, post consistently. But a focused agency accelerates results and frees you to run your business.

**How fast will I see results?**
Google Ads can drive leads within days. SEO and social build over weeks to months. A combined strategy delivers both quick wins and lasting growth.

## Ready to Grow Your Montana Business Online?

If you're ready to stop guessing and start growing, [get a free marketing consultation](/contact). We'll map out a custom digital marketing plan for your Montana business — built to bring in real, measurable customers.`,
  },

  /* ───────────────────────── E-COMMERCE MONTANA ── */
  {
    id: 'seed-ecommerce-montana-2026',
    category: 'E-Commerce',
    date: '2026-06-15',
    image: img('1556742049-0cfed4f6a45d'),
    title: 'E-Commerce in Montana 2026: How to Sell Online Beyond Your Local Market',
    metaTitle: 'E-Commerce Montana 2026 | Build an Online Store That Sells',
    metaDesc: 'A 2026 e-commerce guide for Montana businesses. Learn how to build an online store, ship from the Treasure State, and sell your products nationwide profitably.',
    tags: 'ecommerce Montana, online store Montana, Shopify Montana, sell online Montana, ecommerce website Montana, Montana online business, ecommerce development Montana',
    content: `Montana makes incredible products — from handcrafted goods and outdoor gear to ranch products, art, and specialty foods. But with a spread-out local population, the real growth opportunity is selling **beyond Montana** to customers nationwide. In 2026, a well-built online store is the most powerful way for Montana businesses to scale. Here's how to do it right.

## Why E-Commerce Is a Huge Opportunity for Montana

Montana's small local population is exactly why e-commerce is so valuable: an online store removes geography as a limit. A Bozeman leather workshop or a Flathead Valley specialty food brand can sell to customers in New York, Texas and California just as easily as to a neighbor.

E-commerce also runs 24/7. Your store keeps selling while you sleep, work the ranch, or run your shop.

## Choosing the Right E-Commerce Platform

The right platform depends on your products and goals:

- **Shopify** — the easiest, most popular all-in-one platform for most Montana businesses. Great for physical products, fast to launch, and scalable.
- **WooCommerce** — flexible and WordPress-based, ideal if you want full control and own your content.
- **Custom builds** — for unique needs, subscriptions, or large catalogs.

For most Montana small businesses launching or growing online, Shopify offers the best balance of speed, cost and reliability.

## What a High-Converting Montana Online Store Needs

- **Fast, mobile-first design** — most shoppers buy on their phones.
- **Professional product photography** — your photos *are* your storefront.
- **Clear shipping and pricing** — especially important shipping from Montana.
- **Trust signals** — reviews, secure checkout, clear returns policy.
- **A compelling brand story** — "Made in Montana" is a genuine selling advantage.

> Don't underestimate the power of your Montana story. Authenticity, craftsmanship and the "Made in Montana" badge are real competitive advantages online.

## Shipping From Montana: What to Know

Shipping is a key factor for Montana e-commerce. Set yourself up for success by:

- Offering clear, upfront shipping rates (free shipping thresholds boost conversions).
- Using reliable carriers and realistic delivery estimates.
- Considering flat-rate or zone-based shipping to keep costs predictable.
- Highlighting fast, careful packing — especially for handmade or fragile goods.

## Driving Traffic to Your Store

A store with no traffic makes no sales. The proven mix for Montana e-commerce:

- **SEO** — rank for product searches like "handmade leather wallet" or "Montana-made [product]."
- **Google Shopping & Performance Max ads** — put your products in front of ready buyers.
- **Social media & influencers** — Instagram, TikTok and Pinterest showcase products beautifully.
- **Email marketing** — recover abandoned carts and bring back past buyers.

## Frequently Asked Questions

**How much does it cost to build an online store in Montana?**
Costs range from an affordable Shopify setup for a small catalog to a custom build for complex needs. Most small Montana businesses can launch a professional store affordably and scale as sales grow.

**Can I really compete with big online retailers?**
Yes — by focusing on a niche, telling your authentic Montana story, and delivering products and service big retailers can't match.

**How long does it take to launch an online store?**
A focused Shopify store can launch in two to four weeks, including design, product setup and payment configuration.

## Ready to Sell Your Montana Products Online?

If you make something worth selling, the whole country is your market. [Get a free consultation](/contact) and we'll help you build a fast, beautiful online store designed to turn visitors into customers — from Montana to coast to coast.`,
  },

  /* ───────────────────────── LOCAL SEO / GOOGLE BUSINESS PROFILE MONTANA ── */
  {
    id: 'seed-google-business-profile-montana-2026',
    category: 'Digital Marketing',
    date: '2026-06-13',
    image: img('1531746790731-6c087fecd65a'),
    title: 'Google Business Profile for Montana Businesses: The 2026 Local Ranking Guide',
    metaTitle: 'Google Business Profile Montana 2026 | Rank in the Local Map Pack',
    metaDesc: 'Learn how Montana businesses dominate the Google map pack in 2026. A step-by-step Google Business Profile optimization guide for Billings, Bozeman, Missoula and beyond.',
    tags: 'Google Business Profile Montana, Google Maps ranking Montana, local SEO Montana, map pack Montana, Google My Business Montana, near me searches Montana, local listings Montana',
    content: `When a customer in Montana searches "near me," Google shows three businesses at the top in the map pack — and those three get the vast majority of calls and clicks. If you're not one of them, you're invisible. Your **Google Business Profile** is the single most important tool for getting there. Here's the complete 2026 guide for Montana businesses.

## Why Google Business Profile Is Critical in Montana

For local Montana businesses, the map pack is where customers are won. Studies consistently show the top three local results capture most of the clicks and calls. A well-optimized Google Business Profile is often the difference between a phone that rings and one that stays silent.

And because many Montana markets have less competition than major metros, a properly optimized profile can climb to the top of the map pack **quickly**.

## Step 1: Claim and Verify Your Profile

If you haven't already, claim your free Google Business Profile and complete verification. An unverified or incomplete profile won't rank. Make sure your business name, address and phone number are exactly correct — this **NAP consistency** matters everywhere online.

## Step 2: Complete Every Field

Google rewards complete profiles. Fill in:

- **Primary and secondary categories** — be specific and accurate.
- **Service area** — list the Montana towns you serve (Billings, Bozeman, Missoula, Helena, Great Falls).
- **Hours**, including holidays.
- **Services and products** with descriptions and pricing where possible.
- **A keyword-rich business description.**

## Step 3: Add Real, High-Quality Photos

Profiles with photos get far more clicks and direction requests. Upload:

- Your storefront or location (helps customers find you).
- Your team and your work.
- Products, before-and-afters, and real Montana settings.

Add new photos regularly — Google favors active profiles.

## Step 4: Get Reviews — Consistently

Reviews are one of the strongest local ranking factors, and in Montana's close-knit communities they carry huge weight. To win:

- Ask every happy customer for a review — make it a habit.
- Respond to **every** review, positive or negative, professionally.
- Aim for a steady stream, not a one-time burst. Recency matters.

> Reviews influence both your ranking and whether searchers choose you. A profile with 80 recent five-star reviews beats a competitor with 12 every time.

## Step 5: Use Google Posts and Q&A

Keep your profile active with:

- **Posts** — promotions, updates, events and offers.
- **Q&A** — answer common questions yourself before competitors or random users do.
- **Messaging** — enable it so customers can reach you instantly.

## Step 6: Connect a Strong Local Website

Your profile and website work together. A fast, local-focused website with location pages, matching NAP details, and embedded Google reviews reinforces your profile and boosts rankings.

## Common Mistakes Montana Businesses Make

- Leaving the profile incomplete or unverified.
- Inconsistent name, address or phone across listings.
- Ignoring reviews — or never asking for them.
- Never posting updates, so the profile looks abandoned.

## Frequently Asked Questions

**How long until my profile ranks in the Montana map pack?**
With consistent optimization and steady reviews, many Montana businesses see strong map-pack movement within 1–3 months, especially in less competitive towns.

**Is Google Business Profile really free?**
Yes — the profile itself is completely free. The investment is in optimizing it well and keeping it active, which is where most businesses fall short.

**Can I rank in multiple Montana towns?**
Yes. With a proper service-area setup, location pages on your website, and local reviews, you can rank across multiple Montana communities.

## Want to Dominate the Montana Map Pack?

If competitors keep showing up above you on Google Maps, [get a free local SEO consultation](/contact). We'll audit your Google Business Profile, fix what's holding it back, and build a plan to put your business at the top of the map pack across Montana.`,
  },
]

const rows = posts.map(p => ({
  id:         p.id,
  title:      p.title,
  slug:       slugify(p.title),
  content:    p.content,
  category:   p.category,
  status:     'published',
  author:     AUTHOR,
  date:       p.date,
  updated_at: p.date,
  image:      p.image,
  meta_title: p.metaTitle,
  meta_desc:  p.metaDesc,
  tags:       p.tags,
  views:      0,
}))

const { data, error } = await supabase.from('blogs').upsert(rows, { onConflict: 'id' }).select('id, slug, status')

if (error) {
  console.error('❌ Upsert failed:', error)
  process.exit(1)
}
console.log(`✅ Upserted ${data.length} Montana blog(s):`)
data.forEach(d => console.log(`   • [${d.status}] /blog/${d.slug}`))
