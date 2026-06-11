import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import {
  Globe, ShoppingCart, Smartphone, Bot, TrendingUp, Palette,
  Code2, Layers, Zap, Search, Shield,
  Store, CreditCard, Package, BarChart2, RefreshCw, Tag,
  TestTube, Rocket, Headphones, MonitorSmartphone,
  MessageSquare, Cpu, GitBranch, Database, Settings,
  Target, Users, FileText, Mail, PieChart, Activity,
  Brush, Eye, Type, BookOpen,
  ArrowRight, ChevronRight,
} from 'lucide-react'
import Footer from '../components/Footer'
import ServiceScene from '../components/ServiceScene'
import RevealText from '../components/anim/RevealText'
import TiltCard from '../components/anim/TiltCard'
import Magnetic from '../components/anim/Magnetic'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
})

/* ──────────────────────────────────────────
   All 6 service data objects
────────────────────────────────────────── */
const services = {
  'web-development': {
    title: 'Web Development',
    tagline: ['Websites That', 'Work Hard for You.'],
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
    caseStudy: {
      title: 'TechCorp Solutions',
      metric: '+40% Conversions',
      desc: 'Corporate rebrand with a custom CMS, multilingual support and a performance-first Next.js architecture delivering 40% more conversions.',
      img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=460&fit=crop&q=80',
      tags: ['React', 'Next.js', 'Tailwind'],
      from: '#1A3BBF', to: '#2E55E0',
    },
  },

  'ecommerce': {
    title: 'E-Commerce',
    tagline: ['Turn Browsers', 'Into Buyers.'],
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
    caseStudy: {
      title: 'LuxeWear Fashion',
      metric: '$2M Revenue',
      desc: 'Shopify flagship store with virtual try-on technology, a loyalty programme and an AR product viewer — driving $2M in its first year.',
      img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&h=460&fit=crop&q=80',
      tags: ['Shopify', 'Liquid', 'AR'],
      from: '#7C1D6F', to: '#E8155A',
    },
  },

  'mobile-apps': {
    title: 'Mobile Apps',
    tagline: ['Apps Users Love', '& Keep Using.'],
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
    caseStudy: {
      title: 'FitPulse Fitness',
      metric: '50K Users',
      desc: 'iOS & Android fitness app with AI-generated workout plans and a social accountability feed — reaching 50K users in 6 months.',
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=460&fit=crop&q=80',
      tags: ['React Native', 'Firebase', 'AI'],
      from: '#7C3AED', to: '#A855F7',
    },
  },

  'ai-chatbots': {
    title: 'AI & Chatbots',
    tagline: ['Automate Today.', 'Scale Tomorrow.'],
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
    caseStudy: {
      title: 'ShopBot AI',
      metric: '80% Automated',
      desc: 'WhatsApp + Messenger AI chatbot handling product orders, returns and customer queries 24/7 — automating 80% of all support volume.',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=460&fit=crop&q=80',
      tags: ['GPT-4', 'Node.js', 'WhatsApp API'],
      from: '#0C4A6E', to: '#2E55E0',
    },
  },

  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: ['More Traffic.', 'More Revenue.'],
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
    caseStudy: {
      title: 'RealEstate360 SEO',
      metric: '3× Organic Traffic',
      desc: 'Technical SEO audit plus a 6-month content strategy that tripled organic search traffic and cut cost-per-lead by 40%.',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=460&fit=crop&q=80',
      tags: ['SEO', 'Ahrefs', 'Analytics'],
      from: '#7C2D12', to: '#E8155A',
    },
  },

  'branding-design': {
    title: 'Branding & Design',
    tagline: ['Design That', 'Builds Empires.'],
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
    caseStudy: {
      title: 'NovaLabs Rebrand',
      metric: 'Full Brand System',
      desc: 'Complete brand identity including custom logo, typography scale, colour system and 60-page brand guidelines — delivered in 3 weeks.',
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&h=460&fit=crop&q=80',
      tags: ['Brand Identity', 'Figma', 'Guidelines'],
      from: '#4C1D95', to: '#D97706',
    },
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

  const { title, tagline, color, glow, stats, desc, features, steps, tech, caseStudy, scene } = svc

  return (
    <div className="min-h-screen bg-bg-dark overflow-hidden">
      <SEO
        title={`${title} in Pakistan | Abbas Digital Agency`}
        description={`${tagline} — Abbas Digital Agency delivers professional ${title.toLowerCase()} services for businesses in Pakistan & USA. US-registered. Free consultation.`}
        keywords={`${title.toLowerCase()} Pakistan, ${title.toLowerCase()} Islamabad, Abbas Digital Agency, digital marketing Pakistan`}
        path={`/services/${slug}`}
      />

      {/* ══════════════ 3D HERO ══════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-[72px]">
        <div className="absolute inset-0">
          <ServiceScene variant={scene} color={color} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-bg-dark/85 via-bg-dark/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-bg-dark to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-20">
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

          {/* tagline */}
          <div className="mb-7" style={{ perspective: 900 }}>
            {tagline.map((line, i) => (
              <div key={line} className="overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.h1
                  initial={{ y: '110%', rotateX: -70, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.16, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-bold leading-[0.95] tracking-tight ${i === 1 ? '' : 'text-white'}`}
                  style={{
                    fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
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
                </motion.h1>
              </div>
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
                className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm tracking-[0.1em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
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
      <section className="relative py-20 lg:py-28 overflow-hidden border-y border-white/[0.06]"
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

      {/* ══════════════ CASE STUDY ══════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.06]">
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
                      src={caseStudy.img} alt={caseStudy.title}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-dark/60" />
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

                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 text-sm font-semibold group/link relative w-fit"
                      style={{ color }}
                    >
                      <span>View Full Portfolio</span>
                      <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">
                        <ArrowRight size={15} strokeWidth={2} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

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
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(232,21,90,0.12)' }} />

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
                  className="shimmer-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm tracking-[0.1em] uppercase text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200">
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

      <Footer />
    </div>
  )
}
