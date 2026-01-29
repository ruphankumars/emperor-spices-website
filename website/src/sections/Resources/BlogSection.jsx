import React, { useState, useEffect } from 'react';
import { FadeInUp, StaggerChildren } from '../../components/ScrollAnimations';
import { blogDatabase, getFeaturedBlogs, getRelatedBlogs, BLOG_CATEGORIES } from '../../data/blogData';
import { useAuth } from '../../contexts/AuthContext';

// ===== ICONS =====
const Icons = {
    Calendar: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Clock: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
        </svg>
    ),
    Arrow: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
        </svg>
    ),
    Close: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Grid: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    Share: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    ),
    Heart: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
    HeartFilled: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#e74c3c" stroke="#e74c3c" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
    ThumbsDown: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
    ),
    Send: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" />
        </svg>
    ),
    Facebook: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
    Twitter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
    LinkedIn: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
    WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
    Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
    Snapchat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.009 2.12c-3.15 0-5.837 2.1-5.962 5.513-.027.675-.407 1-1.071 1.05-.2.012-.416.037-.624.112-.676.226-.78.7-.301 1.25.353.4.385.476.136.964-.323.637-.624.588-1.123 1.037-.614.562-1.206 1.838.301 3 .697.538 1.467.576 1.954 1.15.541.625.541 1.588.084 1.888-1.342.875-1.883 2.175-.707 2.875.52.313 1.248.163 1.768.125.79-.05 1.248-.487 2.454.062 1.06.488 2.214.475 3.338-.05 1.133-.525 1.632-.125 2.443-.062 1.134.087 1.238.225 1.769-.1.52-.313 1.258-1.85 1.019-2.588-.634-.925 0-1.575.603-2.075.686-.55 1.164-.625 1.996-1.188 1.518-1.025 1.03-2.4-.291-3.125-.499-.275-.728-.325-1.05-1.038-.281-.612.021-.6.385-1.012.592-.663.26-.988-.509-1.313-.208-.087-.416-.112-.624-.125-.665-.05-1.05-.362-1.071-1.062-.125-3.388-2.779-5.463-5.912-5.463z" /></svg>,
    TikTok: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>,
    Copy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    Comment: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
};

// ===== LOCAL STORAGE HELPERS =====
const getStoredComments = (blogId) => {
    try { return JSON.parse(localStorage.getItem(`blog_comments_${blogId}`)) || []; }
    catch { return []; }
};
const saveComment = (blogId, comment) => {
    const comments = getStoredComments(blogId);
    comments.unshift({ id: Date.now(), ...comment, timestamp: new Date().toISOString(), likes: 0 });
    localStorage.setItem(`blog_comments_${blogId}`, JSON.stringify(comments));
    return comments;
};
const getLikedBlogs = () => {
    try { return JSON.parse(localStorage.getItem('liked_blogs')) || []; }
    catch { return []; }
};
const toggleBlogLike = (blogId) => {
    const liked = getLikedBlogs();
    const idx = liked.indexOf(blogId);
    idx > -1 ? liked.splice(idx, 1) : liked.push(blogId);
    localStorage.setItem('liked_blogs', JSON.stringify(liked));
    return liked;
};

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

// ===== BLOG CARD =====
const BlogCard = ({ blog, onClick, index = 0, compact = false }) => {
    const [hovered, setHovered] = useState(false);
    const [liked, setLiked] = useState(getLikedBlogs().includes(blog.id));

    const handleLike = (e) => { e.stopPropagation(); toggleBlogLike(blog.id); setLiked(!liked); };

    return (
        <div
            onClick={() => onClick(blog)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative', background: '#fff', borderRadius: compact ? '16px' : '20px',
                overflow: 'hidden', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hovered ? '0 20px 40px rgba(45, 107, 74, 0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
                animation: `fadeSlideUp 0.5s ease ${index * 0.1}s both`
            }}
        >
            <div style={{ position: 'relative', height: compact ? '140px' : '200px', overflow: 'hidden' }}>
                <img src={blog.image} alt={blog.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.1)' : 'scale(1)'
                }} onError={(e) => { e.target.src = '/images/cardamom-content/cardamom_sample.png'; }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)'
                }} />
                <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)',
                    color: '#fff', padding: '6px 12px', borderRadius: '20px',
                    fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase'
                }}>
                    {blog.category === BLOG_CATEGORIES.RECIPES ? '🍳 Recipe' : '📖 Article'}
                </span>
                <button onClick={handleLike} style={{
                    position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px',
                    borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s', transform: liked ? 'scale(1.1)' : 'scale(1)'
                }}>
                    {liked ? <Icons.HeartFilled /> : <Icons.Heart />}
                </button>
                <h3 style={{
                    position: 'absolute', bottom: '12px', left: '12px', right: '12px',
                    color: '#fff', fontSize: compact ? '0.95rem' : '1.1rem', fontWeight: '700',
                    lineHeight: '1.3', textShadow: '0 2px 8px rgba(0,0,0,0.5)', margin: 0
                }}>
                    {blog.title}
                </h3>
            </div>
            <div style={{ padding: compact ? '12px' : '16px' }}>
                <div style={{ display: 'flex', gap: '12px', color: '#888', fontSize: '0.8rem', marginBottom: compact ? '0' : '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Calendar />{formatDate(blog.date)}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Clock />{blog.readTime}</span>
                </div>
                {!compact && (
                    <p style={{
                        color: '#666', fontSize: '0.9rem', lineHeight: '1.6', margin: 0,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                        {blog.excerpt}
                    </p>
                )}
            </div>
        </div>
    );
};

// ===== SOCIAL SHARE =====
const SocialShare = ({ blog }) => {
    const [copied, setCopied] = useState(false);
    const url = `${window.location.origin}/blog/${blog.slug}`;
    const text = `Check out: ${blog.title}`;
    const links = [
        { name: 'Facebook', icon: <Icons.Facebook />, color: '#1877f2', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
        { name: 'Twitter', icon: <Icons.Twitter />, color: '#000', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: <Icons.LinkedIn />, color: '#0a66c2', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(blog.title)}` },
        { name: 'WhatsApp', icon: <Icons.WhatsApp />, color: '#25d366', href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
        { name: 'Instagram', icon: <Icons.Instagram />, color: '#E1306C', href: `https://www.instagram.com/` },
        { name: 'Snapchat', icon: <Icons.Snapchat />, color: '#FFFC00', textColor: '#000', href: `https://start.snapchat.com/` },
        { name: 'TikTok', icon: <Icons.TikTok />, color: '#000000', href: `https://www.tiktok.com/` },
    ];
    const copyLink = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '20px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', margin: '24px 0' }}>
            <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><Icons.Share /> Share:</span>
            {links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" title={l.name}
                    style={{
                        width: '40px', height: '40px', borderRadius: '50%', background: l.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>{l.icon}</a>
            ))}
            <button onClick={copyLink} title={copied ? 'Copied!' : 'Copy Link'}
                style={{
                    width: '40px', height: '40px', borderRadius: '50%', background: copied ? '#22c55e' : '#e5e5e5',
                    color: copied ? '#fff' : '#666', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}>
                <Icons.Copy />
            </button>
        </div>
    );
};

// ===== COMMENTS =====
const CommentsSection = ({ blog }) => {
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ name: '', text: '' });
    const [submitting, setSubmitting] = useState(false);
    const { isAdmin } = useAuth();

    useEffect(() => { setComments(getStoredComments(blog.id)); }, [blog.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.text.trim()) return;
        setSubmitting(true);
        setTimeout(() => {
            setComments(saveComment(blog.id, form));
            setForm({ name: '', text: '' });
            setSubmitting(false);
        }, 300);
    };

    const timeAgo = (ts) => {
        const diff = Date.now() - new Date(ts);
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(diff / 3600000);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    };

    return (
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.Comment /> Comments ({comments.length})
            </h4>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input type="text" placeholder="Your Name *" value={form.name} required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '0.9rem' }} />
                <textarea placeholder="Share your thoughts... *" value={form.text} required rows={3}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '12px', fontSize: '0.9rem', resize: 'vertical', fontFamily: 'inherit' }} />
                <button type="submit" disabled={submitting}
                    style={{
                        background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)', color: '#fff', border: 'none',
                        padding: '12px 24px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px', opacity: submitting ? 0.7 : 1
                    }}>
                    <Icons.Send /> {submitting ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
            {comments.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>Be the first to share your thoughts!</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {comments.map(c => (
                        <div key={c.id} style={{ background: '#fff', padding: '16px', borderRadius: '12px', position: 'relative' }}>
                            {isAdmin && (
                                <button
                                    onClick={() => {
                                        if (window.confirm('Delete this comment?')) {
                                            const newComments = comments.filter(comment => comment.id !== c.id);
                                            setComments(newComments);
                                            localStorage.setItem(`blog_comments_${blog.id}`, JSON.stringify(newComments));
                                        }
                                    }}
                                    style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        background: 'none', border: 'none', color: '#dc2626',
                                        cursor: 'pointer', opacity: 0.7
                                    }}
                                    title="Delete (Admin)"
                                    onMouseOver={e => e.currentTarget.style.opacity = 1}
                                    onMouseOut={e => e.currentTarget.style.opacity = 0.7}
                                >
                                    <Icons.Trash />
                                </button>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2d6b4a, #1a4030)',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                                }}>
                                    {c.name.charAt(0).toUpperCase()}
                                </div>
                                <div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{c.name}</div><div style={{ fontSize: '0.75rem', color: '#888' }}>{timeAgo(c.timestamp)}</div></div>
                            </div>
                            <p style={{ margin: 0, color: '#444', lineHeight: '1.5', fontSize: '0.9rem' }}>{c.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ===== BLOG DETAIL MODAL (CENTERED POPUP) =====
const BlogDetailModal = ({ blog, onClose, onNavigate }) => {
    const [liked, setLiked] = useState(getLikedBlogs().includes(blog.id));
    const [disliked, setDisliked] = useState(false);
    const related = getRelatedBlogs(blog, 3);

    useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = 'auto'; }; }, []);

    const handleLike = () => { toggleBlogLike(blog.id); setLiked(!liked); setDisliked(false); };
    const handleDislike = () => { setDisliked(!disliked); if (liked) { toggleBlogLike(blog.id); setLiked(false); } };

    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div onClick={(e) => e.stopPropagation()} style={{
                background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '85vh',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'modalSlideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{
                    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${blog.image}) center/cover`,
                    minHeight: '200px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #d4a853 0%, #b8922f 100%)', color: '#000',
                            padding: '8px 16px', borderRadius: '25px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px'
                        }}>
                            {blog.category === BLOG_CATEGORIES.RECIPES ? '🍳 RECIPE' : '📖 ARTICLE'}
                        </span>
                        <button onClick={onClose} style={{
                            width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                            border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}><Icons.Close /></button>
                    </div>
                    <h2 style={{ color: '#fff', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: '700', lineHeight: '1.3', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {blog.title}
                    </h2>
                </div>

                {/* Scrollable Content */}
                <div data-lenis-prevent style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2d6b4a, #1a4030)',
                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                            }}>E</div>
                            <div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{blog.author}</div><div style={{ fontSize: '0.8rem', color: '#888' }}>{formatDate(blog.date)}</div></div>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.85rem' }}><Icons.Clock />{blog.readTime}</span>
                        {blog.tags.map((t, i) => (
                            <span key={i} style={{ background: 'rgba(45, 107, 74, 0.1)', color: '#2d6b4a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500' }}>{t}</span>
                        ))}
                    </div>

                    {/* Content */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content }}
                        style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}
                        className="blog-content" />

                    {/* Like/Dislike */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', padding: '16px 0', borderTop: '1px solid #eee' }}>
                        <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Was this helpful?</span>
                        <button onClick={handleLike} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '25px',
                            border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            background: liked ? 'linear-gradient(135deg, #2d6b4a, #1a4030)' : '#f0f0f0', color: liked ? '#fff' : '#333'
                        }}>
                            {liked ? <Icons.HeartFilled /> : <Icons.Heart />} Like
                        </button>
                        <button onClick={handleDislike} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '25px',
                            border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            background: disliked ? '#e74c3c' : '#f0f0f0', color: disliked ? '#fff' : '#333'
                        }}>
                            <Icons.ThumbsDown /> Dislike
                        </button>
                    </div>

                    {/* Social Share */}
                    <SocialShare blog={blog} />

                    {/* Comments */}
                    <CommentsSection blog={blog} />

                    {/* Related */}
                    {related.length > 0 && (
                        <div style={{ marginTop: '24px' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Related Articles</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                {related.map((r, i) => <BlogCard key={r.id} blog={r} onClick={onNavigate} index={i} compact />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .blog-content h3 { margin-top: 24px; margin-bottom: 12px; font-size: 1.2rem; font-weight: 700; color: #1a1a1a; }
                .blog-content ul, .blog-content ol { padding-left: 24px; margin: 16px 0; }
                .blog-content li { margin-bottom: 8px; }
                .blog-content p { margin-bottom: 16px; }
            `}</style>
        </div>
    );
};

// ===== ALL BLOGS MODAL (CENTERED POPUP) =====
const AllBlogsModal = ({ onClose, onSelectBlog }) => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = 'auto'; }; }, []);

    const filtered = blogDatabase.filter(b => {
        const matchFilter = filter === 'all' || b.category === filter;
        const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
            zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div onClick={(e) => e.stopPropagation()} style={{
                background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '1000px', maxHeight: '85vh',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'modalSlideUp 0.3s ease'
            }}>
                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>All Articles & Recipes</h2>
                            <p style={{ color: '#888', fontSize: '0.9rem', margin: '4px 0 0' }}>{filtered.length} items</p>
                        </div>
                        <button onClick={onClose} style={{
                            width: '44px', height: '44px', borderRadius: '50%', background: '#f0f0f0',
                            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}><Icons.Close /></button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                            <Icons.Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '25px', border: '1px solid #ddd', fontSize: '0.9rem' }} />
                        </div>
                        {['all', BLOG_CATEGORIES.ARTICLES, BLOG_CATEGORIES.RECIPES].map(c => (
                            <button key={c} onClick={() => setFilter(c)} style={{
                                padding: '10px 20px', borderRadius: '25px', border: 'none', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                                background: filter === c ? 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)' : '#f0f0f0',
                                color: filter === c ? '#fff' : '#333'
                            }}>
                                {c === 'all' ? 'All' : c === BLOG_CATEGORIES.ARTICLES ? 'Articles' : 'Recipes'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div data-lenis-prevent style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    <div className="all-articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                        {filtered.map((b, i) => <BlogCard key={b.id} blog={b} onClick={onSelectBlog} index={i} compact />)}
                    </div>
                    {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No articles found matching your search.</p>}
                </div>
            </div>
            <style>{`
                @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @media (max-width: 768px) {
                    .all-articles-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                        gap: 8px !important;
                    }
                    .all-articles-grid .blog-card {
                        min-width: unset !important;
                    }
                    .all-articles-grid .blog-card img {
                        height: 70px !important;
                    }
                    .all-articles-grid .blog-card h3 {
                        font-size: 0.65rem !important;
                        line-height: 1.2 !important;
                    }
                    .all-articles-grid .blog-card > div:last-child {
                        padding: 6px !important;
                    }
                }
            `}</style>
        </div>
    );
};

// ===== MAIN BLOG SECTION =====
const BlogSection = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const featured = getFeaturedBlogs().slice(0, 3);

    const handleSelect = (blog) => { setShowAll(false); setSelectedBlog(blog); };

    return (
        <>
            <section id="blogs" style={{ background: 'linear-gradient(180deg, #fff 0%, #f4f7f5 100%)', padding: '80px 0', position: 'relative' }}>
                <div className="container">
                    <FadeInUp>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: 'rgba(45, 107, 74, 0.1)', padding: '8px 16px', borderRadius: '25px', marginBottom: '16px'
                                }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d6b4a' }} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2d6b4a', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Knowledge Hub</span>
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.2', margin: 0 }}>
                                    Explore Our <span style={{ background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>Stories</span>
                                </h2>
                                <p style={{ color: '#666', fontSize: '1rem', marginTop: '8px' }}>Discover recipes, wellness tips, and the heritage of cardamom</p>
                            </div>
                            <button onClick={() => setShowAll(true)} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)', color: '#fff',
                                padding: '12px 24px', borderRadius: '30px', border: 'none', fontSize: '0.9rem',
                                fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(45, 107, 74, 0.3)',
                                transition: 'all 0.3s ease'
                            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <Icons.Grid /> View All
                            </button>
                        </div>
                    </FadeInUp>

                    <StaggerChildren stagger={0.12}>
                        <div className="stories-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                            {featured.map((b, i) => <BlogCard key={b.id} blog={b} onClick={setSelectedBlog} index={i} />)}
                        </div>
                    </StaggerChildren>
                </div>
                <style>{`
                    @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    
                    @media (max-width: 768px) {
                        #blogs {
                            padding: 2rem 0 !important;
                        }
                        #blogs h2 {
                            font-size: 1.3rem !important;
                        }
                        #blogs p {
                            font-size: 0.85rem !important;
                        }
                        .stories-cards-grid {
                            display: flex !important;
                            overflow-x: auto !important;
                            scroll-snap-type: x mandatory !important;
                            -webkit-overflow-scrolling: touch !important;
                            gap: 0.75rem !important;
                            padding-bottom: 0.5rem !important;
                        }
                        .stories-cards-grid > div {
                            min-width: calc(50% - 0.5rem) !important;
                            max-width: calc(50% - 0.5rem) !important;
                            flex-shrink: 0 !important;
                            scroll-snap-align: start !important;
                        }
                        .stories-cards-grid > div > div:first-child {
                            height: 130px !important;
                        }
                        .stories-cards-grid > div h3 {
                            font-size: 0.85rem !important;
                            line-height: 1.4 !important;
                            margin-bottom: 0.25rem !important;
                        }
                        .stories-cards-grid > div > div:last-child {
                            padding: 0.75rem !important;
                        }
                        .stories-cards-grid > div > div:last-child > div {
                            font-size: 0.7rem !important;
                            gap: 6px !important;
                            margin-bottom: 0.25rem !important;
                        }
                        .stories-cards-grid > div > div:last-child > p {
                            display: none !important;
                        }
                    }
                `}</style>
            </section>

            {showAll && <AllBlogsModal onClose={() => setShowAll(false)} onSelectBlog={handleSelect} />}
            {selectedBlog && <BlogDetailModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} onNavigate={setSelectedBlog} />}
        </>
    );
};

export default BlogSection;
