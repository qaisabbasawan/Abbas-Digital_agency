import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { serviceSchema, breadcrumbSchema, faqSchema } from '../lib/schema'
import FAQ from '../components/FAQ'
import { motion } from 'framer-motion'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  Code2, Layers, Zap, Search, Shield,
  Store, CreditCard, Package, BarChart2, RefreshCw, Tag,
  TestTube, Rocket, Headphones, MonitorSmartphone,
  MessageSquare, Cpu, GitBranch, Database, Settings,
  Target, Users, FileText, Mail, PieChart, Activity,
  Brush, Eye, Type, BookOpen,
  Boxes, Cloud, ShieldAlert, LineChart, Puzzle, Languages,
  ArrowRight, ChevronRight,
} from 'lucide-react'
import Footer from '../components/Footer'
import { SignatureVisual } from '../components/ServiceSignature'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'
import { clientSites } from '../data/clientSites'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
})

/* Featured project for a service page, built from a real, live client site */
function siteCase(domain, tags) {
  const site = clientSites.find(c => c.domain === domain)
  return {
    title: site.title,
    metric: site.metric,
    desc: site.desc,
    img: site.img,
    tags,
    url: site.url,
    from: site.from, to: site.to,
  }
}

/* ──────────────────────────────────────────
   All 6 service data objects
────────────────────────────────────────── */
const services = {
  'web-development': {
    title: 'Web Development',
    tagline: ['Websites That', 'Work Hard for You.'],
    metaDesc: 'Custom WordPress, WooCommerce and React/Next.js websites that load fast, rank on Google and convert visitors. Fixed quotes and a free consultation.',
    whatIs: { q: 'What is web development?', a: 'Web development is the design and build of a website or web application: its structure, code, content management system and integrations. For a business, a well-built site loads fast, works on every device, is easy for your team to update and is set up so Google can find and rank it.' },
    color: '#2E55E0',
    glow: 'rgba(46,85,224,0.22)',
    Icon: Globe,
    scene: 'web',
    stats: [
      { value: '200+', label: 'Sites Launched' },
      { value: '10+',  label: 'Years Building' },
      { value: '98%',  label: 'Client Retention' },
    ],
    desc: 'From brochure websites to complex web applications — we design and build fast, beautiful, SEO-ready sites that convert visitors into paying customers.',
    features: [
      { Icon: Layers,     title: 'Custom Design',           desc: 'Pixel-perfect Figma designs crafted around your brand — no templates, no shortcuts.' },
      { Icon: Code2,      title: 'WordPress & WooCommerce', desc: 'Full-featured CMS sites with custom themes, plugins, multilingual support and admin dashboards.' },
      { Icon: Zap,        title: 'React & Next.js',         desc: 'Blazing-fast web apps with SSR, dynamic APIs and interactive UIs that keep users engaged.' },
      { Icon: Search,     title: 'SEO-First Structure',     desc: 'Core Web Vitals, schema markup, sitemaps and on-page optimisation baked in from day one.' },
      { Icon: Smartphone, title: 'Mobile-First',            desc: 'Every layout is tested across phones, tablets and desktops — no visitor is left behind.' },
      { Icon: Shield,     title: 'Security & Maintenance',  desc: 'SSL, firewalls, daily backups and monthly updates — your site stays fast, secure and live.' },
    ],
    steps: [
      { n: '01', title: 'Discovery',   desc: 'Map your goals, audience and competitors to shape a clear strategy.' },
      { n: '02', title: 'Wireframe',   desc: 'Low-fi layouts confirm structure and content flow before design begins.' },
      { n: '03', title: 'UI Design',   desc: 'Full interface design in Figma — typography, colour, components aligned to your brand.' },
      { n: '04', title: 'Development', desc: 'Clean, scalable code built to modern standards with CMS and API integrations.' },
      { n: '05', title: 'Launch',      desc: 'Thorough QA, performance optimisation, then a smooth handover and go-live.' },
    ],
    tech: ['WordPress', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PHP', 'MySQL', 'Figma', 'Vercel', 'AWS'],
    caseStudy: siteCase('swisselitetransfers.com', ['Web Design', 'Booking Enquiries', 'SEO']),
  },

  'ecommerce': {
    title: 'E-Commerce',
    tagline: ['Turn Browsers', 'Into Buyers.'],
    metaDesc: 'Shopify, WooCommerce, Amazon and eBay stores built to sell, with payment gateways, conversion optimisation and loyalty flows. Free consultation.',
    whatIs: { q: 'What is e-commerce development?', a: 'E-commerce development is building an online store where customers can browse products, pay securely and receive their orders. It covers the platform (Shopify, WooCommerce or marketplaces like Amazon), product pages, payment gateways and shipping rules, plus the conversion work that turns visitors into repeat buyers.' },
    color: '#E8155A',
    glow: 'rgba(232,21,90,0.22)',
    Icon: ShoppingCart,
    scene: 'commerce',
    stats: [
      { value: '$10M+', label: 'Revenue Generated' },
      { value: '500+',  label: 'Products Managed' },
      { value: '35%',   label: 'Avg Conv. Lift' },
    ],
    desc: 'End-to-end online stores on Shopify, WooCommerce and Amazon — built for conversions, optimised for growth and designed to make buying effortless.',
    features: [
      { Icon: Store,      title: 'Shopify Development',  desc: 'Custom themes, apps and Shopify Plus builds that scale with your business from day one.' },
      { Icon: Package,    title: 'WooCommerce Stores',   desc: 'Flexible, powerful WordPress commerce with custom product types, bulk pricing and subscriptions.' },
      { Icon: BarChart2,  title: 'Amazon & eBay Setup',  desc: 'Optimised listings, A+ content and PPC campaigns to dominate your category.' },
      { Icon: CreditCard, title: 'Payment Gateways',     desc: 'Stripe, PayPal, Klarna and local gateways integrated for maximum checkout completion.' },
      { Icon: RefreshCw,  title: 'CRO & A/B Testing',   desc: 'Heatmaps, funnel analysis and split tests that systematically lift conversion rates.' },
      { Icon: Tag,        title: 'Loyalty & Promotions', desc: 'Points programmes, referral systems and upsell flows that increase customer lifetime value.' },
    ],
    steps: [
      { n: '01', title: 'Strategy',    desc: 'Competitor benchmarking, pricing research and platform selection aligned to your goals.' },
      { n: '02', title: 'Store Build', desc: 'Custom theme or Shopify/Woo setup with branded design, navigation and product pages.' },
      { n: '03', title: 'Catalogue',   desc: 'Product upload, variants, images, descriptions and SEO metadata — handled for you.' },
      { n: '04', title: 'Optimise',    desc: 'Checkout flow, page speed, upsells and recovery emails configured before launch.' },
      { n: '05', title: 'Launch',      desc: 'Soft launch, traffic monitoring, rapid iteration and 30-day post-launch support.' },
    ],
    tech: ['Shopify', 'WooCommerce', 'PHP', 'Liquid', 'Stripe', 'Klarna', 'Amazon Seller API', 'Google Shopping', 'Klaviyo'],
    caseStudy: siteCase('mychaikarak.com', ['E-Commerce', 'Food & Beverage', 'UK Delivery']),
  },

  'mobile-apps': {
    title: 'Mobile Apps',
    tagline: ['Apps Users Love', '& Keep Using.'],
    metaDesc: 'Native iOS, Android and React Native apps from concept to App Store launch, with UI/UX design, QA testing and post-launch support. Fixed quotes.',
    whatIs: { q: 'What is mobile app development?', a: 'Mobile app development is designing, building and publishing apps for iPhone (iOS) and Android. It includes UI/UX design, the app code, any backend or API the app talks to, testing on real devices, App Store and Google Play submission, and updates after launch.' },
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.22)',
    Icon: Smartphone,
    scene: 'mobile',
    stats: [
      { value: '100K+', label: 'Total App Users' },
      { value: '4.8★',  label: 'Avg Store Rating' },
      { value: '15+',   label: 'Apps Launched' },
    ],
    desc: 'Native iOS and Android apps from concept to App Store — with clean architecture, delightful UX and ongoing post-launch support so your app keeps growing.',
    features: [
      { Icon: MonitorSmartphone, title: 'iOS Development',     desc: 'Swift-native apps built to Apple HIG standards — smooth, fast and App Store ready.' },
      { Icon: Smartphone,        title: 'Android Development',  desc: 'Kotlin-native apps that perform flawlessly across the full range of Android devices.' },
      { Icon: Code2,             title: 'React Native',         desc: 'One codebase, two platforms — faster delivery and lower cost without sacrificing quality.' },
      { Icon: Layers,            title: 'UI/UX Design',         desc: 'Wireframes, interactive prototypes and polished UI that users find intuitive from day one.' },
      { Icon: TestTube,          title: 'QA & Testing',         desc: 'Device labs, automated tests and real-user beta testing before every submission.' },
      { Icon: Headphones,        title: 'Post-Launch Support',  desc: 'Bug fixes, OS compatibility, analytics review and feature releases on a rolling basis.' },
    ],
    steps: [
      { n: '01', title: 'Discovery',  desc: 'User research, feature scoping and technical architecture planning.' },
      { n: '02', title: 'Prototype',  desc: 'Clickable Figma prototype to validate UX flows with real users before any code is written.' },
      { n: '03', title: 'Build',      desc: 'Agile sprints with fortnightly builds so you always see real progress.' },
      { n: '04', title: 'QA & Beta',  desc: 'Rigorous testing across devices, OS versions and edge cases.' },
      { n: '05', title: 'Launch',     desc: 'App Store submission, ASO optimisation and launch-day monitoring.' },
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS', 'Figma', 'TestFlight', 'Play Console'],
    caseStudy: null,
  },

  'ai-chatbots': {
    title: 'AI & Chatbots',
    tagline: ['Automate Today.', 'Scale Tomorrow.'],
    metaDesc: 'WhatsApp and Messenger chatbots, custom GPT assistants and workflow automation that capture leads and answer customers 24/7. Free consultation.',
    whatIs: { q: 'What is an AI chatbot?', a: 'An AI chatbot is software that answers customers in natural language on channels like WhatsApp, Messenger or your website. Paired with workflow automation, it can take orders, qualify leads, answer FAQs and sync data into your CRM around the clock, so your team only handles the conversations that need a person.' },
    color: '#0891B2',
    glow: 'rgba(8,145,178,0.22)',
    Icon: Bot,
    scene: 'ai',
    stats: [
      { value: '80%',   label: 'Queries Automated' },
      { value: '24/7',  label: 'Uptime Guaranteed' },
      { value: '$50K+', label: 'Avg Annual Saving' },
    ],
    desc: 'WhatsApp and Facebook chatbots, ChatGPT integrations and custom AI workflows that handle repetitive tasks automatically — so your team focuses on what matters.',
    features: [
      { Icon: MessageSquare, title: 'WhatsApp Chatbots',    desc: 'Conversational bots on WhatsApp Business API for orders, support, lead gen and bookings.' },
      { Icon: Bot,           title: 'Messenger & Web',      desc: 'Facebook Messenger, website live-chat and web widget integrations with full NLP support.' },
      { Icon: Cpu,           title: 'ChatGPT / GPT-4',      desc: 'Custom GPT-powered assistants trained on your data with RAG pipelines and long-term memory.' },
      { Icon: GitBranch,     title: 'Workflow Automation',  desc: 'n8n, Zapier and Make automations connecting your CRM, e-commerce and email platforms.' },
      { Icon: Database,      title: 'CRM Integration',      desc: 'Sync every lead, order and support ticket into HubSpot, Salesforce or your own system.' },
      { Icon: Settings,      title: 'Maintenance & Tuning', desc: 'Monthly prompt engineering reviews, model updates and usage analytics dashboards.' },
    ],
    steps: [
      { n: '01', title: 'Audit',     desc: 'Map current customer touchpoints and identify the highest-value automation opportunities.' },
      { n: '02', title: 'Design',    desc: 'Conversation flows, fallback logic and escalation paths built around your brand voice.' },
      { n: '03', title: 'Train',     desc: 'GPT fine-tuning or RAG pipeline built on your product docs, FAQs and CRM data.' },
      { n: '04', title: 'Integrate', desc: 'Connect to WhatsApp, CRM, payment systems and e-commerce platform.' },
      { n: '05', title: 'Monitor',   desc: 'Live dashboard, weekly insight reports and continuous performance tuning.' },
    ],
    tech: ['GPT-4', 'LangChain', 'Python', 'Node.js', 'WhatsApp API', 'Twilio', 'n8n', 'Pinecone', 'OpenAI', 'FastAPI'],
    caseStudy: null,
  },

  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: ['More Traffic.', 'More Revenue.'],
    metaDesc: 'SEO, Google Ads, Meta ads, social media and email marketing focused on qualified leads and real ROI, with clear monthly reporting. Free strategy call.',
    whatIs: { q: 'What is digital marketing?', a: 'Digital marketing is promoting a business through online channels: search engines (SEO and Google Ads), social media (Facebook, Instagram, LinkedIn), email and content. Done well, it puts you in front of people already searching for what you sell and traces every lead and sale back to its source.' },
    color: '#059669',
    glow: 'rgba(5,150,105,0.22)',
    Icon: TrendingUp,
    scene: 'marketing',
    stats: [
      { value: '3×',   label: 'Avg Organic Growth' },
      { value: '4.8×', label: 'Avg ROAS' },
      { value: '50+',  label: 'Campaigns Managed' },
    ],
    desc: 'SEO, Google Ads, social media and email campaigns designed to drive qualified traffic, generate leads and produce real, measurable return on investment.',
    features: [
      { Icon: Search,   title: 'SEO',                   desc: 'Technical audits, keyword strategy, on-page and link-building to rank and stay there.' },
      { Icon: Target,   title: 'Google Ads',             desc: 'Search, Shopping and Performance Max campaigns managed for maximum ROAS.' },
      { Icon: Users,    title: 'Meta & Social Ads',      desc: 'Facebook and Instagram campaigns with precise audience targeting and creative testing.' },
      { Icon: Activity, title: 'Social Media Management', desc: 'Content calendars, graphic design, copywriting and community management across all platforms.' },
      { Icon: Mail,     title: 'Email Marketing',        desc: 'Automated flows, broadcast campaigns and A/B testing via Klaviyo and Mailchimp.' },
      { Icon: PieChart, title: 'Analytics & Reporting',  desc: 'GA4 setup, custom dashboards and monthly performance reports with clear next steps.' },
    ],
    steps: [
      { n: '01', title: 'Audit',    desc: 'Full audit of existing channels, SEO health, competitor gaps and quick wins.' },
      { n: '02', title: 'Strategy', desc: '90-day roadmap with channel mix, budget split and KPI targets agreed upfront.' },
      { n: '03', title: 'Launch',   desc: 'Campaigns, content and creatives go live with tracking verified end-to-end.' },
      { n: '04', title: 'Optimise', desc: 'Weekly bid management, A/B tests and budget reallocation to top performers.' },
      { n: '05', title: 'Report',   desc: 'Monthly deep-dive with insights, wins and the plan for the next 30 days.' },
    ],
    tech: ['Google Analytics 4', 'Google Ads', 'Meta Ads', 'Ahrefs', 'SEMrush', 'Klaviyo', 'Mailchimp', 'Hotjar', 'Looker Studio'],
    caseStudy: null,
  },

  'branding-design': {
    title: 'Branding & Design',
    tagline: ['Design That', 'Builds Empires.'],
    metaDesc: 'Logo design, brand identity, UI/UX design and brand guidelines that make your business recognisable everywhere it appears. Free consultation.',
    whatIs: { q: 'What is branding and design?', a: 'Branding and design is creating the visual and verbal identity people recognise your business by: logo, colour palette, typography, imagery style and tone of voice. Brand guidelines then keep every website, social post, ad and printed piece consistent, which builds trust and recall over time.' },
    color: '#D97706',
    glow: 'rgba(217,119,6,0.22)',
    Icon: Palette,
    scene: 'brand',
    stats: [
      { value: '100+', label: 'Brands Created' },
      { value: '30+',  label: 'Industries Served' },
      { value: '100%', label: 'Custom Work' },
    ],
    desc: 'Logo design, full brand identity, UI/UX and marketing materials — all crafted to make your business instantly recognisable and impossible to ignore.',
    features: [
      { Icon: Brush,    title: 'Logo Design',       desc: 'Timeless marks built on strategy — wordmarks, lettermarks, icons and full logo suites.' },
      { Icon: Eye,      title: 'Brand Identity',    desc: 'Colour palette, typography, imagery style and usage rules that make every touchpoint consistent.' },
      { Icon: Layers,   title: 'UI/UX Design',      desc: 'Website and app interfaces in Figma — researched, wireframed, prototyped and pixel-perfect.' },
      { Icon: Type,     title: 'Social Media Kit',  desc: 'Post templates, story frames, ad creatives and profile assets ready to deploy immediately.' },
      { Icon: Package,  title: 'Print & Packaging', desc: 'Business cards, brochures, packaging, signage and event materials print-ready at 300 dpi.' },
      { Icon: BookOpen, title: 'Brand Guidelines',  desc: 'A complete brand bible covering every rule, ratio, colour code and usage example.' },
    ],
    steps: [
      { n: '01', title: 'Discovery',  desc: 'Brand questionnaire, competitor analysis and audience profiling to define your position.' },
      { n: '02', title: 'Moodboard', desc: 'Visual direction — tone, colour emotion, typography style and imagery references.' },
      { n: '03', title: 'Concepts',  desc: 'Three distinct logo concepts with rationale, presented for structured feedback.' },
      { n: '04', title: 'Refine',    desc: 'Your chosen direction refined across revisions until it\'s exactly right.' },
      { n: '05', title: 'Deliver',   desc: 'Full asset pack — all formats, sizes, colour variants and the complete brand guidelines.' },
    ],
    tech: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'InDesign', 'Framer', 'Canva Pro', 'Midjourney'],
    caseStudy: null,
  },

  'erp-solutions': {
    title: 'ERP Solutions',
    tagline: ['Enterprise Intelligence.', 'Any Scale. Any Market.'],
    metaDesc: 'Modular cloud ERP with HR, inventory, sales and finance modules, AI demand forecasting and fraud detection. Pay only for the modules you need.',
    whatIs: { q: 'What is an ERP system?', a: 'An ERP (enterprise resource planning) system is one platform that runs a company\'s core operations, such as HR, inventory, sales, finance, procurement and reporting, on shared real-time data. Instead of separate spreadsheets and tools, every department works from the same numbers.' },
    color: '#4F46E5',
    glow: 'rgba(79,70,229,0.24)',
    Icon: Boxes,
    scene: 'erp',
    stats: [
      { value: '6',    label: 'Core Modules' },
      { value: '3 mo', label: 'Data to Forecast' },
      { value: '24/7', label: 'Fraud Monitoring' },
    ],
    desc: 'Cloud-native, modular ERP systems for businesses of all sizes — from growing SMEs to large enterprises — with AI demand forecasting, real-time fraud detection and a multilingual chatbot at the core. Built on Next.js + Supabase, deployed across Pakistan, the Middle East and global markets.',
    features: [
      { Icon: Boxes,       title: '6 Core Modules',         desc: 'HR, Inventory, Sales, Finance, Procurement and Analytics — independent yet fully interconnected modules that share one source of truth.' },
      { Icon: LineChart,   title: 'AI Demand Forecasting',  desc: 'Accurate predictions with as little as 3 months of data. Local seasonal patterns — Eid, Ramadan, harvest and back-to-school — built natively into the model.' },
      { Icon: ShieldAlert, title: 'Fraud & Error Detection', desc: 'Real-time anomaly detection across every transaction using Isolation Forest, rule-based checks and Z-score analysis — each flag scored and explained.' },
      { Icon: Languages,   title: 'Multilingual AI Chatbot', desc: 'Query and command your entire ERP in natural language — in any language. Powered by Google Gemini for instant, conversational insight.' },
      { Icon: Cloud,       title: 'Cloud-Based Access',     desc: 'Accessible on desktop and mobile from anywhere in the world. Real-time data, role-based access and zero on-premise hardware to maintain.' },
      { Icon: Puzzle,      title: 'Modular Pricing',        desc: 'SMEs pay only for the modules they need. Enterprises scale with full module access, custom integrations and dedicated support.' },
    ],
    steps: [
      { n: '01', title: 'Discovery',   desc: 'Map your processes, data and pain points across departments to scope the right module mix.' },
      { n: '02', title: 'Configure',   desc: 'Select and tailor modules — workflows, roles, approvals and reports shaped to how you actually work.' },
      { n: '03', title: 'Integrate',   desc: 'Migrate existing data, connect payment, tax and third-party systems, and wire up the AI layer.' },
      { n: '04', title: 'AI Training',  desc: 'Feed historical data so the forecasting and fraud-detection models learn your business patterns.' },
      { n: '05', title: 'Launch & Scale', desc: 'Team onboarding, go-live support, then add modules and locations as you grow.' },
    ],
    tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Facebook Prophet', 'Isolation Forest', 'Google Gemini', 'Python', 'FastAPI', 'Tailwind CSS', 'Vercel'],
    caseStudy: null,
  },
}

/* Spinning conic energy ring around a feature icon */
function IconOrb({ Icon, color }) {
  return (
    <div className="relative shrink-0 w-[52px] h-[52px]">
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, transparent 15%, ${color} 40%, transparent 65%)`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />
      <div
        className="absolute inset-[4px] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${color}55, ${color}10 72%)`,
          boxShadow: `0 0 22px ${color}38`,
        }}
      >
        <Icon size={19} color="#fff" strokeWidth={1.7} />
      </div>
    </div>
  )
}

/* Floating glass stat chip */
function StatChip({ value, label, color, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        className="px-6 py-4 rounded-2xl text-center"
        style={{
          background: 'rgba(8,14,42,0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${color}35`,
          boxShadow: `0 10px 36px rgba(0,0,0,0.35), 0 0 22px ${color}1C, inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        <div className="font-bold text-white text-[22px] tracking-tight leading-none" style={{ color }}>{value}</div>
        <div className="text-white/35 text-[9.5px] uppercase tracking-[0.2em] mt-2">{label}</div>
      </motion.div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────
   Page component
────────────────────────────────────────── */
export default function ServiceDetailPage() {
  const { slug } = useParams()
  const svc = services[slug]

  if (!svc) return <Navigate to="/services" replace />

  const { title, tagline, metaDesc, whatIs, color, glow, stats, desc, features, steps, tech, caseStudy, scene, faqs: svcFaqsOverride } = svc
  const lower = title.toLowerCase()

  // Per-service FAQ — pricing / timeline / deliverables (the exact gaps the
  // audit flagged). Service-specific overrides win; otherwise sensible defaults.
  const faqs = svcFaqsOverride || [
    { q: `How much does ${lower} cost?`, a: `${title} projects are priced to scope after a free consultation — you get a fixed written quote before any work starts, with no hidden fees. Most engagements start in the low hundreds to low thousands of dollars depending on complexity.` },
    { q: `How long does ${lower} take?`, a: `Timelines depend on scope, but a typical ${lower} project runs from a couple of weeks to a few months. We agree clear milestones up front and give you weekly progress updates.` },
    { q: `What do I get with your ${lower} service?`, a: `${desc}` },
    { q: `Do you work with clients outside Pakistan?`, a: `Yes. As a US-registered LLC in Montana with a delivery team in Islamabad, we work with clients across the USA, UK, Middle East and beyond, billing in USD.` },
  ]

  return (
    <div className="min-h-screen bg-bg-dark overflow-hidden">
      <SEO
        title={`${title} in Pakistan | Abbas Digital Agency`}
        description={metaDesc}
        keywords={`${title.toLowerCase()} Pakistan, ${title.toLowerCase()} Islamabad, Abbas Digital Agency, digital marketing Pakistan`}
        path={`/services/${slug}`}
        image={`/og/${slug}.jpg`}
        schema={[
          serviceSchema(title, metaDesc, `/services/${slug}`),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: title, path: `/services/${slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-[72px]">
        {/* ambient glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-[520px] h-[520px] rounded-full blur-[150px] opacity-50" style={{ background: glow }} />
          <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-30" style={{ background: glow }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-linear-to-t from-bg-dark to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-20 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* ─── left: copy ─── */}
          <div>
            {/* breadcrumb badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
              style={{ background: `${color}12`, border: `1px solid ${color}38` }}
            >
              <Link to="/services" className="text-white/40 text-[11px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors">Services</Link>
              <ChevronRight size={11} className="text-white/25" />
              <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color }}>{title}</span>
            </motion.div>

            {/* tagline — one <h1> for SEO holding the full keyword line; the
                animated lines sit outside it (hidden from screen readers). */}
            <div className="mb-7" style={{ perspective: 900 }}>
              <h1 className="sr-only">{`${title} — ${tagline.join(' ')}`}</h1>
              {tagline.map((line, i) => (
                <span key={line} aria-hidden className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
                  <motion.span
                    initial={{ y: '110%', rotateX: -70, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.16, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className={`block font-bold leading-[0.95] tracking-tight ${i === 1 ? '' : 'text-white'}`}
                    style={{
                      fontSize: 'clamp(2.6rem, 5.2vw, 5rem)',
                      transformOrigin: '50% 100%',
                      ...(i === 1 ? {
                        backgroundImage: `linear-gradient(135deg, ${color}, ${color}88)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      } : {}),
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-white/45 text-[15px] leading-relaxed max-w-lg mb-9"
            >
              {desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Magnetic>
                <Link to="/contact"
                  className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                  Get a Free Quote <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </Magnetic>
              <Link to="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm text-white/55 hover:text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                View Our Work
              </Link>
            </motion.div>

            {/* floating stat chips */}
            <div className="flex flex-wrap gap-4">
              {stats.map((s, i) => <StatChip key={s.label} {...s} color={color} i={i} />)}
            </div>
          </div>

          {/* ─── right: animated service mockup ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <SignatureVisual variant={scene} color={color} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════ DEFINITION — a direct answer for search & AI engines ══════════════ */}
      <section className="relative pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            {...fade(0)}
            className="grid lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-14 items-start p-7 sm:p-10 rounded-3xl"
            style={{ background: `linear-gradient(150deg, ${color}14, rgba(255,255,255,0.02) 55%)`, border: `1px solid ${color}2E` }}
          >
            <h2 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>
              {whatIs.q}
            </h2>
            <p className="text-white/65 text-[16px] leading-relaxed">{whatIs.a}</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-24 right-0 w-[460px] h-[460px] rounded-full blur-[150px] pointer-events-none opacity-50" style={{ background: glow }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color }}>
            What's Included
          </motion.p>
          <RevealText as="h2" className="font-bold text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Everything You Need to Succeed
          </RevealText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon: FIcon, title: ftitle, desc: fdesc }, i) => (
              <motion.div
                key={ftitle}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard max={8} glareColor={`${color}20`} glareSize={360}>
                  <div className="group relative h-full p-6 rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(8,14,42,0.45)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                    }}>
                    <div className="holo-sweep z-20" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ border: `1px solid ${color}50`, boxShadow: `0 0 30px ${color}1E, inset 0 0 24px ${color}0A` }} />
                    <div className="relative z-10 mb-5">
                      <IconOrb Icon={FIcon} color={color} />
                    </div>
                    <h3 className="font-bold text-white text-base mb-2 relative z-10">{ftitle}</h3>
                    <p className="text-white/45 text-[13px] leading-relaxed relative z-10">{fdesc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-y border-white/6"
        style={{ background: 'rgba(255,255,255,0.012)' }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-35" style={{ background: glow }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
          <motion.p {...fade(0)} className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color }}>
            How We Work
          </motion.p>
          <RevealText as="h2" className="font-bold text-white mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Our 5-Step Process
          </RevealText>

          <div className="relative">
            {/* connector line draws itself on scroll (desktop) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-8 left-8 right-8 h-px origin-left"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}30, transparent)` }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map(({ n, title: ptitle, desc: pdesc }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="relative w-16 h-16 mb-6">
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${color}55` }}
                      animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.35 }}
                    />
                    <div className="absolute inset-0 rounded-full flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle at 32% 28%, ${color}40, ${color}0E 72%)`,
                        border: `1.5px solid ${color}50`,
                        boxShadow: `0 0 26px ${color}28`,
                      }}>
                      <span className="font-bold text-sm" style={{ color }}>{n}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{ptitle}</h3>
                  <p className="text-white/45 text-[13px] leading-relaxed">{pdesc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TECH STACK ══════════════ */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-40" style={{ background: glow }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color }}>
            Tools & Technology
          </motion.p>
          <RevealText as="h2" className="font-bold text-white mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Our Tech Stack
          </RevealText>

          <div className="flex flex-wrap gap-3">
            {tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default text-white/80"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}38`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 18px ${color}14, inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CASE STUDY — real client sites only ══════════════ */}
      {caseStudy && (
      <section className="relative py-20 lg:py-28 overflow-hidden border-t border-white/6">
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.p {...fade(0)} className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color }}>
            Featured Project
          </motion.p>
          <RevealText as="h2" className="font-bold text-white mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            See It in Action
          </RevealText>

          <motion.div {...fade(0.12)}>
            <TiltCard max={4} glareColor={`${color}18`} glareSize={620}>
              <div className="group relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(8,14,42,0.5)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${color}2E`,
                  boxShadow: `0 24px 70px rgba(0,0,0,0.45), 0 0 40px ${color}12, inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}>
                <div className="holo-sweep z-20" />
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-1/2 relative overflow-hidden" style={{ minHeight: 320, background: `linear-gradient(135deg, ${caseStudy.from}, ${caseStudy.to})` }}>
                    <img
                      src={caseStudy.img} alt={`${caseStudy.title} website homepage`}
                      loading="lazy" decoding="async"
                      className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-bg-dark/60" />
                    <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md"
                      style={{ background: `${color}30`, border: `1px solid ${color}60`, boxShadow: `0 0 20px ${color}40` }}>
                      <span className="text-[10.5px] font-bold tracking-widest uppercase text-white">{caseStudy.metric}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[90px] pointer-events-none opacity-50" style={{ background: `${color}16` }} />
                    <h3 className="font-bold text-white text-2xl lg:text-3xl mb-3 relative">{caseStudy.title}</h3>
                    <p className="text-white/50 text-[14px] leading-relaxed mb-6 relative">{caseStudy.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-8 relative">
                      {caseStudy.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full text-[11px]"
                          style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-7 gap-y-3 relative">
                      <a
                        href={caseStudy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold group/link w-fit"
                        style={{ color }}
                      >
                        <span>Visit Live Site</span>
                        <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">
                          <ArrowRight size={15} strokeWidth={2} />
                        </span>
                      </a>
                      <Link to="/portfolio" className="text-sm text-white/55 hover:text-white transition-colors">
                        View Full Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
      )}

      {/* ══════════════ CTA ══════════════ */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            {...fade(0)}
            className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center"
            style={{
              background: 'rgba(8,14,42,0.5)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: glow }} />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: glow }} />

            <p className="relative text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color }}>
              Let's Get Started
            </p>
            <RevealText as="h2" className="relative font-bold text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)' }}>
              {`Ready to Grow with ${title}?`}
            </RevealText>
            <p className="relative text-white/45 text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
              Free consultation, no commitment. We'll get back to you within 24 hours.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Magnetic>
                <Link to="/contact"
                  className="shimmer-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm tracking-widest uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                  Get a Free Quote <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </Magnetic>
              <Link to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm text-white/55 hover:text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                ← All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <FAQ faqs={faqs} eyebrow="Common Questions" heading={`${title} — FAQs`} />

      <Footer />
    </div>
  )
}
