/* Page-specific copy for the programmatic SEO pages in seoPages.js.

   Every service, city and industry page shares the SeoLandingTemplate, so
   without this block they differ only by a few swapped words — the pattern
   Google treats as doorway pages and AI engines skip as duplicate. Each entry
   here is written for that one page: its market, its buyers and how we
   approach the work there. Rendered by LocalAreaSection in the template.

   Keep claims factual: describe the market and our approach, never invent
   client counts, rankings or results. */

export const LOCAL_CONTENT = {

  // ── SERVICE PAGES ───────────────────────────────────────────────────────────

  'web-design': {
    label: 'How We Design',
    heading: 'Design Decisions That Start With Your Customer',
    paragraphs: [
      'A good business website answers three questions within seconds: what do you do, why should I trust you, and what do I do next. Before any visual design, we map those answers for your audience and plan each page around a single action — a call, a quote request, a booking or a sale.',
      'Designs are built mobile-first because that is where most visitors arrive, then refined for desktop. We design in Figma so you review real layouts with real copy rather than placeholder boxes, and we keep a library of reusable sections so future pages stay consistent without another design project.',
      'Performance is part of the design brief, not an afterthought: compressed images, modern font loading and lean layouts keep pages fast on 4G connections, which matters for both conversions and Google rankings.',
    ],
  },

  'wordpress-development': {
    label: 'Built for Your Team',
    heading: 'WordPress Your Team Can Actually Run',
    paragraphs: [
      'Most WordPress problems come from sites assembled from too many plugins and a page builder nobody on the team understands. We build lean custom themes with the Gutenberg block editor or ACF fields, so editors change text, images and products in clearly labelled fields without breaking the layout.',
      'Every build includes security hardening, automatic backups, caching and a staging copy for testing updates before they go live. Where a site needs custom functionality — booking flows, member areas, ERP or CRM sync — we write a small purpose-built plugin rather than stacking third-party ones.',
      'If you already run WordPress, we can audit what you have, remove plugin bloat, fix Core Web Vitals and migrate to better hosting without losing your existing URLs or rankings.',
    ],
  },

  'shopify-development': {
    label: 'Stores That Sell',
    heading: 'Shopify Builds Focused on Conversion',
    paragraphs: [
      'A Shopify store succeeds on its product pages and checkout, not its homepage. We structure collections and filters around how your customers shop, write product templates that answer sizing, shipping and returns questions up front, and keep the theme lightweight so pages load quickly on mobile.',
      'We set up the parts that drive repeat revenue: abandoned-cart and post-purchase email flows, reviews, bundles and upsells, plus analytics and conversion tracking for Google and Meta so every ad dollar can be measured against sales.',
      'For brands selling across borders we configure Shopify Markets, multi-currency pricing and local payment options, and we migrate stores from WooCommerce or other platforms with products, customers, orders and SEO redirects intact.',
    ],
  },

  'seo-services': {
    label: 'Our SEO Method',
    heading: 'Technical Fixes First, Then Content That Earns Rankings',
    paragraphs: [
      'Every SEO engagement starts with a technical audit: crawlability, indexing, site speed, internal links, duplicate pages and structured data. These fixes are often the fastest wins because they unlock rankings for content you already have.',
      'From there we build topic clusters — a pillar page for each core service supported by focused articles that answer the specific questions buyers search for. That structure helps Google, and AI answer engines like ChatGPT and Google AI Overviews, understand what you are an authority on.',
      'You get a monthly report showing rankings, organic traffic and the leads or sales that came from search, plus a clear plan for the next month. No vanity metrics, and no link schemes that put your domain at risk.',
    ],
  },

  'google-ads-management': {
    label: 'How We Run Google Ads',
    heading: 'Search Campaigns Built Around Buying Intent',
    paragraphs: [
      'The fastest way to waste a Google Ads budget is broad keywords and a homepage as the landing page. We build tightly themed ad groups around high-intent searches, add negative keywords from day one and send each ad to a page written for that exact query.',
      'Conversion tracking is set up before any money is spent — calls, form submissions, WhatsApp clicks and purchases — so bidding is optimised toward real leads and sales rather than clicks. For e-commerce we run Shopping and Performance Max campaigns from a clean product feed.',
      'Each week we review search terms, bids and ad copy tests; each month you get a plain-English report showing spend, cost per lead and revenue, with the changes we made and why.',
    ],
  },

  'meta-ads-management': {
    label: 'How We Run Meta Ads',
    heading: 'Facebook & Instagram Ads That Test Creative Fast',
    paragraphs: [
      'On Meta, creative does most of the targeting. We produce several angles for each offer — short videos, carousels, testimonials and static images — then let the algorithm find the audience while we cut the losers and scale the winners.',
      'We install the Meta pixel and Conversions API so results are tracked accurately even with browser privacy limits, and we build retargeting sequences for people who visited your site, watched your videos or messaged your page.',
      'Lead campaigns can feed directly into WhatsApp, Messenger or your CRM so your sales team responds while interest is high. Every month you see cost per lead or purchase, which creatives drove it, and what we are testing next.',
    ],
  },

  'mobile-app-development': {
    label: 'From Idea to App Store',
    heading: 'Apps Planned Around a First Version You Can Launch',
    paragraphs: [
      'Many app projects stall because they try to build everything at once. We start with a short discovery phase to define the smallest version that delivers real value to users, then design clickable prototypes so you can test the flow before development begins.',
      'We choose the stack to suit the product: React Native or Flutter when one codebase for iOS and Android makes sense, native Swift or Kotlin when performance or device features demand it. Backends, admin panels and APIs are built alongside the app.',
      'We handle App Store and Google Play submission, crash reporting and analytics, and stay on after launch for updates, OS compatibility and the features your users ask for next.',
    ],
  },

  'ai-automation-services': {
    label: 'Practical AI',
    heading: 'Automating the Repetitive Work First',
    paragraphs: [
      'The best AI projects start with a boring question: which tasks does your team repeat every day? Answering the same customer questions, copying leads between tools, chasing invoices and sending order updates are usually the quickest wins.',
      'We build WhatsApp and website chatbots trained on your own documents and policies, connect them to your CRM or order system, and hand conversations to a human when a customer needs one. Behind the scenes we use tools like n8n, Make and custom scripts to move data between your apps automatically.',
      'Every automation is documented and monitored, with clear logs of what it did, so your team stays in control and can adjust it as the business changes.',
    ],
  },

  // ── SERVICE + CITY PAGES ────────────────────────────────────────────────────

  'web-design-islamabad': {
    label: 'Our Home City',
    heading: 'Web Design From an Islamabad-Based Team',
    paragraphs: [
      'Our studio is in Banigala, so Islamabad projects get something remote agencies cannot offer: kickoff workshops and review meetings in person at your office in Blue Area, F-7, I-8 or wherever your team works.',
      'Islamabad has an unusual mix of buyers — government bodies, embassies and NGOs alongside tech startups, clinics, schools and real-estate developers in Bahria Town and DHA. Each expects something different from a website, from accessibility and bilingual English/Urdu content to fast lead capture for property enquiries.',
      'We design for that audience, build on WordPress or Next.js depending on how your team will manage content, and set up local SEO so your new site appears for Islamabad searches from launch.',
    ],
  },

  'web-design-lahore': {
    label: 'Serving Lahore',
    heading: 'Websites for Lahore’s Retail, Fashion and Food Brands',
    paragraphs: [
      'Lahore is Pakistan’s second-largest city and a centre for fashion, textiles, food and education, from Liberty Market and MM Alam Road to the software houses around Arfa Software Technology Park. Its consumers shop online heavily, which raises the bar for design and speed.',
      'For Lahore brands we focus on visual storytelling, fast product galleries and checkouts that support cash on delivery and local payment options, while textile and manufacturing exporters get English-first sites built for international buyers.',
      'Our team works with Lahore clients remotely through video calls and shared design files, with a fixed timeline and a single point of contact from first wireframe to launch.',
    ],
  },

  'web-design-karachi': {
    label: 'Serving Karachi',
    heading: 'Web Design for Karachi’s Commercial Market',
    paragraphs: [
      'Karachi is Pakistan’s largest city and its financial and trade centre, home to the Pakistan Stock Exchange, the port and many national head offices along I.I. Chundrigar Road and Shahrah-e-Faisal. Websites here often need to win corporate trust as much as consumer clicks.',
      'We build sites for Karachi logistics firms, importers, retailers, clinics and service companies with clear credentials, fast quote and contact flows, and integrations with the CRMs and ERPs larger organisations already use.',
      'Projects are run remotely from our Islamabad studio with weekly video reviews, and we stay on after launch for hosting, security updates and improvements as your site grows.',
    ],
  },

  'web-design-rawalpindi': {
    label: 'Next Door in Rawalpindi',
    heading: 'Local Web Design for Rawalpindi Businesses',
    paragraphs: [
      'Rawalpindi and Islamabad work as one metro, and our Islamabad studio is a short drive from Saddar, Commercial Market and Bahria Town, so meeting in person is easy whenever a project benefits from it.',
      'Rawalpindi’s economy runs on retail, wholesale trade, education, healthcare and services, many of them family businesses moving online for the first time. We build straightforward websites with WhatsApp and click-to-call buttons, Google Maps integration and bilingual content where it helps customers.',
      'We also set up your Google Business Profile and local SEO for Rawalpindi searches, so the new site starts bringing in enquiries rather than just existing online.',
    ],
  },

  'web-design-pakistan': {
    label: 'Nationwide',
    heading: 'Web Design for Businesses Across Pakistan',
    paragraphs: [
      'Pakistani internet use is overwhelmingly mobile, often on mid-range phones and variable 4G. We design for those conditions first: lightweight pages, compressed images and layouts that work on small screens before they are expanded for desktop.',
      'We support the details that matter locally — Urdu and English content, cash-on-delivery and local payment gateways for stores, WhatsApp as the primary contact channel and Google Maps for businesses with physical locations.',
      'From our base in Islamabad we work with clients nationwide by video call and shared project boards, and as a US-registered LLC we also build export-facing sites for Pakistani companies selling abroad.',
    ],
  },

  'seo-company-islamabad': {
    label: 'Technical & Local SEO',
    heading: 'SEO Projects for Islamabad Businesses',
    paragraphs: [
      'For many Islamabad businesses the biggest SEO gains are technical and local: a site Google can crawl and index properly, pages for each service and sector you serve, and a Google Business Profile that ranks in the map pack for searches across the twin cities.',
      'We run one-off SEO projects to fix exactly those things — a full technical audit, on-page fixes, schema markup, Google Business Profile optimisation and local citations — with a clear scope and fixed price so you know what you are getting.',
      'Because we are based in Islamabad, we understand how people search here, from sector-based searches like “F-10” or “G-11” to queries in Roman Urdu, and we build that into the keyword plan.',
    ],
  },

  'seo-agency-islamabad': {
    label: 'Ongoing SEO Partnership',
    heading: 'A Long-Term SEO Partner in Islamabad',
    paragraphs: [
      'Rankings in competitive Islamabad sectors such as real estate, education, healthcare and IT services are earned over months, not weeks. Our agency retainers cover the ongoing work that compounds: new content every month, internal linking, digital PR and continuous technical monitoring.',
      'You get a dedicated SEO lead, a shared content calendar and a monthly review meeting — in person at your office if you prefer — covering rankings, organic leads and next month’s priorities.',
      'We also partner with other agencies and freelancers who need reliable white-label SEO delivery for their own Islamabad clients, under NDA and with reports branded as their own.',
    ],
  },

  'digital-marketing-islamabad': {
    label: 'Full-Service in Islamabad',
    heading: 'One Islamabad Team for Your Whole Marketing Mix',
    paragraphs: [
      'Most Islamabad businesses we speak to juggle a web developer, a social media freelancer and someone running ads, with nobody responsible for the overall result. We bring website, SEO, Google Ads, Meta ads and content under one plan and one monthly report.',
      'The channel mix depends on who you sell to: Google search and LinkedIn for B2B, tech and consulting firms; Facebook, Instagram and TikTok for restaurants, retail and education; local SEO and Google Maps for clinics and service businesses.',
      'Being local means we can meet at your office, shoot photos and video on location, and react quickly to Islamabad-specific moments like admissions seasons, property expos and Ramadan campaigns.',
    ],
  },

  'digital-marketing-agency-pakistan': {
    label: 'Across Pakistan',
    heading: 'Digital Marketing Built for the Pakistani Market',
    paragraphs: [
      'Marketing in Pakistan has its own rhythm: Ramadan and Eid drive the biggest shopping peaks, wedding season shapes fashion and events, and WhatsApp is often where sales actually close. We plan campaigns around those moments rather than borrowing a Western calendar.',
      'Audiences differ sharply between cities and languages, so we test English, Urdu and Roman Urdu creative and target Karachi, Lahore, Islamabad and smaller cities separately to see where your cost per customer is lowest.',
      'From our Islamabad base we work with brands nationwide, and as a US-registered LLC we also help Pakistani exporters and service firms market to customers in the USA, UK and Gulf.',
    ],
  },

  'wordpress-developer-islamabad': {
    label: 'WordPress in Islamabad',
    heading: 'Islamabad WordPress Developers You Can Meet',
    paragraphs: [
      'Hiring a single freelance WordPress developer often leaves a business stuck when that person moves on. With us you get a team based in Islamabad that documents every build, so your site never depends on one individual.',
      'We build custom themes, WooCommerce stores and bespoke plugins for Islamabad schools, clinics, NGOs, real-estate firms and retailers, and we take over existing sites that need fixing, speeding up or securing.',
      'Monthly care plans cover core and plugin updates, backups, uptime monitoring and small content changes, with support available in person in Islamabad when something needs a proper conversation.',
    ],
  },

  'shopify-expert-islamabad': {
    label: 'Shopify in Islamabad',
    heading: 'Shopify Stores for Islamabad Brands Selling Nationwide',
    paragraphs: [
      'Islamabad’s growing direct-to-consumer brands — fashion, beauty, home décor, food and gifting — often sell to customers across Pakistan and abroad. Shopify gives them a reliable store that scales without server headaches.',
      'We set up Shopify with the local essentials: cash on delivery, Pakistani payment gateways, courier integrations for nationwide delivery and WhatsApp order notifications, plus Shopify Markets when you start selling internationally.',
      'You can meet our team in Islamabad for product photography planning, store walkthroughs and training, so your staff can manage orders, inventory and discounts confidently after launch.',
    ],
  },

  'google-ads-agency-islamabad': {
    label: 'Google Ads in Islamabad',
    heading: 'Google Ads Targeted to the Twin Cities',
    paragraphs: [
      'For Islamabad and Rawalpindi businesses, precise location targeting is where Google Ads budgets are won or lost. We target the sectors and areas you actually serve and schedule ads around when local customers search and call.',
      'Clinics, schools, property developers, law firms and home-service companies in Islamabad get campaigns built around call and WhatsApp conversions, with call tracking so you can see which keywords bring real enquiries.',
      'We review search terms weekly to block irrelevant spend and meet you monthly, in person if you like, to go through cost per lead and next steps.',
    ],
  },

  'facebook-ads-agency-islamabad': {
    label: 'Facebook Ads in Islamabad',
    heading: 'Facebook & Instagram Campaigns for Islamabad Audiences',
    paragraphs: [
      'Facebook and Instagram reach almost every online audience in Islamabad, from university students and young professionals to families choosing schools, restaurants and property. The challenge is creative that stands out in a crowded feed.',
      'We plan and produce ad creative locally — photos and short videos shot in Islamabad — and run lead campaigns that feed straight into WhatsApp or Messenger, where most local customers prefer to continue the conversation.',
      'Campaigns are timed around Islamabad’s calendar, such as admissions seasons, Ramadan and Eid, property expos and summer holidays, and reported monthly with cost per lead and the creatives that drove results.',
    ],
  },

  'app-development-company-islamabad': {
    label: 'Apps from Islamabad',
    heading: 'Mobile App Development With an Islamabad Team',
    paragraphs: [
      'Islamabad is one of Pakistan’s main technology hubs, with universities like NUST, COMSATS and Quaid-i-Azam University feeding a strong developer community. Our app team works from here, so local clients can join sprint reviews in person.',
      'We build iOS and Android apps for startups, schools, healthcare providers, delivery services and enterprises, including the admin dashboards and APIs behind them, and integrate local payment methods where apps take payments in Pakistan.',
      'Projects run in short sprints with a working build you can test every two weeks, and we handle store submission, analytics and post-launch updates.',
    ],
  },

  'social-media-marketing-pakistan': {
    label: 'Social Media in Pakistan',
    heading: 'Social Media That Fits How Pakistan Scrolls',
    paragraphs: [
      'Facebook, Instagram, TikTok and YouTube each reach very different Pakistani audiences, and short video now drives most organic reach. We pick the two or three platforms your customers actually use rather than posting everywhere.',
      'Content is planned in a monthly calendar mixing Urdu, English and Roman Urdu, product and behind-the-scenes posts, reels and short videos, with campaigns built around Ramadan, Eid, Independence Day, wedding season and sales events.',
      'We manage comments and messages, route sales enquiries to WhatsApp and report monthly on reach, engagement and — most importantly — enquiries and sales from social.',
    ],
  },

  // ── PAKISTAN CITIES ─────────────────────────────────────────────────────────

  'rawalpindi': {
    label: 'The Twin City',
    heading: 'Growing Rawalpindi Businesses Online',
    paragraphs: [
      'Rawalpindi shares a metro with Islamabad but has a character of its own: dense wholesale and retail markets in Raja Bazaar and Saddar, a large cantonment, and fast-growing housing schemes like Bahria Town and DHA along the expressway.',
      'Many Rawalpindi businesses still win most customers through walk-ins and word of mouth. We help them add the digital layer that customers now check first — a Google Business Profile with reviews, a simple mobile website and WhatsApp ordering — before investing in ads.',
      'Our Islamabad studio is close enough for regular face-to-face meetings, so planning, photo shoots and training can happen in person rather than over a screen.',
    ],
  },

  'lahore': {
    label: 'Serving Lahore',
    heading: 'Digital Marketing for Lahore’s Competitive Market',
    paragraphs: [
      'As the capital of Punjab and Pakistan’s cultural centre, Lahore is home to many of the country’s fashion labels, restaurant groups, private universities and textile exporters. Its consumers are active online shoppers, which makes digital competition intense in categories like clothing, food and education.',
      'For consumer brands we focus on Instagram and TikTok creative, influencer collaborations and fast e-commerce sites; for exporters and manufacturers in the Lahore–Sheikhupura belt we build English-first websites and LinkedIn and Google campaigns aimed at international buyers.',
      'We work with Lahore clients remotely through video calls and shared dashboards, and plan campaigns around the city’s big moments such as lawn season launches, wedding season and the Eid shopping peaks.',
    ],
  },

  'karachi': {
    label: 'Serving Karachi',
    heading: 'Digital Marketing for Pakistan’s Business Capital',
    paragraphs: [
      'Karachi is Pakistan’s largest city, its main port and its financial capital, home to the Pakistan Stock Exchange and the State Bank. That mix creates two very different marketing needs: B2B firms selling to corporates, and consumer brands competing for one of the country’s biggest online audiences.',
      'For logistics, import-export, financial and industrial companies we focus on credibility — professional websites, LinkedIn and search campaigns aimed at decision-makers. For retail, food delivery and lifestyle brands in Clifton, DHA and Gulshan we run performance campaigns on Meta and Google with fast landing pages.',
      'We serve Karachi remotely from Islamabad, with campaigns reported monthly on cost per lead and sales rather than likes or impressions.',
    ],
  },

  'peshawar': {
    label: 'Serving Peshawar',
    heading: 'Digital Marketing for Peshawar and Khyber Pakhtunkhwa',
    paragraphs: [
      'Peshawar, the capital of Khyber Pakhtunkhwa, is one of South Asia’s oldest trading cities, and commerce from Qissa Khwani to the newer markets of Hayatabad and University Town is increasingly moving online.',
      'Audiences here respond well to content in Urdu and Pashto, and to trust built through reviews, video and personal contact. We build bilingual websites, run Facebook and TikTok campaigns in local languages, and set up WhatsApp ordering so customers can buy the way they already prefer.',
      'Education, healthcare, real estate, dry-fruit and handicraft traders are well placed to reach customers across KP and beyond, and we run their campaigns remotely from Islamabad, a short trip down the motorway when a meeting helps.',
    ],
  },

  'multan': {
    label: 'Serving Multan',
    heading: 'Taking Multan Businesses Beyond South Punjab',
    paragraphs: [
      'Multan is the commercial centre of South Punjab, known for its mangoes, cotton trade, blue pottery and shrines that draw visitors from across the country. Many local producers now sell nationwide and abroad, and digital channels make that far easier.',
      'We help Multan businesses — from mango and agricultural exporters to handicraft sellers, schools, hospitals and retailers on Bosan Road and in Cantt — build e-commerce stores and websites that reach customers well outside the city.',
      'Seasonal campaigns matter here: mango season orders, harvest cycles and festival periods are planned months ahead, with Facebook and Google ads timed to catch demand when it peaks.',
    ],
  },

  'faisalabad': {
    label: 'Serving Faisalabad',
    heading: 'Digital Growth for Pakistan’s Textile City',
    paragraphs: [
      'Faisalabad, often called the Manchester of Pakistan, is the heart of the country’s textile industry, with spinning, weaving, processing and home-textile manufacturers selling to buyers around the world.',
      'For exporters, the website is often the first test a foreign buyer applies. We build English-first sites with clear product ranges, certifications, factory capabilities and enquiry forms, and support them with LinkedIn outreach and Google campaigns in target export markets.',
      'Local retailers and brands around D Ground, Susan Road and Kohinoor City get consumer-focused marketing instead — Instagram, Facebook and online stores aimed at shoppers in Faisalabad and across Punjab.',
    ],
  },

  'sialkot': {
    label: 'Serving Sialkot',
    heading: 'Export Marketing for Sialkot Manufacturers',
    paragraphs: [
      'Sialkot is one of Pakistan’s most export-driven cities, famous worldwide for footballs and sports goods, surgical instruments, leather products and gloves. Most of its customers are international brands and distributors, not local shoppers.',
      'That shapes the marketing: professional English websites that showcase manufacturing capability, quality certifications and OEM services; product catalogues buyers can download; and SEO and LinkedIn campaigns aimed at sourcing managers in Europe, the USA and the Gulf.',
      'As a US-registered LLC we understand what overseas buyers expect from a supplier’s online presence, and we work with Sialkot manufacturers remotely by video call and email.',
    ],
  },

  'gujranwala': {
    label: 'Serving Gujranwala',
    heading: 'Digital Marketing for Gujranwala Industry and Retail',
    paragraphs: [
      'Gujranwala is a major industrial city on the Grand Trunk Road, producing ceramics, sanitary fittings, cutlery, electric fans and steel goods sold across Pakistan and abroad, alongside a busy retail and food scene.',
      'Manufacturers here benefit from B2B websites with product catalogues, dealer enquiry forms and Google campaigns aimed at distributors nationwide, while restaurants and retailers grow with Facebook, Instagram and Google Maps visibility.',
      'We run Gujranwala projects remotely from Islamabad with clear monthly reporting, and we can build Urdu and English content so both trade buyers and local customers are served well.',
    ],
  },

  'abbottabad': {
    label: 'Serving Abbottabad',
    heading: 'Digital Marketing for Abbottabad and the Hazara Region',
    paragraphs: [
      'Abbottabad is known for its schools, colleges and medical institutions, and as the gateway to Nathia Gali, Thandiani and the wider Galiyat tourism region. Those two sectors — education and tourism — dominate local digital marketing.',
      'For schools and colleges we build admissions-focused websites and run enrolment campaigns timed to the academic calendar. For hotels, guest houses and tour operators we focus on Google Maps, booking-friendly websites and Instagram content that captures the region’s scenery.',
      'Abbottabad is a short drive from our Islamabad studio, so on-site visits for photography, video and planning are straightforward.',
    ],
  },

  'quetta': {
    label: 'Serving Quetta',
    heading: 'Bringing Quetta Businesses Online',
    paragraphs: [
      'Quetta, the capital of Balochistan, is a trading city linked to markets in Iran and Afghanistan and famous across Pakistan for its dry fruits, dates and carpets. Many local traders now sell to customers in other cities through online stores and social media.',
      'We build mobile-first websites and Shopify or WooCommerce stores with nationwide courier delivery, and run Facebook and Instagram campaigns that reach buyers in Karachi, Lahore and Islamabad, not only in Quetta itself.',
      'All work is delivered remotely with WhatsApp updates and video calls, and we keep sites lightweight so they load quickly on the mobile connections most local customers rely on.',
    ],
  },

  // ── USA ─────────────────────────────────────────────────────────────────────

  'usa': {
    label: 'Working With US Clients',
    heading: 'A US-Registered Agency With an Offshore Delivery Team',
    paragraphs: [
      'Abbas Digital Agency LLC is registered in Kalispell, Montana, so US clients sign a US contract, pay in USD and have a US point of contact. The design, development and marketing work is delivered by our team in Islamabad, which is how we keep rates well below typical US agency pricing.',
      'We schedule calls in your business hours across Eastern, Central, Mountain and Pacific time, and use shared project boards so you can see progress at any time rather than waiting for updates.',
      'US clients most often come to us for websites, Shopify stores, local SEO and Google Ads, and for white-label delivery when they run an agency of their own. You own everything we build from day one.',
    ],
  },

  'new-york': {
    label: 'Serving New York',
    heading: 'Competing in New York Without New York Agency Rates',
    paragraphs: [
      'New York is one of the most competitive digital markets in the world, and agency rates there reflect it. Law firms, real-estate brokers, restaurants, clinics and professional services across the five boroughs come to us for the same quality of work at a fraction of the cost.',
      'Local search in New York is hyper-specific: people search by neighbourhood, from Midtown and the Upper East Side to Williamsburg and Long Island City. We build location pages and Google Business Profile strategies around the neighbourhoods you actually serve.',
      'Projects are run on Eastern Time-friendly schedules, contracted through our US LLC and billed in USD.',
    ],
  },

  'texas': {
    label: 'Serving Texas',
    heading: 'Digital Marketing Across Texas Metros',
    paragraphs: [
      'Texas is really several large markets — Houston, Dallas–Fort Worth, Austin and San Antonio — each with its own competitors and search behaviour. A single statewide campaign usually wastes budget, so we plan SEO and ads metro by metro.',
      'Home-service companies, contractors, healthcare providers and energy-sector suppliers make up much of our Texas work, where local SEO, Google Ads and fast quote-request websites drive the most leads.',
      'Bilingual English and Spanish content can open up a large share of the Texas market, and we build it into websites and campaigns where your customers need it.',
    ],
  },

  'california': {
    label: 'Serving California',
    heading: 'Digital Marketing for California Businesses',
    paragraphs: [
      'California covers some of the most expensive agency markets in the US — Los Angeles, the San Francisco Bay Area and San Diego — and many startups, e-commerce brands and service businesses there look offshore to stretch their budgets.',
      'California also has the strictest privacy rules in the country under the CCPA and CPRA. We build websites with consent management, clear privacy notices and analytics set up to respect opt-outs, so your marketing data is collected properly.',
      'Our work for California clients ranges from Shopify and direct-to-consumer stores to SaaS marketing sites and local SEO for clinics, restaurants and home services, all contracted through our US LLC.',
    ],
  },

  'florida': {
    label: 'Serving Florida',
    heading: 'Digital Marketing for Florida’s Growing Market',
    paragraphs: [
      'Florida’s fast-growing population and huge visitor numbers make it a strong market for real estate, tourism, hospitality, healthcare and home services, from Miami and Fort Lauderdale to Orlando, Tampa and Jacksonville.',
      'Many Florida audiences are bilingual, especially in South Florida, so we build English and Spanish landing pages and ads where they improve results. Seasonal demand — snowbird months, hurricane season and tourist peaks — shapes when we push budget hardest.',
      'Florida clients work with us through our US-registered LLC on Eastern Time-friendly schedules, with everything we build owned by you.',
    ],
  },

  'chicago': {
    label: 'Serving Chicago',
    heading: 'Digital Marketing for Chicago and the Midwest',
    paragraphs: [
      'Chicago is the business hub of the Midwest, with strong manufacturing, logistics, healthcare and professional-services sectors alongside a big restaurant and retail scene from the Loop and River North to the suburbs.',
      'B2B and industrial firms get websites and search campaigns built around how procurement teams research suppliers, while local businesses focus on Google Maps rankings and neighbourhood SEO across the city and Chicagoland suburbs.',
      'We plan around Chicago’s seasons, too — winter service demand for home services and summer peaks for hospitality — and work on Central Time-friendly schedules through our US LLC.',
    ],
  },

  'houston': {
    label: 'Serving Houston',
    heading: 'Digital Marketing for Houston Businesses',
    paragraphs: [
      'Houston is a sprawling metro built on energy, healthcare and shipping, home to the Texas Medical Center and one of the most diverse populations in the US. Its size means customers search by area — Katy, Sugar Land, The Woodlands, Pearland — rather than “Houston”.',
      'We build service-area pages and Google Business Profile strategies for each part of the metro you cover, which is especially effective for contractors, clinics, law firms and home-service companies.',
      'For energy and industrial suppliers we create technical B2B websites and LinkedIn campaigns, all contracted through our US LLC and run on Central Time-friendly schedules.',
    ],
  },

  'dallas': {
    label: 'Serving Dallas–Fort Worth',
    heading: 'Digital Marketing Across the Dallas–Fort Worth Metroplex',
    paragraphs: [
      'Dallas–Fort Worth is one of the fastest-growing metros in the US, with many corporate headquarters, financial and real-estate firms, and booming suburbs such as Plano, Frisco, McKinney and Arlington.',
      'Growth brings competition, especially for real-estate agents, builders, home services and healthcare. We focus on suburb-level local SEO, Google Ads with tight geographic targeting and websites built to convert mobile searchers quickly.',
      'Corporate and B2B clients in the Metroplex use us for marketing websites, SEO content and white-label development, contracted through our US-registered LLC.',
    ],
  },

  'los-angeles': {
    label: 'Serving Los Angeles',
    heading: 'Digital Marketing for Los Angeles Brands',
    paragraphs: [
      'Los Angeles is home to entertainment, fashion, beauty and a large share of America’s direct-to-consumer brands, plus a restaurant and wellness scene spread across dozens of distinct neighbourhoods.',
      'For e-commerce and lifestyle brands we build Shopify stores and run creative-led Meta and TikTok campaigns; for restaurants, studios, clinics and services we focus on local SEO for the neighbourhoods customers search, from Santa Monica to Silver Lake.',
      'We support English and Spanish content, set up CCPA-compliant consent and analytics, and work on Pacific Time-friendly schedules through our US LLC.',
    ],
  },

  // ── UK & GULF ───────────────────────────────────────────────────────────────

  'london': {
    label: 'Serving London & the UK',
    heading: 'Digital Marketing for London Businesses',
    paragraphs: [
      'London businesses face some of the highest agency rates in Europe. Our Islamabad team works just four to five hours ahead of the UK, so a London morning overlaps with our afternoon for same-day collaboration.',
      'We build websites and stores that meet UK expectations: UK GDPR-compliant cookie consent and privacy notices, accessible design and fast hosting, with local SEO for the boroughs and areas you serve across Greater London.',
      'Many of our UK clients also sell to the British Pakistani and South Asian community, and we can run campaigns and content in English and Urdu to reach both audiences.',
    ],
  },

  'dubai': {
    label: 'Serving Dubai',
    heading: 'Digital Marketing for Dubai’s International Market',
    paragraphs: [
      'Dubai’s mix of residents and visitors from over a hundred nationalities means campaigns often run in English and Arabic, with audiences segmented by language and community. Real estate, hospitality, retail, e-commerce and professional services dominate local digital spend.',
      'We build bilingual English–Arabic websites with right-to-left layouts, run Google and Meta campaigns targeted by area — Downtown, Business Bay, Dubai Marina, JLT — and set up WhatsApp-first lead handling, which UAE customers expect.',
      'The UAE is one hour behind Pakistan, so our team works almost entirely within your business day.',
    ],
  },

  'abu-dhabi': {
    label: 'Serving Abu Dhabi',
    heading: 'Digital Marketing for Abu Dhabi Organisations',
    paragraphs: [
      'As the UAE’s capital, Abu Dhabi has a strong base of government entities, energy companies, healthcare providers, education and hospitality, alongside a fast-growing SME sector.',
      'Organisations here often need formal, bilingual English–Arabic websites with accessibility and data-protection considerations built in, plus content that carries authority. We design, build and maintain those sites and support them with SEO and paid campaigns.',
      'Because the UAE is only one hour behind Pakistan, our team works in step with your office hours throughout the week.',
    ],
  },

  'riyadh': {
    label: 'Serving Riyadh',
    heading: 'Digital Marketing for Riyadh and Saudi Arabia',
    paragraphs: [
      'Saudi Arabia’s Vision 2030 programme is accelerating digital adoption across the kingdom, and Riyadh is at the centre of it, with new businesses in retail, hospitality, entertainment, healthcare and technology launching online from day one.',
      'Saudi audiences expect Arabic-first websites with proper right-to-left design, and they are among the heaviest users of Snapchat, TikTok and Instagram in the world, so we plan social campaigns accordingly alongside Google search.',
      'Saudi Arabia is two hours behind Pakistan, which keeps our working days closely aligned for calls and fast turnarounds.',
    ],
  },

  'doha': {
    label: 'Serving Doha',
    heading: 'Digital Marketing for Doha and Qatar',
    paragraphs: [
      'Qatar invested heavily in hospitality, transport and entertainment ahead of the 2022 FIFA World Cup, and Doha’s businesses — from hotels and restaurants in West Bay and Lusail to retailers, clinics and education providers — now compete for both residents and visitors online.',
      'We build bilingual English–Arabic websites, set up Google Business Profiles and run search and social campaigns aimed at Doha’s international population, with WhatsApp as the main enquiry channel.',
      'Qatar is two hours behind Pakistan, so our team overlaps with most of your working day.',
    ],
  },

  // ── INDUSTRIES ──────────────────────────────────────────────────────────────

  'law-firm-marketing': {
    label: 'Marketing for Law Firms',
    heading: 'Winning Clients Who Are Searching for a Lawyer Now',
    paragraphs: [
      'People rarely browse for a lawyer — they search when they have a problem, often urgently. That makes practice-area pages, Google Maps visibility and click-to-call the core of law firm marketing, far more than social media.',
      'We build a separate, detailed page for each practice area and location you serve, write plain-language answers to the questions clients ask before they call, and add attorney profiles with credentials that build trust and support E-E-A-T signals.',
      'Every website and ad is written with professional conduct rules in mind: no guarantees of outcomes, clear disclaimers where required, and confidential intake forms that protect client information.',
    ],
  },

  'real-estate-marketing': {
    label: 'Marketing for Real Estate',
    heading: 'Generating Buyer and Seller Leads You Own',
    paragraphs: [
      'Property portals send leads to many agents at once. Real-estate firms that grow sustainably build their own pipeline: a fast website with searchable listings, area guides for the neighbourhoods they cover and lead capture on every property page.',
      'For developers and housing societies we run project-launch campaigns with dedicated landing pages, virtual tours, payment-plan calculators and Facebook and Google lead forms that connect straight to the sales team.',
      'Leads are followed up automatically by WhatsApp and email so no enquiry goes cold, and reporting shows which campaigns produce site visits and bookings, not just form fills.',
    ],
  },

  'medical-marketing': {
    label: 'Marketing for Healthcare',
    heading: 'Helping Patients Find and Choose Your Practice',
    paragraphs: [
      'Patients choose clinics and hospitals on trust: doctor credentials, reviews, clear information about services and how easy it is to book. Healthcare websites have to deliver all of that while staying accurate and responsible about medical claims.',
      'We build sites with doctor profiles, service pages written in plain language, online appointment booking and WhatsApp contact, plus Google Business Profile optimisation for each location so patients find you in “near me” searches.',
      'Patient privacy comes first. Forms collect only what is needed, data is handled securely, and for US providers we follow HIPAA-conscious practices when choosing booking, form and analytics tools.',
    ],
  },

  'dentist-marketing': {
    label: 'Marketing for Dentists',
    heading: 'Filling Your Appointment Book With the Treatments You Want',
    paragraphs: [
      'Dental marketing works best when it is treatment-specific. Patients search for implants, braces, whitening or an emergency dentist, so we create a page and campaign for each high-value treatment rather than one generic “dental services” page.',
      'Before-and-after galleries, transparent information about procedures and financing, and a large set of genuine Google reviews do most of the persuading. We help practices collect reviews consistently and showcase them across the website and profile.',
      'Online booking, reminder messages and recall campaigns for check-ups keep the chair full, and tracking shows which treatments and channels bring new patients.',
    ],
  },

  'restaurant-marketing': {
    label: 'Marketing for Restaurants',
    heading: 'Turning Hungry Searches Into Orders and Bookings',
    paragraphs: [
      'For restaurants, the Google Business Profile often matters more than the website: photos, menu, opening hours, reviews and the order button are what people check before choosing where to eat. We optimise it first.',
      'Then we build fast, mobile menus and direct ordering so you are not paying platform commission on every order, and connect reservations and WhatsApp for bookings and catering enquiries.',
      'Instagram and TikTok carry food brands, so we plan short-form video and food photography around new dishes, deals and festive seasons like Ramadan iftar and Eid, with local ads to people within delivery range.',
    ],
  },

  'construction-company-marketing': {
    label: 'Marketing for Construction',
    heading: 'Showing Your Work to the Clients Who Award Projects',
    paragraphs: [
      'Construction clients — homeowners, developers and procurement teams — want proof before they shortlist a builder. A strong project portfolio with photos, scope, timelines and locations does more for a construction company than any slogan.',
      'We build portfolio-led websites with service pages for each type of work you do, from residential builds and renovations to commercial fit-outs, and capture project enquiries with detailed quote forms that qualify leads before your estimator calls back.',
      'Local SEO and Google Ads target the areas you build in, while LinkedIn and email keep you visible to developers and contractors who award larger contracts.',
    ],
  },

  'transport-company-marketing': {
    label: 'Marketing for Transport & Logistics',
    heading: 'Winning Shippers, Passengers and Fleet Contracts',
    paragraphs: [
      'Transport businesses range from courier and freight companies to bus operators, car rentals and chauffeur services, and each sells differently. B2B logistics firms win on reliability and coverage; passenger services win on easy online booking.',
      'For logistics companies we build websites that explain routes, fleet and service levels with instant quote requests and shipment tracking. For passenger and rental businesses we build booking flows with clear pricing, WhatsApp confirmation and Google Ads on high-intent searches such as airport transfers.',
      'Google Maps visibility for depots and offices, plus reviews from regular customers, adds the trust that converts first-time enquiries.',
    ],
  },

  'ecommerce-marketing': {
    label: 'Marketing for Online Stores',
    heading: 'Growing Revenue, Not Just Traffic',
    paragraphs: [
      'E-commerce growth comes from three levers: more of the right visitors, a higher conversion rate and more repeat purchases. We work on all three together instead of only buying more traffic.',
      'Acquisition runs through Google Shopping and Performance Max, Meta and TikTok creative testing and SEO for category and product pages. Conversion work covers product page copy, reviews, site speed and a simpler checkout.',
      'Retention is where margins improve: email and WhatsApp flows for abandoned carts, post-purchase follow-ups, win-back campaigns and loyalty offers, all tracked against revenue rather than opens and clicks.',
    ],
  },

  'school-marketing': {
    label: 'Marketing for Schools',
    heading: 'Helping Parents Choose Your School',
    paragraphs: [
      'Parents research schools carefully, comparing campuses, curriculum, fees, facilities and results, and they often decide months before the academic year starts. Your marketing has to be visible and convincing through that whole decision period.',
      'We build admissions-focused websites with campus tours, curriculum pages, fee information, teacher profiles and an online admission enquiry form, then run Facebook, Instagram and Google campaigns timed to your admissions window.',
      'Social media also keeps current parents engaged with events, achievements and announcements, which turns them into the word-of-mouth referrals schools depend on.',
    ],
  },

  'university-marketing': {
    label: 'Marketing for Universities',
    heading: 'Recruiting Students Program by Program',
    paragraphs: [
      'Students search for a program, not a university — “BS computer science”, “MBA weekend”, “nursing admission”. Universities and colleges recruit best with a dedicated, search-optimised page and campaign for each program.',
      'We build program pages with eligibility, fees, scholarships, career outcomes and deadlines, and run Google, Meta and YouTube campaigns aimed at students and parents in the cities and regions you recruit from, including international students where relevant.',
      'Enquiries flow into a CRM with automated follow-ups by email and WhatsApp, so admissions teams can see which programs and campaigns produce applications and enrolments.',
    ],
  },

  'automotive-marketing': {
    label: 'Marketing for Automotive',
    heading: 'Moving Cars, Bookings and Workshop Appointments',
    paragraphs: [
      'Automotive buyers research online long before they visit a showroom or workshop. Dealerships need searchable inventory with real photos and prices, workshops need service booking, and rental companies need simple online reservations.',
      'We build inventory websites with filters for make, model and budget, car rental booking flows and workshop service pages for each job you do, with Google Ads and Facebook Marketplace-style campaigns aimed at in-market buyers in your area.',
      'Reviews, finance information and fast WhatsApp responses close the gap between enquiry and visit, and tracking shows which listings and campaigns generate test drives, bookings and sales.',
    ],
  },

  'travel-agency-marketing': {
    label: 'Marketing for Travel',
    heading: 'Selling Tours, Umrah Packages and Holidays Online',
    paragraphs: [
      'Travel is planned online and booked on trust. Travel agencies compete on clear packages with prices and itineraries, proof that they are licensed and reliable, and fast answers to questions about visas, dates and payment.',
      'We build package-led websites with itinerary pages, enquiry and booking forms and WhatsApp chat, and run seasonal campaigns for Umrah and Hajj, summer holidays, northern-area tours and international destinations.',
      'Reviews, photos from past trips and transparent terms reduce hesitation, while retargeting brings back visitors who browsed a package but did not book.',
    ],
  },
}
