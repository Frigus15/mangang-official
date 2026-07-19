import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, ShoppingBag, Shield, Globe, Phone } from 'lucide-react';

const SECTIONS = [
  {
    icon: <CheckCircle size={20} />,
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Mangang Official Store website and services ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services. These Terms apply to all visitors, users, and others who access or use the Service.

Mangang Official Store reserves the right to update or change these Terms at any time without prior notice. Your continued use of the Service after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically for any updates.`
  },
  {
    icon: <ShoppingBag size={20} />,
    title: '2. Products and Orders',
    content: `All products listed on Mangang Official Store are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes only; actual product appearance may slightly vary.

When you place an order, you are making an offer to purchase a product at the listed price. We reserve the right to accept or decline any order for any reason, including but not limited to product availability, inaccuracies in product descriptions or pricing, or identification of fraud.

Once an order is placed, you will receive an order confirmation via email. This confirmation does not constitute acceptance of your order; it is merely an acknowledgment that we have received your order request. Acceptance occurs when the order is shipped and you receive a shipment confirmation.

All prices are displayed in the applicable currency and are subject to change without notice. We strive to ensure pricing accuracy; however, in the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.`
  },
  {
    icon: <Shield size={20} />,
    title: '3. User Accounts',
    content: `To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

You agree to provide accurate, current, and complete information during the registration process and to update this information to maintain its accuracy. You must immediately notify us of any unauthorized use of your account or any other breach of security.

Mangang Official Store will not be liable for any loss or damage arising from your failure to comply with these security obligations. We reserve the right to terminate accounts, remove or edit content, or cancel orders at our sole discretion.

You must be at least 18 years of age to create an account and make purchases on this platform.`
  },
  {
    icon: <Globe size={20} />,
    title: '4. Intellectual Property',
    content: `The Service and its original content, features, and functionality are owned by Mangang Official Store and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent from Mangang Official Store.

You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for personal, non-commercial purposes only. This license does not include the right to resell or make commercial use of this site or its contents.`
  },
  {
    icon: <AlertTriangle size={20} />,
    title: '5. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, Mangang Official Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; or (iv) unauthorized access, use, or alteration of your transmissions or content.

In no event shall Mangang Official Store's total liability to you for all claims exceed the amount you have paid to Mangang Official Store in the last twelve (12) months for the products or services giving rise to the claim.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above limitations may not apply to you.`
  },
  {
    icon: <FileText size={20} />,
    title: '6. Prohibited Activities',
    content: `You agree not to engage in any of the following activities:

• Using the Service for any unlawful purpose or in violation of any applicable laws or regulations.
• Attempting to gain unauthorized access to any portion of the Service, other accounts, computer systems, or networks connected to the Service.
• Interfering with or disrupting the integrity or performance of the Service or the data contained therein.
• Collecting or harvesting any personally identifiable information from the Service without authorization.
• Using automated scripts to collect information from or otherwise interact with the Service.
• Posting or transmitting any content that is abusive, threatening, obscene, defamatory, libelous, or racially, sexually, religiously, or otherwise objectionable.
• Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with a person or entity.
• Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.`
  },
  {
    icon: <Globe size={20} />,
    title: '7. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Manipur, India. If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect and enforceable.

These Terms constitute the entire agreement between you and Mangang Official Store regarding the use of the Service, superseding any prior agreements between you and Mangang Official Store relating to your use of the Service.`
  },
  {
    icon: <Phone size={20} />,
    title: '8. Contact Us',
    content: `If you have any questions about these Terms and Conditions, please contact us:

• Email: mangangofficialstore.cs@gmail.com
• Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST
• Address: Mangang Official Store, Manipur, India

We aim to respond to all inquiries within 2–3 business days. For urgent matters, please mark your email subject as "URGENT: Terms Query" for priority handling.`
  }
];

export default function TermsAndConditions() {
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
          <FileText size={14} />
          Legal Document
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroIcon}>
          <FileText size={36} color="var(--color-primary)" />
        </div>
        <h1 style={styles.heroTitle}>Terms and Conditions</h1>
        <p style={styles.heroSubtitle}>
          Please read these terms carefully before using the Mangang Official Store platform and services.
        </p>
        <div style={styles.metaRow}>
          <span style={styles.metaChip}>📅 Effective: July 2025</span>
          <span style={styles.metaChip}>🏢 Mangang Official Store</span>
          <span style={styles.metaChip}>📍 Manipur, India</span>
        </div>
      </div>

      {/* Intro Card */}
      <div style={styles.introCard}>
        <p style={styles.introText}>
          Welcome to <strong style={{ color: 'var(--color-primary)' }}>Mangang Official Store</strong> — your ultimate destination for premium electronic goods and accessories. These Terms and Conditions govern your use of our website, mobile applications, and all related services. By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
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
          These Terms and Conditions were last updated on <strong>July 2025</strong>. For any legal inquiries, please reach us at{' '}
          <span style={{ color: 'var(--color-primary)' }}>mangangofficialstore.cs@gmail.com</span>.
        </p>
        <div style={styles.policyLinks}>
          <button onClick={() => navigateTo('privacy-policy')} style={styles.policyLink}>Privacy Policy</button>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <button onClick={() => navigateTo('refund-policy')} style={styles.policyLink}>Refund Policy</button>
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
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    color: 'var(--color-primary)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '20px'
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 100%)',
    border: '1px solid rgba(99,102,241,0.15)',
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
    background: 'rgba(99,102,241,0.12)',
    border: '1px solid rgba(99,102,241,0.25)',
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
  introCard: {
    background: 'rgba(99,102,241,0.06)',
    border: '1px solid rgba(99,102,241,0.15)',
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
    background: 'rgba(99,102,241,0.12)',
    border: '1px solid rgba(99,102,241,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)',
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
