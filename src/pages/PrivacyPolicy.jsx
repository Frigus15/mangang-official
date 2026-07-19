import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowLeft, Lock, Eye, Database, Share2, Bell, UserCheck, Globe, Phone, Shield } from 'lucide-react';

const SECTIONS = [
  {
    icon: <Eye size={20} />,
    title: '1. Information We Collect',
    content: `We collect several types of information in connection with the services we provide. The types of information we collect include:

Personal Information: When you create an account or place an order, we collect information you provide directly, such as your full name, email address, phone number, shipping address, and payment card details (processed securely through our payment gateway).

Automatically Collected Information: When you use our Service, we may automatically collect certain information, including your IP address, browser type and version, device identifiers, operating system, referring URLs, and information about your interactions with our website (pages viewed, time spent, clicks, and scroll patterns).

Transaction Data: We retain records of your purchases, order history, and financial transactions for accounting, legal compliance, and customer service purposes.

Communications: If you contact us for customer support or with questions, we may keep records of your correspondence to better serve you in the future.`
  },
  {
    icon: <Database size={20} />,
    title: '2. How We Use Your Information',
    content: `Mangang Official Store uses the information we collect for the following purposes:

Order Processing & Fulfillment: To process your orders, arrange delivery, send order confirmations and shipping updates, and manage returns and refunds.

Account Management: To create and maintain your user account, authenticate your identity, and provide you with access to your order history and personalized features.

Customer Support: To respond to your inquiries, resolve disputes, and provide technical assistance.

Service Improvement: To analyze usage patterns, conduct research, test new features, and improve the overall functionality and user experience of our platform.

Marketing Communications: With your consent, to send promotional emails, newsletters, and special offers that may interest you. You can opt out of marketing communications at any time via the unsubscribe link in any email.

Legal Compliance: To comply with applicable laws, legal proceedings, regulatory requirements, and lawful requests from governmental authorities.

Fraud Prevention: To detect, investigate, and prevent fraudulent transactions and other illegal activities, and to protect the rights and property of Mangang Official Store and our customers.`
  },
  {
    icon: <Share2 size={20} />,
    title: '3. Information Sharing & Disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties for their marketing purposes. We may share your information in the following limited circumstances:

Service Providers: We share information with trusted third-party service providers who perform services on our behalf, such as payment processing, order fulfillment, email delivery, analytics, and customer support. These providers are contractually obligated to use your information only for the purposes we specify.

Business Transfers: In the event of a merger, acquisition, restructuring, or sale of assets, your personal information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website if any such transfer occurs.

Legal Requirements: We may disclose your information if required by law, court order, or other legal process, or if we believe disclosure is necessary to protect the rights, property, or safety of Mangang Official Store, our customers, or others.

With Your Consent: We may share your information for other purposes with your explicit consent.

We do not share your personal financial information (such as full credit card numbers) with any third party beyond what is necessary to process your payment through our secure payment gateway.`
  },
  {
    icon: <Lock size={20} />,
    title: '4. Data Security',
    content: `Protecting your personal information is a top priority for Mangang Official Store. We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, and destruction.

Our security measures include:
• SSL/TLS encryption for all data transmitted between your browser and our servers.
• Encrypted storage of sensitive personal data, including passwords (stored as one-way hashed values).
• Payment card data processed exclusively through PCI-DSS compliant payment processors. We do not store full card numbers on our servers.
• Regular security audits and vulnerability assessments.
• Access controls ensuring only authorized personnel have access to personal data.

While we implement these comprehensive safeguards, please note that no method of transmission over the Internet or electronic storage is 100% secure. We strive to protect your information but cannot guarantee absolute security. In the event of a data breach, we will notify affected users within 72 hours in accordance with applicable regulations.`
  },
  {
    icon: <Bell size={20} />,
    title: '5. Cookies & Tracking Technologies',
    content: `Mangang Official Store uses cookies and similar tracking technologies to enhance your experience on our platform.

Types of Cookies We Use:
• Essential Cookies: Necessary for the operation of our website. These include cookies that allow you to log in, add items to your cart, and complete purchases.
• Analytics Cookies: Help us understand how visitors interact with our website by collecting and reporting anonymous information (e.g., pages visited, time spent on site).
• Preference Cookies: Allow our website to remember information about your choices and provide enhanced, personalized features (e.g., language preferences, saved filters).

You can control and manage cookies through your browser settings. Disabling certain cookies may affect the functionality of our website. By continuing to use our Service after being informed of our cookie practices, you consent to our use of cookies as described in this policy.`
  },
  {
    icon: <UserCheck size={20} />,
    title: '6. Your Privacy Rights',
    content: `You have the following rights regarding your personal information:

Right of Access: You can request a copy of the personal information we hold about you at any time.

Right to Rectification: You may request that we correct any inaccurate or incomplete information we hold about you.

Right to Erasure: You may request that we delete your personal information from our systems, subject to certain legal obligations that require us to retain certain data.

Right to Withdraw Consent: Where we rely on your consent to process your data (e.g., for marketing communications), you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal.

Right to Data Portability: You have the right to receive your personal data in a structured, commonly used, and machine-readable format.

Right to Object: You may object to the processing of your personal data for certain purposes, such as direct marketing.

To exercise any of these rights, please contact us at mangangofficialstore.cs@gmail.com. We will respond to your request within 30 days.`
  },
  {
    icon: <Globe size={20} />,
    title: '7. Third-Party Links',
    content: `Our Service may contain links to third-party websites, applications, or services that are not owned or controlled by Mangang Official Store. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.

We strongly advise you to review the Privacy Policy of every site you visit. We are not responsible for the privacy practices or content of third-party websites.

Our website may also include social media features (such as Facebook, Instagram, or Twitter share buttons). These features may collect your IP address and which page you are visiting on our website, and may set a cookie to enable the feature to function properly. These features are governed by the privacy policies of the company providing them.`
  },
  {
    icon: <Database size={20} />,
    title: '8. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.

Specifically:
• Account information is retained for the duration of your account's existence and for 3 years after account deletion for legal and fraud prevention purposes.
• Order and transaction records are retained for 7 years to comply with accounting and tax regulations.
• Customer service communications are retained for 2 years after resolution.
• Marketing preferences are retained until you opt out or delete your account.

When your information is no longer required, we securely delete or anonymize it in accordance with our data retention schedule.`
  },
  {
    icon: <Shield size={20} />,
    title: "9. Children's Privacy",
    content: `Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and become aware that your child has provided us with personal information, please contact us immediately.

If we discover that we have inadvertently collected personal information from a child under 18 without parental consent, we will take immediate steps to delete that information from our servers.`
  },
  {
    icon: <Phone size={20} />,
    title: '10. Contact & Data Protection',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or the processing of your personal data, please contact our Data Protection team:

• Email: mangangofficialstore.cs@gmail.com
• Subject Line: "Privacy Policy Inquiry" or "Data Request"
• Response Time: Within 5 business days
• Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST
• Address: Mangang Official Store, Manipur, India

We are committed to protecting your privacy and will work diligently to address any concerns you may have.`
  }
];

export default function PrivacyPolicy() {
  const { navigateTo } = useContext(ShopContext);

  return (
    <div style={styles.page} className="animate-fade-in">
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigateTo('home')} style={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to Home
        </button>
        <div style={styles.headerBadge}>
          <Lock size={14} />
          Privacy & Security
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroIcon}>
          <Lock size={36} color="var(--color-secondary)" />
        </div>
        <h1 style={styles.heroTitle}>Privacy Policy</h1>
        <p style={styles.heroSubtitle}>
          Your privacy matters to us. Learn how Mangang Official Store collects, uses, and protects your personal information.
        </p>
        <div style={styles.metaRow}>
          <span style={styles.metaChip}>📅 Effective: July 2025</span>
          <span style={styles.metaChip}>🔒 SSL Secured</span>
          <span style={styles.metaChip}>📍 Manipur, India</span>
        </div>
      </div>

      {/* Commitment Banner */}
      <div style={styles.commitmentBanner}>
        <div style={styles.commitmentItem}>
          <Lock size={18} color="var(--color-secondary)" />
          <span>End-to-End Encryption</span>
        </div>
        <div style={styles.commitmentItem}>
          <Shield size={18} color="var(--color-success)" />
          <span>No Data Selling</span>
        </div>
        <div style={styles.commitmentItem}>
          <UserCheck size={18} color="var(--color-primary)" />
          <span>Your Rights Protected</span>
        </div>
        <div style={styles.commitmentItem}>
          <Eye size={18} color="var(--color-warning)" />
          <span>Full Transparency</span>
        </div>
      </div>

      {/* Intro Card */}
      <div style={styles.introCard}>
        <p style={styles.introText}>
          At <strong style={{ color: 'var(--color-secondary)' }}>Mangang Official Store</strong>, we are committed to protecting your privacy and maintaining the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our website and services. By using Mangang Official Store, you consent to the data practices described in this policy.
        </p>
      </div>

      {/* Sections */}
      <div style={styles.sectionsGrid}>
        {SECTIONS.map((section, i) => (
          <div key={i} style={styles.sectionCard} className="glass-panel">
            <div style={styles.sectionHeader}>
              <div style={styles.sectionIconWrap}>
                {section.icon}
              </div>
              <h2 style={styles.sectionTitle}>{section.title}</h2>
            </div>
            <div style={styles.sectionDivider} />
            <p style={styles.sectionContent}>{section.content}</p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div style={styles.footerNote}>
        <p style={styles.footerNoteText}>
          This Privacy Policy was last updated on <strong>July 2025</strong>. For privacy-related inquiries, contact us at{' '}
          <span style={{ color: 'var(--color-secondary)' }}>mangangofficialstore.cs@gmail.com</span>.
        </p>
        <div style={styles.policyLinks}>
          <button onClick={() => navigateTo('terms')} style={styles.policyLink}>Terms & Conditions</button>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <button onClick={() => navigateTo('refund-policy')} style={{ ...styles.policyLink, color: 'var(--color-secondary)' }}>Refund Policy</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '30px 0 60px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(56, 189, 248, 0.1)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    color: 'var(--color-secondary)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '20px'
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(16,185,129,0.06) 100%)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  heroIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    margin: 0
  },
  heroSubtitle: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    maxWidth: '520px',
    lineHeight: '1.6',
    margin: 0
  },
  metaRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '4px'
  },
  metaChip: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-muted)',
    fontSize: '12px',
    fontWeight: '600',
    padding: '5px 12px',
    borderRadius: '20px'
  },
  commitmentBanner: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    borderRadius: '14px'
  },
  commitmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    fontWeight: '600',
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: '20px'
  },
  introCard: {
    background: 'rgba(56,189,248,0.06)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '14px',
    padding: '24px 28px'
  },
  introText: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
    margin: 0
  },
  sectionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionCard: {
    padding: '28px',
    borderRadius: '16px',
    background: 'var(--bg-dark-card)',
    border: '1px solid var(--border-glass)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px'
  },
  sectionIconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-secondary)',
    flexShrink: 0
  },
  sectionTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    margin: 0
  },
  sectionDivider: {
    height: '1px',
    background: 'var(--border-glass)',
    marginBottom: '18px'
  },
  sectionContent: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.85',
    margin: 0,
    whiteSpace: 'pre-line'
  },
  footerNote: {
    textAlign: 'center',
    padding: '28px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center'
  },
  footerNoteText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: '1.7'
  },
  policyLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  policyLink: {
    background: 'none',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontFamily: 'var(--font-body)'
  }
};
