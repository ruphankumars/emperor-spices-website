import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animations
      gsap.fromTo('.testimonials-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo('.testimonials-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.testimonials-subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Staggered testimonial cards with 3D flip effect
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 50, rotateY: -15, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
          },
        }
      );

      // Quote icon animation
      gsap.fromTo('.testimonial-quote',
        { opacity: 0, scale: 0, rotation: -45 },
        {
          opacity: 0.5,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: 'Ahmed Al-Rashid',
      company: 'Al-Rashid Trading Co.',
      location: 'Dubai, UAE',
      quote: 'Emperor Spices delivers the finest cardamom we\'ve sourced in 20 years of business. Their AGEB grade is unmatched for our premium Qahwa line.',
      rating: 5,
    },
    {
      name: 'Sarah Lindberg',
      company: 'Nordic Bakery Group',
      location: 'Stockholm, Sweden',
      quote: 'Consistent quality, reliable shipping, and exceptional customer service. They understand the European market\'s expectations perfectly.',
      rating: 5,
    },
    {
      name: 'Ramesh Kumar',
      company: 'Spice Master Foods',
      location: 'Mumbai, India',
      quote: 'We\'ve been partnering with Emperor Spices for over a decade. Their commitment to quality and fair pricing sets them apart.',
      rating: 5,
    },
  ];

  return (
    <section className="section section-dark section-center" id="testimonials" ref={sectionRef}>
      <div className="container">
        <span className="section-label section-label-light testimonials-label">Testimonials</span>
        <h2 className="section-title text-white testimonials-title">
          Trusted by <span className="script text-gold">Traders</span> Across the Globe
        </h2>
        <p className="section-subtitle testimonials-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Hear from our partners who trust Emperor Spices for their premium cardamom needs
        </p>

        {/* Testimonials Grid */}
        <div className="grid-3 testimonials-grid" style={{ perspective: '1000px' }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-dark testimonial-card" style={{ padding: '2rem', textAlign: 'left', borderRadius: '16px', transformStyle: 'preserve-3d' }}>
              <Quote size={32} className="testimonial-quote" style={{ color: 'var(--color-gold)', marginBottom: '1rem' }} />

              <p style={{
                color: 'rgba(255,255,255,0.9)',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                "{testimonial.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>

              <div>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>
                  {testimonial.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-gold)' }}>
                  {testimonial.company}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
