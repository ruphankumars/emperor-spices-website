import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, Send } from 'lucide-react';
import { useContact } from '../contexts/ContactContext';
import { useLenisContext } from '../contexts/LenisContext';

const ContactModal = () => {
    const { isContactOpen, contactSubject, closeContact } = useContact();
    const { lenis } = useLenisContext();
    const [formData, setFormData] = useState({
        fullName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (isContactOpen) {
            lenis?.stop();
            document.documentElement.style.overflow = 'hidden';
            if (contactSubject) {
                setFormData(prev => ({ ...prev, subject: contactSubject }));
            }
        }
        return () => {
            lenis?.start();
            document.documentElement.style.overflow = '';
        };
    }, [isContactOpen, contactSubject, lenis]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            // API endpoint - update this when deploying
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Success
            setIsSubmitting(false);
            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({ fullName: '', lastName: '', phone: '', email: '', subject: '', message: '' });
                closeContact();
            }, 3000);

        } catch (error) {
            console.error('Contact form error:', error);
            setIsSubmitting(false);
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    if (!isContactOpen) return null;

    return (
        <div
            onClick={closeContact}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)', zIndex: 10000,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '900px',
                    maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    animation: 'modalSlideUp 0.3s ease', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }}
            >
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)',
                    padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Get in Touch</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                            We'd love to hear from you
                        </p>
                    </div>
                    <button onClick={closeContact} style={{
                        width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                        border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div data-lenis-prevent style={{ flex: 1, overflowY: 'auto', padding: '32px', WebkitOverflowScrolling: 'touch' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
                        {/* Contact Info */}
                        <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', color: '#2d6b4a' }}>
                                Contact Information
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%', background: '#2d6b4a',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}><Phone size={16} /></div>
                                    <span style={{ fontWeight: '500' }}>+91 97900 05649</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%', background: '#2d6b4a',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}><Mail size={16} /></div>
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>ruphankumars@emperorspices.com</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>ruphankumars@gmail.com</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%', background: '#2d6b4a',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}><MapPin size={16} /></div>
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        9b/1 Colony Street,<br />Bodinayakanur, TN, IN. 625513
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>First Name *</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>Last Name *</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>Phone *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>Subject *</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                                    placeholder="e.g., Request for Quote, Sample Request, General Inquiry"
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' }}>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={4}
                                    placeholder="Tell us about your requirements..."
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.95rem', resize: 'vertical', fontFamily: 'inherit' }} />
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div style={{
                                    background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
                                    padding: '12px 16px', color: '#dc2626', fontSize: '0.9rem'
                                }}>
                                    ⚠️ {errorMessage}
                                </div>
                            )}

                            <button type="submit" disabled={isSubmitting || submitted} style={{
                                background: submitted ? '#22c55e' : 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)',
                                color: '#fff', padding: '14px 28px', borderRadius: '12px', border: 'none',
                                fontSize: '1rem', fontWeight: '600', cursor: isSubmitting ? 'wait' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                opacity: isSubmitting ? 0.7 : 1, marginTop: '8px'
                            }}>
                                {submitted ? '✓ Message Sent!' : isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>
    );
};

export default ContactModal;
