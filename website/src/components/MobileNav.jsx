import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { QuoteModalContext } from '../App';

const MobileNav = ({ navTheme = 'light' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const location = useLocation();
    const quoteModal = useContext(QuoteModalContext);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Animate menu open/close
    useEffect(() => {
        if (!menuRef.current || !overlayRef.current) return;

        if (isOpen) {
            document.body.style.overflow = 'hidden';

            const tl = gsap.timeline();
            tl.set(menuRef.current, { display: 'flex' })
                .set(overlayRef.current, { display: 'block' })
                .to(overlayRef.current, { opacity: 1, duration: 0.3 })
                .to(menuRef.current, { x: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2')
                .fromTo(linksRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
                    '-=0.2'
                );
        } else {
            document.body.style.overflow = '';

            const tl = gsap.timeline({
                onComplete: () => {
                    if (menuRef.current) menuRef.current.style.display = 'none';
                    if (overlayRef.current) overlayRef.current.style.display = 'none';
                }
            });
            tl.to(linksRef.current, { opacity: 0, x: 30, duration: 0.2, stagger: 0.03 })
                .to(menuRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' }, '-=0.1')
                .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.2');
        }
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/products', label: 'Products' },
        { to: '/export', label: 'Export' },
        { to: '/knowledge', label: 'Knowledge Hub' },
        { to: '/contact', label: 'Contact' }
    ];

    return (
        <>
            {/* Hamburger Button */}
            <button
                className={`mobile-nav-toggle ${isOpen ? 'open' : ''} nav-theme-${navTheme}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="mobile-nav-overlay"
                onClick={() => setIsOpen(false)}
                style={{ display: 'none', opacity: 0 }}
            />

            {/* Mobile Menu */}
            <nav
                ref={menuRef}
                className="mobile-nav-menu"
                style={{ display: 'none', transform: 'translateX(100%)' }}
            >
                <div className="mobile-nav-header">
                    <span className="mobile-nav-logo">🌿 Emperor Spices</span>
                </div>

                <ul className="mobile-nav-links">
                    {navLinks.map((link, index) => (
                        <li key={link.to} ref={el => linksRef.current[index] = el}>
                            <Link
                                to={link.to}
                                className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mobile-nav-footer" ref={el => linksRef.current[navLinks.length] = el}>
                    <button 
                        onClick={() => {
                            setIsOpen(false);
                            quoteModal?.openQuoteModal();
                        }} 
                        className="mobile-nav-cta btn-magnetic"
                    >
                        <span>Get Quote</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className="mobile-nav-contact">
                        <a href="tel:+919790005649" className="mobile-nav-phone">
                            📞 +91 97900 05649
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MobileNav;
