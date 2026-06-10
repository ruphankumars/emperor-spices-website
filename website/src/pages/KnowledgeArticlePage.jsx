import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogDatabase, BLOG_CATEGORIES } from '../data/blogData';
import Seo from '../components/Seo';
import { articleLd, recipeLd, breadcrumbLd } from '../seo/seoConfig';

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

const RelatedCard = ({ post }) => (
    <Link
        to={`/knowledge/${post.slug}`}
        style={{
            display: 'block', background: '#fff', borderRadius: '16px', overflow: 'hidden',
            textDecoration: 'none', color: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
    >
        <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            style={{ width: '100%', height: '140px', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/images/cardamom-content/cardamom_sample.png'; }}
        />
        <div style={{ padding: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35, margin: 0, color: '#1a1a1a' }}>
                {post.title}
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>{post.readTime}</span>
        </div>
    </Link>
);

const KnowledgeArticlePage = () => {
    const { slug } = useParams();
    const post = blogDatabase.find((b) => b.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <main style={{ padding: '160px 24px', textAlign: 'center', minHeight: '60vh' }}>
                <Seo
                    title="Article Not Found | Emperor Spices"
                    description="The article you are looking for does not exist."
                    path={`/knowledge/${slug}`}
                />
                <h1 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Article not found</h1>
                <Link to="/knowledge" className="btn btn-primary">
                    Browse the Knowledge Hub
                </Link>
            </main>
        );
    }

    const isRecipe = post.category === BLOG_CATEGORIES.RECIPES;
    const related = blogDatabase
        .filter((b) => b.slug !== post.slug && b.category === post.category)
        .slice(0, 3);

    return (
        <main style={{ background: '#faf9f6' }}>
            <Seo
                title={`${post.title} | Emperor Spices`}
                description={post.excerpt}
                path={`/knowledge/${post.slug}`}
                image={post.image}
                type="article"
                jsonLd={[
                    isRecipe ? recipeLd(post) : articleLd(post),
                    breadcrumbLd([
                        { name: 'Home', path: '/' },
                        { name: 'Knowledge Hub', path: '/knowledge' },
                        { name: post.title, path: `/knowledge/${post.slug}` },
                    ]),
                ]}
            />

            <article style={{ maxWidth: '760px', margin: '0 auto', padding: '120px 24px 40px' }}>
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: '#888', marginBottom: '24px' }}>
                    <Link to="/" style={{ color: '#2d6b4a', textDecoration: 'none' }}>Home</Link>
                    {' / '}
                    <Link to="/knowledge" style={{ color: '#2d6b4a', textDecoration: 'none' }}>Knowledge Hub</Link>
                    {' / '}
                    <span>{post.title}</span>
                </nav>

                <span style={{
                    display: 'inline-block', background: 'rgba(45,107,74,0.1)', color: '#2d6b4a',
                    padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem',
                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px',
                }}>
                    {isRecipe ? 'Recipe' : 'Article'}
                </span>

                <h1 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    fontWeight: 700, lineHeight: 1.2, color: '#1a1a1a', margin: '0 0 16px',
                }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', gap: '18px', color: '#888', fontSize: '0.85rem', marginBottom: '28px', flexWrap: 'wrap' }}>
                    <span>{post.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Calendar size={14} /> {formatDate(post.date)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={14} /> {post.readTime}
                    </span>
                </div>

                <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '20px', marginBottom: '32px' }}
                    onError={(e) => { e.target.src = '/images/cardamom-content/cardamom_sample.png'; }}
                />

                <div
                    className="article-content"
                    style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* B2B conversion CTA */}
                <div style={{
                    marginTop: '48px', padding: '32px', borderRadius: '20px', textAlign: 'center',
                    background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)', color: '#fff',
                }}>
                    <h2 style={{ fontSize: '1.3rem', margin: '0 0 8px' }}>Looking for premium green cardamom?</h2>
                    <p style={{ margin: '0 0 20px', opacity: 0.85, fontSize: '0.95rem' }}>
                        AGMARK certified AGEB, AGB &amp; AGS grades exported to 40+ countries. Samples available with COA.
                    </p>
                    <Link to="/contact" className="btn" style={{
                        background: '#fff', color: '#2d6b4a', padding: '12px 28px', borderRadius: '30px',
                        fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                    }}>
                        Request a Quote <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Related posts — internal linking */}
                {related.length > 0 && (
                    <section style={{ marginTop: '56px' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
                            {isRecipe ? 'More Cardamom Recipes' : 'Related Articles'}
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '18px' }}>
                            {related.map((r) => <RelatedCard key={r.id} post={r} />)}
                        </div>
                    </section>
                )}

                <div style={{ marginTop: '40px' }}>
                    <Link to="/knowledge" style={{
                        color: '#2d6b4a', fontWeight: 600, textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                    }}>
                        <ArrowLeft size={16} /> Back to Knowledge Hub
                    </Link>
                </div>
            </article>

            <style>{`
                .article-content h3 { font-size: 1.3rem; font-weight: 700; color: #1a4030; margin: 28px 0 12px; }
                .article-content p { margin: 0 0 16px; }
                .article-content ol, .article-content ul { padding-left: 24px; margin: 0 0 16px; }
                .article-content li { margin-bottom: 10px; }
            `}</style>
        </main>
    );
};

export default KnowledgeArticlePage;
