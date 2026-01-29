import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check, Globe, Award, Leaf } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContact } from '../../contexts/ContactContext';
import { useLenisContext } from '../../contexts/LenisContext';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const { openContact } = useContact();
  const { scrollToElement } = useLenisContext();

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    // Create a GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Initial states - hide everything
      gsap.set('.hero-label', { opacity: 0, y: 30 });
      gsap.set('.hero-title-line', { opacity: 0, y: 60, rotateX: -15 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 40 });
      gsap.set('.hero-cta', { opacity: 0, y: 30, scale: 0.9 });
      gsap.set('.hero-side-icons', { opacity: 0, x: -30 });
      gsap.set('.hero-timeline', { opacity: 0, x: 30 });
      gsap.set('.hero-product-visual', { opacity: 0, scale: 0.8, y: 50 });
      gsap.set('.hero-stats', { opacity: 0, y: 40 });

      // Master timeline for entrance animations
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: 'power3.out' }
      });

      // Label entrance
      tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      });

      // Title lines staggered
      tl.to('.hero-title-line', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
      }, '-=0.4');

      // Subtitle
      tl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6');

      // CTAs staggered
      tl.to('.hero-cta', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4');

      // Hero stats
      tl.to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.3');

      // Side elements
      tl.to('.hero-side-icons', {
        opacity: 1,
        x: 0,
        duration: 0.6,
      }, '-=0.6');

      tl.to('.hero-timeline', {
        opacity: 1,
        x: 0,
        duration: 0.6,
      }, '-=0.6');

      // Parallax effect on scroll
      gsap.to(bg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Content fade out on scroll
      gsap.to(content, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, hero);

    return () => ctx.revert();
  }, []);

  // Scroll to products section using Lenis smooth scroll
  const handleExploreProducts = () => {
    scrollToElement('products', {
      offset: -80,
      duration: 2.0,
    });
  };

  // Open contact modal for sample request
  const handleRequestSample = () => {
    openContact('Sample Request');
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background Image with Parallax */}
      <div className="hero-bg" ref={bgRef}>
        <img
          src="/images/backgrounds/hero_bg_correct.jpg"
          alt="Cardamom Plantation"
          loading="eager"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Side Icons */}
      <div className="hero-side-icons">
        <div className="hero-side-icon" title="Quality Certified">
          <Check size={18} />
        </div>
        <div className="hero-side-icon" title="Global Exporter">
          <Globe size={18} />
        </div>
        <div className="hero-side-icon" title="Award Winning">
          <Award size={18} />
        </div>
        <div className="hero-side-icon" title="100% Natural">
          <Leaf size={18} />
        </div>
      </div>

      {/* Timeline Dots */}
      <div className="hero-timeline">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`hero-dot ${i === 0 ? 'active' : ''}`}></div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content" ref={contentRef}>
        <span className="hero-label">★ Premium Export Quality Since 1969</span>

        <h1 className="hero-title">
          <span className="hero-title-line">Premium</span>
          <span className="hero-title-line script gold">Green Cardamom</span>
          <span className="hero-title-line">from India</span>
        </h1>

        <p className="hero-subtitle">
          From the misty hills of Bodinayakanur to kitchens worldwide.
          We export the world's finest green cardamom with generations of expertise.
        </p>

        <div className="hero-ctas">
          <button onClick={handleExploreProducts} className="hero-cta hero-cta-primary">
            Explore Products <ArrowRight size={18} />
          </button>
          <button onClick={handleRequestSample} className="hero-cta btn btn-outline">
            Request Sample
          </button>
        </div>

        {/* Stats Strip - Updated per user request */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">60+</span>
            <span className="hero-stat-label">Years Legacy</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">500+</span>
            <span className="hero-stat-label">Partners</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">1000+</span>
            <span className="hero-stat-label">Tons/Year</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;
