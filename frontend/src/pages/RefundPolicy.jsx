import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowLeft, RefreshCw, Package, Clock, AlertTriangle, CheckCircle, XCircle, Phone, Truck, CreditCard } from 'lucide-react';

const SECTIONS = [
  {
    icon: <RefreshCw size={20} />,
    title: '1. Our Refund Guarantee',
    content: `At Mangang Official Store, we stand behind the quality of every product we sell. We want you to be completely satisfied with your purchase. Our refund and return policy is designed to give you peace of mind when shopping with us.

We offer a 30-day return window from the date of delivery for most products. If you are not fully satisfied with your purchase for any reason, you may return eligible items within this period for a refund, exchange, or store credit, subject to the conditions outlined in this policy.

Our commitment: If a product arrives damaged, defective, or not as described, we will make it right — no questions asked. We believe in honest, transparent commerce and customer satisfaction above all else.`
  },
  {
    icon: <Package size={20} />,
    title: '2. Eligibility for Returns',
    content: `To be eligible for a return, the following conditions must be met:

✅ Eligible for Return:
• Item must be returned within 30 days of the delivery date.
• Item must be in its original condition — unused, undamaged, and unaltered.
• Item must be in its original packaging with all accessories, manuals, cables, and components included.
• Item must have the original receipt or proof of purchase.
• Items received in a damaged or defective condition are eligible for return regardless of usage.

❌ Not Eligible for Return:
• Items returned after 30 days from delivery.
• Items that have been used, physically damaged by the customer, or show signs of tampering.
• Items with removed or altered serial numbers.
• Digital software licenses, downloadable content, or gift cards (non-refundable once redeemed).
• Items purchased on "Final Sale" or "Clearance" (marked clearly at purchase).
• Personal care items or hygiene products that have been opened.

We reserve the right to inspect returned items and may decline returns that do not meet our eligibility criteria.`
  },
  {
    icon: <Clock size={20} />,
    title: '3. Return Process & Timeline',
    content: `To initiate a return, please follow these steps:

Step 1 — Contact Us:
Reach out to our customer support team at mangangofficialstore.cs@gmail.com or via your account's Order History section within 30 days of delivery. Include your order ID, item(s) to be returned, and reason for the return.

Step 2 — Return Approval:
Our team will review your request within 2–3 business days and issue a Return Merchandise Authorization (RMA) number along with return shipping instructions. Do not send items back without an approved RMA number.

Step 3 — Ship the Item:
Pack the item securely in its original packaging and ship it to the return address provided. We recommend using a trackable shipping service, as we are not responsible for items lost in transit during the return journey.

Step 4 — Inspection & Processing:
Once we receive your returned item, our quality team will inspect it within 3–5 business days. You will receive an email notification upon receipt and after inspection.

Step 5 — Refund Issued:
Upon successful inspection, your refund will be processed within 5–10 business days. Refunds are issued to the original payment method used at purchase.`
  },
  {
    icon: <CreditCard size={20} />,
    title: '4. Refund Methods & Timing',
    content: `Once your return is approved and processed, refunds will be issued as follows:

Credit/Debit Card Refunds:
Refunds to credit or debit cards typically appear within 5–10 business days depending on your card issuer. Some banks may take up to 15 business days to process the credit.

Store Credit:
You may opt to receive store credit instead of a card refund. Store credit is issued immediately upon return approval and is valid for 12 months from the date of issuance. Store credit can be applied to any future purchase on Mangang Official Store.

Exchange:
If you prefer an exchange for the same or different item, please specify this in your return request. Exchanges are subject to product availability. If the new item has a higher value, you will be charged the difference. If lower, the difference will be refunded.

Original Shipping Fees:
Original shipping fees are non-refundable unless the return is due to our error (e.g., wrong item shipped, defective item). In such cases, we will also provide a prepaid return shipping label.

Return Shipping Costs:
Customer-initiated returns for reasons other than defect or our error are the customer's responsibility for return shipping costs. We will not deduct this from your refund; you handle shipping independently.`
  },
  {
    icon: <AlertTriangle size={20} />,
    title: '5. Damaged & Defective Items',
    content: `If you receive an item that is damaged during shipping, defective, or not as described, we sincerely apologize and will resolve this promptly at no cost to you.

What to Do Immediately:
• Document the damage with clear photographs or a short video upon opening the package.
• Do not discard the original packaging, as it may be required for shipping damage claims.
• Contact us within 48 hours of delivery at mangangofficialstore.cs@gmail.com with your order ID and visual evidence.

Our Resolution Options for Defective/Damaged Items:
1. Free Replacement: We will ship a replacement unit at no additional charge, with priority processing.
2. Full Refund: A complete refund to your original payment method, including original shipping costs.
3. Store Credit: Full store credit value, including a 10% bonus credit as compensation for the inconvenience.

For manufacturing defects discovered after 30 days (but within the warranty period), please refer to the manufacturer's warranty documentation included with your product or contact our support team for guidance.`
  },
  {
    icon: <XCircle size={20} />,
    title: '6. Order Cancellations',
    content: `Order Cancellation Before Shipment:
You may cancel your order within 2 hours of placing it for a full refund with no fees. To cancel, contact us immediately at mangangofficialstore.cs@gmail.com with your order number and subject line "ORDER CANCELLATION."

After the 2-hour window but before shipment, cancellations may still be possible but are not guaranteed. We will make every effort to accommodate your request, but orders that have entered processing or packing may not be cancellable.

Cancellation After Shipment:
Once an order has shipped, it can no longer be cancelled. In this case, please wait for delivery and then initiate a standard return following our return process.

Partial Order Cancellation:
If your order contains multiple items, you may request cancellation of individual items. Contact us as soon as possible with the specific items you wish to cancel.

Cancelled Order Refunds:
Approved cancellations will be refunded to the original payment method within 3–7 business days.`
  },
  {
    icon: <Truck size={20} />,
    title: '7. Exchanges & Replacements',
    content: `We offer product exchanges under the following conditions:

Size/Variant Exchange:
If you received the wrong size, color, or variant, contact us within 30 days of delivery. We will ship the correct item once we receive your return. Exchanges for variants of equal value are processed at no additional cost.

Defective Unit Exchange:
For defective products, we offer priority exchange with expedited shipping to minimize inconvenience. We will ship the replacement as soon as your return tracking confirms the item has been handed to the courier.

Out-of-Stock Exchanges:
If the requested exchange item is out of stock, we will offer you the option of a full refund or store credit while you wait for restocking. We will notify you via email when the item is available again.

Exchange Shipping:
• For exchanges due to defect or our error: Free exchange shipping in both directions.
• For customer-preference exchanges (e.g., different color): Customer bears the return shipping cost; we ship the new item at no charge.`
  },
  {
    icon: <CheckCircle size={20} />,
    title: '8. Special Circumstances',
    content: `Holiday & Promotional Purchases:
Items purchased during special promotional events or holiday sales may have extended return periods. Any extended return window will be communicated at the time of purchase. Standard terms apply otherwise.

Bundle & Combo Purchases:
If you purchased a product as part of a bundle or combo deal, all items in the bundle must be returned together for a full refund. Returning partial items from a bundle will result in a partial refund calculated at the individual item pricing.

Gift Purchases:
If you received an item as a gift from a Mangang Official Store purchase, you may return it for store credit. The refund will be issued as store credit to your account. Original purchaser information remains confidential.

Pre-Order Items:
Pre-orders may be cancelled and fully refunded at any time before the item ships. Once shipped, standard return terms apply.

Force Majeure:
In the case of exceptional circumstances beyond our control (natural disasters, pandemics, government restrictions, supply chain disruptions), our timelines for returns and refunds may be extended. We will communicate any such delays transparently.`
  },
  {
    icon: <Phone size={20} />,
    title: '9. Contact & Support',
    content: `Our customer support team is here to help you with any return, exchange, or refund-related inquiries.

Customer Support:
• Email: mangangofficialstore.cs@gmail.com
• Subject Line: Include "RETURN" or "REFUND" for faster routing
• Response Time: Within 2 business days
• Business Hours: Monday – Saturday, 9:00 AM – 6:00 PM IST

When contacting us, please have the following information ready:
• Your Order ID (format: MG-XXXXXX-XXXX)
• The item(s) you wish to return or exchange
• The reason for the return
• Photos or videos if reporting damage or defects

We are committed to making every experience with Mangang Official Store a positive one. Thank you for trusting us with your purchase.`
  }
];

export default function RefundPolicy() {
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
          <RefreshCw size={14} />
          Returns & Refunds
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroIcon}>
          <RefreshCw size={36} color="var(--color-success)" />
        </div>
        <h1 style={styles.heroTitle}>Refund Policy</h1>
        <p style={styles.heroSubtitle}>
          We're committed to your satisfaction. Understand our hassle-free return and refund process clearly.
        </p>
        <div style={styles.metaRow}>
          <span style={styles.metaChip}>📅 Effective: July 2025</span>
          <span style={styles.metaChip}>⏱ 30-Day Returns</span>
          <span style={styles.metaChip}>💳 Fast Refunds</span>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div style={styles.summaryBanner}>
        <div style={styles.summaryItem}>
          <div style={{ ...styles.summaryIcon, background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.25)' }}>
            <Clock size={20} color="var(--color-success)" />
          </div>
          <div>
            <div style={styles.summaryValue}>30 Days</div>
            <div style={styles.summaryLabel}>Return Window</div>
          </div>
        </div>
        <div style={styles.summaryDivider} />
        <div style={styles.summaryItem}>
          <div style={{ ...styles.summaryIcon, background: 'rgba(99,102,241,0.12)', borderColor: 'rgba(99,102,241,0.25)' }}>
            <CreditCard size={20} color="var(--color-primary)" />
          </div>
          <div>
            <div style={styles.summaryValue}>5–10 Days</div>
            <div style={styles.summaryLabel}>Refund Processing</div>
          </div>
        </div>
        <div style={styles.summaryDivider} />
        <div style={styles.summaryItem}>
          <div style={{ ...styles.summaryIcon, background: 'rgba(56,189,248,0.12)', borderColor: 'rgba(56,189,248,0.25)' }}>
            <Truck size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <div style={styles.summaryValue}>Free</div>
            <div style={styles.summaryLabel}>Return on Our Error</div>
          </div>
        </div>
        <div style={styles.summaryDivider} />
        <div style={styles.summaryItem}>
          <div style={{ ...styles.summaryIcon, background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.25)' }}>
            <RefreshCw size={20} color="var(--color-warning)" />
          </div>
          <div>
            <div style={styles.summaryValue}>2 Hours</div>
            <div style={styles.summaryLabel}>Free Cancellation</div>
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <div style={styles.introCard}>
        <p style={styles.introText}>
          At <strong style={{ color: 'var(--color-success)' }}>Mangang Official Store</strong>, customer satisfaction is our highest priority. We have crafted this refund policy to be as fair, transparent, and straightforward as possible. If you ever have a concern about your order, our dedicated support team is ready to help you every step of the way.
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

      {/* CTA */}
      <div style={styles.ctaCard}>
        <div style={styles.ctaContent}>
          <Package size={28} color="var(--color-success)" />
          <div>
            <h3 style={styles.ctaTitle}>Need to start a return?</h3>
            <p style={styles.ctaDesc}>Our support team will guide you through every step of the process.</p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = 'mailto:mangangofficialstore.cs@gmail.com?subject=RETURN REQUEST'}
          style={styles.ctaBtn}
        >
          Contact Support
        </button>
      </div>

      {/* Footer Note */}
      <div style={styles.footerNote}>
        <p style={styles.footerNoteText}>
          This Refund Policy was last updated on <strong>July 2025</strong>. For any questions, reach us at{' '}
          <span style={{ color: 'var(--color-success)' }}>mangangofficialstore.cs@gmail.com</span>.
        </p>
        <div style={styles.policyLinks}>
          <button onClick={() => navigateTo('terms')} style={styles.policyLink}>Terms & Conditions</button>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <button onClick={() => navigateTo('privacy-policy')} style={{ ...styles.policyLink }}>Privacy Policy</button>
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
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    color: 'var(--color-success)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '20px'
  },
  hero: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(56,189,248,0.06) 100%)',
    border: '1px solid rgba(16,185,129,0.15)',
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
    background: 'rgba(16,185,129,0.12)',
    border: '1px solid rgba(16,185,129,0.25)',
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
  summaryBanner: {
    display: 'flex',
    gap: '0',
    background: 'var(--bg-dark-card)',
    border: '1px solid var(--border-glass)',
    borderRadius: '16px',
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  summaryItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '24px 20px',
    minWidth: '140px'
  },
  summaryIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  summaryValue: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    lineHeight: '1.2'
  },
  summaryLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '2px'
  },
  summaryDivider: {
    width: '1px',
    background: 'var(--border-glass)',
    alignSelf: 'stretch'
  },
  introCard: {
    background: 'rgba(16,185,129,0.06)',
    border: '1px solid rgba(16,185,129,0.15)',
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
    background: 'rgba(16,185,129,0.12)',
    border: '1px solid rgba(16,185,129,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-success)',
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
  ctaCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
    padding: '28px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.07) 100%)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '16px'
  },
  ctaContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  ctaTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    margin: '0 0 4px 0'
  },
  ctaDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    margin: 0
  },
  ctaBtn: {
    padding: '12px 24px',
    background: 'var(--color-success)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease'
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
