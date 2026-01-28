import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useContact } from '../contexts/ContactContext';
import { useLenisContext } from '../contexts/LenisContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { openContact } = useContact();
  const { scrollToElement } = useLenisContext();
  const { toggleCart, cartCount } = useCart();
  const { user, login, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated Navigation Items
  const navLinks = [
    { name: 'Price', sectionId: 'products' }, // Scrolls to products (pricing assumed there)
    { name: 'Product', sectionId: 'products' },
    { name: 'Recipes', sectionId: 'recipes' },
    { name: 'Blogs', sectionId: 'blogs' },
    { name: 'About', sectionId: 'legacy' },
    { name: 'Contact', action: () => openContact('General Inquiry') },
  ];

  const handleNavClick = (link) => {
    if (link.action) {
      link.action();
    } else {
      scrollToElement(link.sectionId, { offset: -80, duration: 1.5 });
    }
    setMobileMenuOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setShowLoginModal(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  return (
    <>
      <header
        className={`header ${scrolled ? 'header-scrolled' : ''}`}
        style={scrolled ? {
          borderRadius: '0 0 24px 24px',
          margin: '0 20px',
          width: 'calc(100% - 40px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(45, 107, 74, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        } : {}}
      >
        <Link to="/" className="header-logo" onClick={() => scrollToElement('hero')}>
          <span>🌿</span>
          <span>Emperor Spices</span>
        </Link>

        <nav className="header-nav">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(link)}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          {/* Contact Number */}
          <a href="tel:+919790005649" className="header-phone" style={{ marginRight: '8px' }}>
            <Phone size={16} />
            <span className="hidden-mobile">+91 97900 05649</span>
          </a>

          {/* Cart Icon */}
          <button onClick={toggleCart} className="header-icon-btn" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <ShoppingBag size={22} color={scrolled ? "var(--color-forest)" : "white"} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '0', right: '0',
                background: '#ef4444', color: 'white',
                fontSize: '0.6rem', fontWeight: '700',
                width: '16px', height: '16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Login / User Icon */}
          {isAdmin ? (
            <button onClick={logout} className="header-icon-btn" title="Logout Admin" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-forest)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>A</div>
              <LogOut size={18} color={scrolled ? "var(--color-stone-600)" : "white"} />
            </button>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="header-icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <User size={22} color={scrolled ? "var(--color-forest)" : "white"} />
            </button>
          )}

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(link)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    font: 'inherit', padding: '12px 0', width: '100%',
                    textAlign: 'left', color: 'inherit',
                  }}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Admin Login" size="small">
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="Enter admin password"
            />
            {loginError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{loginError}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </Modal>
    </>
  );
};

export default Header;
