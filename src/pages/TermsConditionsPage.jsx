import SEO from '../components/SEO'
import LegalLayout from '../components/LegalLayout'
import { organizationSchema, breadcrumbSchema } from '../lib/schema'

const sections = [
  {
    id: 'agreement',
    heading: 'Agreement to Terms',
    body: (
      <>
        <p>
          These Terms and Conditions (“Terms”) govern your access to and use of the website
          <strong> abbasdigitalagency.com</strong> and the services provided by Abbas Digital Agency
          (“Abbas Digital Agency,” “we,” “us,” or “our”), a US-registered, Pakistan-based digital
          agency.
        </p>
        <p>
          By accessing our Website, requesting a quote, or engaging our services, you agree to be
          bound by these Terms. If you do not agree with any part of these Terms, please do not use
          our Website or services.
        </p>
      </>
    ),
  },
  {
    id: 'services',
    heading: 'Our Services',
    body: (
      <>
        <p>
          Abbas Digital Agency provides digital services including, but not limited to, web
          development, e-commerce solutions, mobile app development, AI automation and chatbots,
          digital marketing, search engine optimization (SEO), branding and design, and ERP
          solutions.
        </p>
        <p>
          The specific scope, deliverables, timeline and price of any project are defined in a
          separate written proposal, quotation or service agreement. In the event of any conflict
          between these Terms and a signed project agreement, the project agreement prevails.
        </p>
      </>
    ),
  },
  {
    id: 'quotes-payments',
    heading: 'Quotes, Payments & Refunds',
    body: (
      <>
        <ul>
          <li>All quotes are provided in writing and remain valid for the period stated in the proposal.</li>
          <li>Projects typically require an upfront deposit before work begins, with the balance payable per the agreed milestones.</li>
          <li>Invoices are due within the timeframe stated on the invoice. Late payments may pause active work until the account is settled.</li>
          <li>
            Because our work is custom and time-intensive, deposits and payments for completed
            milestones are generally non-refundable. Any refund eligibility will be set out in your
            project agreement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'client-responsibilities',
    heading: 'Client Responsibilities',
    body: (
      <>
        <p>To help us deliver your project on time, you agree to:</p>
        <ul>
          <li>Provide accurate, complete and timely information, content and materials.</li>
          <li>Review deliverables and provide feedback within the agreed timeframes.</li>
          <li>Ensure you hold the necessary rights to any content you supply to us.</li>
          <li>Designate a point of contact authorized to approve work and make decisions.</li>
        </ul>
        <p>
          Delays caused by late feedback or missing materials may affect the project timeline and
          are not the responsibility of Abbas Digital Agency.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual Property',
    body: (
      <>
        <p>
          All content on our Website — including text, graphics, logos, code, and design — is the
          property of Abbas Digital Agency or its licensors and is protected by applicable
          intellectual property laws. You may not copy, reproduce or distribute it without written
          permission.
        </p>
        <p>
          Upon full payment for a project, ownership of the final agreed deliverables transfers to
          the client, unless stated otherwise in the project agreement. We retain the right to
          display completed work in our portfolio and marketing materials unless a confidentiality
          agreement specifies otherwise.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable Use',
    body: (
      <>
        <p>When using our Website and services, you agree not to:</p>
        <ul>
          <li>Use them for any unlawful, fraudulent or harmful purpose.</li>
          <li>Attempt to gain unauthorized access to our systems or networks.</li>
          <li>Introduce viruses, malware or any malicious code.</li>
          <li>Infringe the intellectual property or other rights of any third party.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    heading: 'Third-Party Services',
    body: (
      <p>
        Our services may rely on third-party platforms and tools (for example hosting, payment
        gateways, analytics and advertising networks). We are not responsible for the availability,
        performance or policies of these third parties, and your use of them may be subject to their
        own terms.
      </p>
    ),
  },
  {
    id: 'warranties',
    heading: 'Warranties & Disclaimers',
    body: (
      <p>
        We deliver our services with professional skill and care. However, the Website and its
        content are provided “as is” without warranties of any kind, express or implied. We do not
        guarantee specific results from marketing or SEO campaigns, as outcomes depend on factors
        beyond our control, including search engine algorithms and market conditions.
      </p>
    ),
  },
  {
    id: 'liability',
    heading: 'Limitation of Liability',
    body: (
      <p>
        To the fullest extent permitted by law, Abbas Digital Agency shall not be liable for any
        indirect, incidental, special or consequential damages, or for any loss of profits, revenue
        or data, arising from your use of our Website or services. Our total liability for any claim
        shall not exceed the amount paid by you for the specific service giving rise to the claim.
      </p>
    ),
  },
  {
    id: 'termination',
    heading: 'Termination',
    body: (
      <p>
        Either party may terminate a project agreement in accordance with its terms. We reserve the
        right to suspend or terminate access to our Website or services if these Terms are breached.
        Upon termination, you remain responsible for payment of all work completed up to the
        termination date.
      </p>
    ),
  },
  {
    id: 'governing-law',
    heading: 'Governing Law',
    body: (
      <p>
        These Terms are governed by the laws of the Islamic Republic of Pakistan, without regard to
        its conflict-of-law principles. Any disputes arising from these Terms or our services shall
        be subject to the jurisdiction of the courts of Islamabad, Pakistan, unless otherwise agreed
        in writing.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to These Terms',
    body: (
      <p>
        We may update these Terms from time to time. The most current version will always be posted
        on this page with an updated “Last updated” date. Your continued use of our Website or
        services after changes are posted constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Us',
    body: (
      <>
        <p>If you have any questions about these Terms and Conditions, please contact us:</p>
        <ul>
          <li>Email: <a href="mailto:info@abbasdigitalagency.com">info@abbasdigitalagency.com</a></li>
          <li>Phone (Pakistan): +92 300 5935125</li>
          <li>Phone (USA): +1 843 733 0701</li>
          <li>Pakistan Office: H 1-A, IVY Street, Banigala, Islamabad, Pakistan</li>
          <li>USA Office: 1001 S Main St Ste 500, Kalispell, MT 59901, USA</li>
        </ul>
      </>
    ),
  },
]

export default function TermsConditionsPage() {
  return (
    <>
      <SEO
        title="Terms & Conditions — Abbas Digital Agency"
        description="Read the Terms and Conditions for using Abbas Digital Agency's website and digital services, including payments, intellectual property, liability and your responsibilities."
        keywords="Abbas Digital Agency terms and conditions, terms of service, service agreement, website terms"
        path="/terms-and-conditions"
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms & Conditions', path: '/terms-and-conditions' },
          ]),
        ]}
      />
      <LegalLayout
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="These Terms and Conditions set out the rules for using the Abbas Digital Agency website and engaging our digital services. Please read them carefully before working with us."
        updated="June 30, 2026"
        sections={sections}
      />
    </>
  )
}
