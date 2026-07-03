import SEO from '../components/SEO'
import LegalLayout from '../components/LegalLayout'
import { organizationSchema, breadcrumbSchema } from '../lib/schema'

const sections = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>
          Abbas Digital Agency (“Abbas Digital Agency,” “we,” “us,” or “our”) is a US-registered,
          Pakistan-based digital agency providing web development, e-commerce, mobile app
          development, AI automation, digital marketing, SEO, branding and ERP solutions. We are
          committed to protecting the privacy of every visitor, client and prospect who interacts
          with us through <strong>abbasdigitalagency.com</strong> (the “Website”).
        </p>
        <p>
          This Privacy Policy explains what information we collect, how we use and protect it, and
          the choices you have regarding your personal data. By using our Website or services, you
          agree to the practices described in this policy.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    heading: 'Information We Collect',
    body: (
      <>
        <p>We collect information in the following ways:</p>
        <ul>
          <li>
            <strong>Information you provide directly</strong> — your name, email address, phone
            number, company name, project details and any message you send through our contact
            forms, the AI business analyzer, email or WhatsApp.
          </li>
          <li>
            <strong>Information collected automatically</strong> — IP address, browser type, device
            information, referring pages, pages viewed and time spent, gathered through cookies and
            analytics tools.
          </li>
          <li>
            <strong>Project and billing information</strong> — details necessary to deliver our
            services and process payments when you become a client.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    heading: 'How We Use Your Information',
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to enquiries, quotes and consultation requests.</li>
          <li>Deliver, maintain and improve our services and Website.</li>
          <li>Send project updates, invoices and service-related communications.</li>
          <li>Send marketing or promotional material where you have opted in (you may opt out at any time).</li>
          <li>Analyze traffic and usage to improve performance, content and user experience.</li>
          <li>Comply with legal obligations and prevent fraud or misuse.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    heading: 'Cookies & Analytics',
    body: (
      <>
        <p>
          Our Website uses cookies and similar technologies, including Google Analytics, to
          understand how visitors use the site and to improve our content and services. Cookies are
          small text files stored on your device. You can disable cookies through your browser
          settings, though some features of the Website may not function correctly as a result.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    heading: 'How We Share Your Information',
    body: (
      <>
        <p>
          We do not sell or rent your personal information. We may share data only with:
        </p>
        <ul>
          <li>
            <strong>Trusted service providers</strong> — such as hosting, analytics, email and
            payment processors who help us operate our business and are bound to keep your data
            confidential.
          </li>
          <li>
            <strong>Legal authorities</strong> — when required by law, regulation, legal process or
            to protect our rights, users or the public.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-security',
    heading: 'Data Security',
    body: (
      <p>
        We apply reasonable technical and organizational measures — including encrypted connections
        (HTTPS), access controls and trusted infrastructure — to protect your personal information
        against loss, misuse and unauthorized access. No method of transmission over the Internet is
        100% secure, however, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'data-retention',
    heading: 'Data Retention',
    body: (
      <p>
        We retain personal information only for as long as necessary to fulfil the purposes outlined
        in this policy, to deliver our services, and to comply with legal, accounting or reporting
        obligations. When data is no longer required, we securely delete or anonymize it.
      </p>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your Rights',
    body: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of your personal data.</li>
          <li>Object to or restrict certain processing of your data.</li>
          <li>Withdraw consent and unsubscribe from marketing communications at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:info@abbasdigitalagency.com">info@abbasdigitalagency.com</a>.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    heading: 'Third-Party Links',
    body: (
      <p>
        Our Website may contain links to third-party websites or services that we do not operate. We
        are not responsible for the privacy practices or content of those sites. We encourage you to
        review the privacy policy of every website you visit.
      </p>
    ),
  },
  {
    id: 'childrens-privacy',
    heading: "Children's Privacy",
    body: (
      <p>
        Our services are intended for businesses and individuals aged 18 and over. We do not
        knowingly collect personal information from children. If you believe a child has provided us
        with personal data, please contact us so we can remove it.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        legal requirements. Any changes will be posted on this page with an updated “Last updated”
        date. We encourage you to review this policy periodically.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Us',
    body: (
      <>
        <p>
          If you have any questions about this Privacy Policy or how we handle your data, please
          contact us:
        </p>
        <ul>
          <li>Email: <a href="mailto:info@abbasdigitalagency.com">info@abbasdigitalagency.com</a></li>
          <li>Phone (Pakistan): +92 300 5935125</li>
          <li>Phone (USA): +1 843 733 0701</li>
          <li>WhatsApp (USA): <a href="https://wa.me/16677662781" target="_blank" rel="noopener noreferrer">+1 (667) 766-2781</a></li>
          <li>Pakistan Office: H 1-A, IVY Street, Banigala, Islamabad, Pakistan</li>
          <li>USA Office: 1001 S Main St Ste 500, Kalispell, MT 59901, USA</li>
        </ul>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy — Abbas Digital Agency"
        description="Read the Abbas Digital Agency Privacy Policy. Learn what personal data we collect, how we use and protect it, our cookie practices and the privacy rights you have."
        keywords="Abbas Digital Agency privacy policy, data protection, cookie policy, personal data, privacy rights"
        path="/privacy-policy"
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy-policy' },
          ]),
        ]}
      />
      <LegalLayout
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Your privacy matters to us. This policy explains what information Abbas Digital Agency collects, how we use and safeguard it, and the choices and rights you have over your personal data."
        updated="June 30, 2026"
        sections={sections}
      />
    </>
  )
}
