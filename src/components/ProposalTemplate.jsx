import React from 'react';
import { useProposal } from '../context/ProposalContext';
import { calculateFinancials, formatCurrency, formatNumber } from '../utils/calculations';
import { 
  Leaf, Sun, Zap, ShieldCheck, Factory, Battery, DollarSign, 
  Phone, Mail, MapPin, Award, Clock, CheckCircle2, Users, 
  TrendingUp, Droplets, TreePine, IndianRupee
} from 'lucide-react';
import './ProposalTemplate.css';

const ProposalTemplate = () => {
  const { customer, system, commercials, company } = useProposal();

  const financials = calculateFinancials(
    system.capacity,
    commercials.pricePerKw,
    customer.monthlyBill,
    commercials.includeSubsidy
  );

  const date = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const quoteId = `EKV-${Date.now().toString().slice(-6)}`;

  // Calculate number of panels needed
  const numPanels = Math.ceil((system.capacity * 1000) / system.panelWattage);

  return (
    <div className="proposal-document">

      {/* ============ PAGE 1: COVER PAGE ============ */}
      <div className="proposal-page cover-page">
        <div className="cover-hero-image">
          <img src="/solar-hero.png" alt="Solar Energy" />
          <div className="cover-hero-overlay"></div>
        </div>

        <div className="cover-content">
          <div className="cover-logo-area">
            <img src="/logo.svg" alt="Ekvarta Energy Solutions" className="cover-logo" />
          </div>

          <div className="cover-title-area">
            <div className="cover-badge">SOLAR POWER PROPOSAL</div>
            <h1 className="cover-main-title">
              Your Path to<br />
              <span className="text-gradient">Clean Energy</span>
            </h1>
            <p className="cover-subtitle">{company.tagline}</p>
          </div>

          <div className="cover-client-card glass-card">
            <div className="cover-client-header">
              <span className="cover-label">Prepared for</span>
              <span className="cover-date">{date}</span>
            </div>
            <h2 className="cover-client-name">{customer.name || 'Valued Customer'}</h2>
            <p className="cover-client-address">{customer.address || 'Address pending'}</p>
            {customer.phone && <p className="cover-client-phone"><Phone size={14} /> {customer.phone}</p>}
            <div className="cover-system-highlight">
              <div className="system-pill">
                <Zap size={18} />
                <span><strong>{system.capacity} kWp</strong> Solar System</span>
              </div>
              <div className="system-pill accent">
                <span>Quote ID: <strong>{quoteId}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="cover-footer-strip">
          <span><Phone size={14} /> {company.phone}</span>
          <span><Mail size={14} /> {company.email}</span>
          <span><MapPin size={14} /> Nagpur, Maharashtra</span>
        </div>
      </div>

      {/* ============ PAGE 2: ABOUT COMPANY ============ */}
      <div className="proposal-page about-page">
        <div className="page-header">
          <img src="/logo.svg" alt="Logo" className="page-logo" />
          <div className="page-header-line"></div>
        </div>

        <div className="about-hero-banner">
          <img src="/solar-team.png" alt="Our Team at Work" className="about-hero-img" />
          <div className="about-hero-text-overlay">
            <h2>Who We Are</h2>
          </div>
        </div>

        <div className="about-body">
          <p className="about-intro">
            <strong>Ekvarta Energy Solutions</strong> is a leading solar service provider in Central India, catering to 
            Domestic, Agricultural, Commercial, and Industrial sectors. Founded in Nagpur, Maharashtra in 2018, 
            we are an experienced solar engineering, procurement and installation company comprised of dedicated 
            and highly trained experts and professionals.
          </p>

          <div className="about-mission-box">
            <div className="mission-icon"><Leaf size={28} /></div>
            <div>
              <h3>Our Goal</h3>
              <p>To bring this clean, abundant and renewable source of energy to save our nature. We believe in 
              giving our best to those who think for a greener future.</p>
            </div>
          </div>

          <h3 className="section-title"><Award size={20} /> Why Choose Us</h3>
          <div className="about-features-grid">
            <div className="feature-card">
              <CheckCircle2 size={24} className="feature-icon" />
              <h4>Govt. Empanelled</h4>
              <p>Registered MSME & Govt. Subsidy Empanelled Vendor</p>
            </div>
            <div className="feature-card">
              <Users size={24} className="feature-icon" />
              <h4>Expert Team</h4>
              <p>Highly trained professionals with 7+ years in solar EPC</p>
            </div>
            <div className="feature-card">
              <ShieldCheck size={24} className="feature-icon" />
              <h4>Quality Assured</h4>
              <p>Only ALMM-approved, DCR-compliant Tier-1 components</p>
            </div>
            <div className="feature-card">
              <TrendingUp size={24} className="feature-icon" />
              <h4>Easy Finance</h4>
              <p>Easy EMI options & complete subsidy processing support</p>
            </div>
          </div>

          <h3 className="section-title"><Factory size={20} /> We Deal In</h3>
          <div className="brands-strip">
            <span className="brand-tag">Waaree</span>
            <span className="brand-tag">Polycab</span>
            <span className="brand-tag">Kirloskar Green</span>
            <span className="brand-tag">ABB</span>
            <span className="brand-tag">Adani Solar</span>
            <span className="brand-tag">K.Solare</span>
            <span className="brand-tag">RenewSys</span>
          </div>
        </div>

        <div className="page-footer">
          <span>{company.name}</span>
          <span>Page 2 of 5</span>
        </div>
      </div>

      {/* ============ PAGE 3: TECHNICAL SPECIFICATIONS ============ */}
      <div className="proposal-page tech-page">
        <div className="page-header">
          <img src="/logo.svg" alt="Logo" className="page-logo" />
          <div className="page-header-line"></div>
        </div>

        <h2 className="page-title"><Sun size={24} /> System Design & Specifications</h2>
        <p className="page-subtitle">Customized solar power system designed for your energy requirements</p>

        <div className="tech-hero-image-container">
          <img src="/solar-rooftop.png" alt="Solar Rooftop Installation" className="tech-hero-image" />
        </div>

        <div className="tech-capacity-banner">
          <div className="capacity-circle">
            <span className="cap-value">{system.capacity}</span>
            <span className="cap-unit">kWp</span>
          </div>
          <div className="capacity-details">
            <h3>Proposed System Capacity</h3>
            <p>Grid-Connected Rooftop Solar Power Plant</p>
            <p className="capacity-meta">{numPanels} Panels × {system.panelWattage}W = {(numPanels * system.panelWattage / 1000).toFixed(2)} kWp</p>
          </div>
        </div>

        <div className="tech-specs-grid">
          <div className="tech-spec-card">
            <div className="spec-card-icon"><Factory size={28} /></div>
            <div className="spec-card-label">Solar Panels</div>
            <div className="spec-card-value">{system.panelBrand}</div>
            <div className="spec-card-detail">{system.panelWattage}W Mono PERC / Bifacial</div>
            <div className="spec-card-detail">{numPanels} Modules</div>
          </div>
          <div className="tech-spec-card">
            <div className="spec-card-icon"><Battery size={28} /></div>
            <div className="spec-card-label">Solar Inverter</div>
            <div className="spec-card-value">{system.inverterBrand}</div>
            <div className="spec-card-detail">{system.capacity} kW On-Grid</div>
            <div className="spec-card-detail">MPPT Technology</div>
          </div>
          <div className="tech-spec-card">
            <div className="spec-card-icon"><ShieldCheck size={28} /></div>
            <div className="spec-card-label">Mounting Structure</div>
            <div className="spec-card-value">{system.structureType}</div>
            <div className="spec-card-detail">Hot-Dip Galvanized</div>
            <div className="spec-card-detail">Corrosion Resistant</div>
          </div>
        </div>

        <div className="tech-how-it-works">
          <h3 className="section-title"><Zap size={20} /> How It Works</h3>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-step-num">1</div>
              <h4>Solar Panels</h4>
              <p>Sunlight hits the panels and generates DC electricity throughout the day.</p>
            </div>
            <div className="how-step-arrow">→</div>
            <div className="how-step">
              <div className="how-step-num">2</div>
              <h4>Solar Inverter</h4>
              <p>Converts DC to AC electricity to power your home appliances.</p>
            </div>
            <div className="how-step-arrow">→</div>
            <div className="how-step">
              <div className="how-step-num">3</div>
              <h4>Net Meter</h4>
              <p>Excess power is exported to the grid, earning you credits on your bill.</p>
            </div>
          </div>
        </div>

        <div className="page-footer">
          <span>{company.name}</span>
          <span>Page 3 of 5</span>
        </div>
      </div>

      {/* ============ PAGE 4: FINANCIAL ANALYSIS ============ */}
      <div className="proposal-page finance-page">
        <div className="page-header">
          <img src="/logo.svg" alt="Logo" className="page-logo" />
          <div className="page-header-line"></div>
        </div>

        <h2 className="page-title"><DollarSign size={24} /> Investment & Returns</h2>
        <p className="page-subtitle">Detailed financial analysis of your solar investment</p>

        {/* Cost Breakdown */}
        <div className="finance-table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Factory size={16} /> System Base Cost ({system.capacity} kW × {formatCurrency(commercials.pricePerKw)}/kW)</td>
                <td className="amount">{formatCurrency(financials.grossCost - financials.gstAmount)}</td>
              </tr>
              <tr>
                <td>GST @ 13.8%</td>
                <td className="amount">{formatCurrency(financials.gstAmount)}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total Project Cost (Inclusive of GST)</strong></td>
                <td className="amount"><strong>{formatCurrency(financials.grossCost)}</strong></td>
              </tr>
              {commercials.includeSubsidy && (
                <tr className="subsidy-row">
                  <td><IndianRupee size={16} /> PM Surya Ghar Muft Bijli Yojana – Central Subsidy</td>
                  <td className="amount subsidy-amount">- {formatCurrency(financials.subsidyAmount)}</td>
                </tr>
              )}
              <tr className="net-row">
                <td><strong>Your Net Investment</strong></td>
                <td className="amount net-amount"><strong>{formatCurrency(financials.netCost)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Savings Image + ROI Cards */}
        <div className="finance-roi-section">
          <div className="finance-savings-image">
            <img src="/solar-savings.png" alt="Solar Savings" />
          </div>
          <div className="finance-roi-cards">
            <div className="roi-card green">
              <div className="roi-card-label">Monthly Savings</div>
              <div className="roi-card-value">{formatCurrency(financials.monthlySavings)}</div>
            </div>
            <div className="roi-card orange">
              <div className="roi-card-label">Annual Savings</div>
              <div className="roi-card-value">{formatCurrency(financials.annualSavings)}</div>
            </div>
            <div className="roi-card dark">
              <div className="roi-card-label">Payback Period</div>
              <div className="roi-card-value">{formatNumber(financials.paybackYears, 1)} <small>Years</small></div>
            </div>
            <div className="roi-card accent">
              <div className="roi-card-label">25-Year Lifetime Savings</div>
              <div className="roi-card-value big">{formatCurrency(financials.total25YearSavings)}</div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="env-impact-section">
          <h3 className="section-title"><Leaf size={20} /> Environmental Impact (Over 25 Years)</h3>
          <div className="env-impact-row">
            <div className="env-item">
              <Droplets size={32} className="env-icon" />
              <div className="env-value">{formatNumber(financials.co2OffsetTons)}</div>
              <div className="env-label">Tons CO₂ Offset</div>
            </div>
            <div className="env-item">
              <TreePine size={32} className="env-icon" />
              <div className="env-value">{formatNumber(financials.treesEquivalent, 0)}</div>
              <div className="env-label">Trees Equivalent</div>
            </div>
            <div className="env-item">
              <Sun size={32} className="env-icon" />
              <div className="env-value">{formatNumber(financials.annualGeneration * 25, 0)}</div>
              <div className="env-label">kWh Clean Energy</div>
            </div>
          </div>
        </div>

        <div className="page-footer">
          <span>{company.name}</span>
          <span>Page 4 of 5</span>
        </div>
      </div>

      {/* ============ PAGE 5: TERMS & CONTACT ============ */}
      <div className="proposal-page terms-page">
        <div className="page-header">
          <img src="/logo.svg" alt="Logo" className="page-logo" />
          <div className="page-header-line"></div>
        </div>

        <h2 className="page-title"><ShieldCheck size={24} /> Warranty & Terms</h2>

        <div className="warranty-grid">
          <div className="warranty-card">
            <div className="warranty-years">25</div>
            <div className="warranty-label">Years</div>
            <p>Solar Panel Performance Warranty</p>
          </div>
          <div className="warranty-card">
            <div className="warranty-years">10</div>
            <div className="warranty-label">Years</div>
            <p>Inverter Manufacturer Warranty</p>
          </div>
          <div className="warranty-card">
            <div className="warranty-years">5</div>
            <div className="warranty-label">Years</div>
            <p>Complete System Workmanship Warranty</p>
          </div>
        </div>

        <div className="terms-list">
          <h3 className="section-title"><Clock size={20} /> Terms & Conditions</h3>
          <ul>
            <li>This quotation is valid for <strong>15 days</strong> from the date of issue.</li>
            <li>Prices are subject to change based on market conditions and GST revisions.</li>
            <li>Subsidy amount is estimated; final approval is subject to MNRE/DISCOM guidelines.</li>
            <li>Installation timeline: <strong>7-15 working days</strong> from date of order confirmation.</li>
            <li>Payment terms: 50% advance, 40% on material delivery, 10% on commissioning.</li>
            <li>Net metering application and approval process will be handled by Ekvarta Energy Solutions.</li>
            <li>Annual maintenance contract (AMC) is available at nominal charges after warranty period.</li>
            <li>All components are ALMM-approved and BIS-certified as per MNRE requirements.</li>
          </ul>
        </div>

        {/* Contact / Sign-off */}
        <div className="contact-signoff">
          <div className="signoff-left">
            <h3>Ready to Go Solar?</h3>
            <p>Contact us today to start your clean energy journey!</p>
            <div className="contact-details">
              <p><Phone size={16} /> <strong>{company.phone}</strong></p>
              <p><Mail size={16} /> {company.email}</p>
              <p><MapPin size={16} /> {company.address}</p>
            </div>
          </div>
          <div className="signoff-right">
            <div className="signature-box">
              <p className="sig-label">Authorized Signature</p>
              <div className="sig-line"></div>
              <p className="sig-name">{company.name}</p>
            </div>
            <div className="signature-box">
              <p className="sig-label">Customer Acceptance</p>
              <div className="sig-line"></div>
              <p className="sig-name">{customer.name || '_______________'}</p>
            </div>
          </div>
        </div>

        <div className="final-footer">
          <img src="/logo.svg" alt="Logo" className="final-logo" />
          <p><strong>{company.name}</strong></p>
          <p className="final-tagline">{company.tagline}</p>
          <p className="final-address">{company.address}</p>
          <div className="final-badges">
            <span className="badge-item">🇮🇳 Make in India</span>
            <span className="badge-item">📋 MSME Registered</span>
            <span className="badge-item">✅ Govt. Empanelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalTemplate;
