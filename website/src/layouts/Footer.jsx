import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Building2, Award, Globe, Users, Info, X } from 'lucide-react';
import { useContact } from '../contexts/ContactContext';
import Modal from '../components/Modal';

const Footer = () => {
  const { openContact } = useContact();
  const [activeModal, setActiveModal] = useState(null);

  const companyModals = {
    about: {
      title: 'About Emperor Spices',
      content: (
        <div style={{ lineHeight: '1.8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #2d6b4a, #1a4030)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem'
            }}>🌿</div>
            <div>
              <h4 style={{ color: 'var(--color-forest)', margin: 0 }}>Emperor Spices Pvt Ltd</h4>
              <p style={{ color: 'var(--color-stone-600)', margin: 0, fontSize: '0.9rem' }}>Since 1969</p>
            </div>
          </div>
          <p style={{ color: 'var(--color-stone-600)', marginBottom: '1rem' }}>
            Our journey began in 1969 when our founder arrived as a migrant to Bodinayakanur,
            starting as an accountant in a cardamom shop before becoming an individual cardamom trader.
            Over five decades, we've grown into one of India's leading cardamom exporters.
          </p>
          <h5 style={{ color: 'var(--color-forest)', marginBottom: '0.5rem' }}>Our Mission</h5>
          <p style={{ color: 'var(--color-stone-600)', marginBottom: '1rem' }}>
            To deliver the finest quality cardamom from the Western Ghats to kitchens around the world,
            while supporting sustainable farming practices and fair trade.
          </p>
          <h5 style={{ color: 'var(--color-forest)', marginBottom: '0.5rem' }}>Our Values</h5>
          <ul style={{ color: 'var(--color-stone-600)', paddingLeft: '1.5rem' }}>
            <li>Quality Excellence</li>
            <li>Sustainable Sourcing</li>
            <li>Customer Trust</li>
            <li>Innovation in Packaging</li>
          </ul>
        </div>
      )
    },
    certifications: {
      title: 'Our Certifications',
      content: (
        <div style={{ lineHeight: '1.8' }}>
          <p style={{ color: 'var(--color-stone-600)', marginBottom: '1.5rem' }}>
            Emperor Spices maintains the highest quality standards with internationally recognized certifications.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {[
              { icon: '✓', name: 'FSSAI Licensed', desc: 'Food Safety and Standards Authority of India' },
              { icon: '🏆', name: 'ISO 22000:2018', desc: 'Food Safety Management System' },
              { icon: '✓', name: 'HACCP Certified', desc: 'Hazard Analysis Critical Control Points' },
              { icon: '🌿', name: 'APEDA Registered', desc: 'Agricultural and Processed Food Products' },
              { icon: '🏷️', name: 'GI Tagged', desc: 'Geographical Indication - Idukki Cardamom' },
              { icon: '📋', name: 'Spices Board', desc: 'Registered Exporter with Spices Board of India' },
            ].map((cert, idx) => (
              <div key={idx} style={{
                background: 'var(--color-stone-50)',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid var(--color-stone-200)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{cert.icon}</span>
                <h5 style={{ color: 'var(--color-forest)', margin: '0.5rem 0 0.25rem' }}>{cert.name}</h5>
                <p style={{ color: 'var(--color-stone-600)', fontSize: '0.85rem', margin: 0 }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    exportMarkets: {
      title: 'Export Markets',
      content: (
        <div style={{ lineHeight: '1.8' }}>
          <p style={{ color: 'var(--color-stone-600)', marginBottom: '1.5rem' }}>
            Our cardamom reaches kitchens, factories, and markets across 40+ countries on 6 continents.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { region: 'Middle East', countries: 'UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain', icon: '🕌' },
              { region: 'Europe', countries: 'UK, Germany, France, Netherlands, Belgium', icon: '🏰' },
              { region: 'Americas', countries: 'USA, Canada, Mexico, Brazil', icon: '🗽' },
              { region: 'Asia Pacific', countries: 'Japan, Korea, Singapore, Malaysia, Australia', icon: '🏯' },
              { region: 'Africa', countries: 'South Africa, Egypt, Morocco', icon: '🌍' },
            ].map((market, idx) => (
              <div key={idx} style={{
                background: 'var(--color-stone-50)',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{market.icon}</span>
                <div>
                  <h5 style={{ color: 'var(--color-forest)', margin: 0 }}>{market.region}</h5>
                  <p style={{ color: 'var(--color-stone-600)', fontSize: '0.9rem', margin: 0 }}>{market.countries}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  };

  return (
    <footer className="footer">
      {/* Certifications Strip */}
      <div className="certs-strip" style={{ margin: '-4rem -5% 3rem', padding: '1rem 5%' }}>
        <div className="cert-badge">✓ FSSAI Licensed</div>
        <div className="cert-badge">🏆 ISO 22000:2018</div>
        <div className="cert-badge">✓ HACCP Certified</div>
        <div className="cert-badge">🌿 APEDA Registered</div>
        <div className="cert-badge">🏷️ GI Tagged</div>
      </div>

      <div className="footer-grid container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🌿</span>
            Emperor Spices Pvt Ltd
          </div>
          <p className="footer-desc">
            Premium cardamom exporters from Bodinayakanur, India.
            Bringing the essence of the Western Ghats to the world since 1969.
          </p>
          <a
            href="https://wa.me/919790005649"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
              <MapPin size={16} style={{ marginTop: '4px', flexShrink: 0 }} />
              <span>S.F.NO:552/1F-30W, Gandhi Nagar, Karuppasamy Koil Street, Bodinayakanur – 625513, Theni District, Tamil Nadu, India</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} />
              <a href="tel:+919790005649">+91 97900 05649</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} />
              <a href="mailto:ruphankumars@emperorspices.com">ruphankumars@emperorspices.com</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} />
              <a href="mailto:ruphankumars@gmail.com">ruphankumars@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Products Column */}
        <div className="footer-column">
          <h4>Products</h4>
          <ul className="footer-links">
            <li><a href="#products">Green Cardamom</a></li>
            <li><a href="#products">Cardamom Seeds</a></li>
            <li><a href="#products">Cardamom Powder</a></li>
            <li><a href="#products">Private Label</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><button onClick={() => setActiveModal('about')} style={{
              background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
              padding: 0, fontSize: 'inherit', textAlign: 'left', textDecoration: 'none'
            }}>About Us</button></li>
            <li><button onClick={() => setActiveModal('certifications')} style={{
              background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
              padding: 0, fontSize: 'inherit', textAlign: 'left', textDecoration: 'none'
            }}>Certifications</button></li>
            <li><button onClick={() => setActiveModal('exportMarkets')} style={{
              background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
              padding: 0, fontSize: 'inherit', textAlign: 'left', textDecoration: 'none'
            }}>Export Markets</button></li>
            <li><button onClick={() => openContact('General Inquiry')} style={{
              background: 'none', border: 'none', color: 'inherit', cursor: 'pointer',
              padding: 0, fontSize: 'inherit', textAlign: 'left', textDecoration: 'none'
            }}>Contact</button></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p className="footer-copyright">
          © 2026 Emperor Spices Pvt Ltd. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      {/* Company Modals */}
      {activeModal && companyModals[activeModal] && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={companyModals[activeModal].title}
          size="medium"
        >
          {companyModals[activeModal].content}
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
