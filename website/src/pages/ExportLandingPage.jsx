import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { breadcrumbLd, absoluteUrl } from '../seo/seoConfig';
import { exportPages } from '../data/exportPagesData';

// Programmatic B2B SEO landing pages rendered at /export/:slug.
// Content lives in src/data/exportPagesData.js.

const styles = {
    article: {
        maxWidth: 860,
        margin: '0 auto',
        padding: '120px 24px 60px',
        color: '#333',
    },
    breadcrumb: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    breadcrumbLink: {
        color: '#2d6b4a',
        textDecoration: 'none',
    },
    h1: {
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        lineHeight: 1.2,
        color: '#1a1a1a',
        margin: '0 0 20px',
    },
    intro: {
        fontSize: '1.1rem',
        lineHeight: 1.7,
        color: '#333',
        marginBottom: 36,
    },
    sectionHeading: {
        fontSize: '1.5rem',
        color: '#1a1a1a',
        margin: '40px 0 14px',
    },
    faqHeading: {
        fontSize: '1.5rem',
        color: '#1a1a1a',
        margin: '48px 0 18px',
    },
    faqQuestion: {
        fontSize: '1.1rem',
        color: '#1a1a1a',
        margin: '24px 0 8px',
    },
    faqAnswer: {
        lineHeight: 1.7,
        margin: 0,
    },
    ctaBox: {
        background: 'linear-gradient(135deg, #2d6b4a 0%, #1a4030 100%)',
        color: '#fff',
        borderRadius: 20,
        padding: '36px 32px',
        margin: '48px 0',
    },
    ctaHeading: {
        margin: '0 0 12px',
        fontSize: '1.4rem',
        color: '#fff',
    },
    ctaText: {
        margin: '0 0 20px',
        lineHeight: 1.7,
        color: 'rgba(255, 255, 255, 0.92)',
    },
    related: {
        borderTop: '1px solid #e0e0e0',
        paddingTop: 28,
    },
    relatedHeading: {
        fontSize: '1.2rem',
        color: '#1a1a1a',
        margin: '0 0 12px',
    },
    relatedLink: {
        color: '#2d6b4a',
        textDecoration: 'none',
        fontWeight: 600,
    },
    notFound: {
        maxWidth: 860,
        margin: '0 auto',
        padding: '160px 24px 80px',
        textAlign: 'center',
        color: '#333',
    },
};

const contentCss = `
.export-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;
    font-size: 0.95rem;
}
.export-content th {
    background: #f4f7f5;
    text-align: left;
}
.export-content th,
.export-content td {
    padding: 10px;
    border: 1px solid #e0e0e0;
    vertical-align: top;
}
.export-content h2 {
    margin: 40px 0 14px;
}
.export-content h3 {
    margin: 24px 0 8px;
}
.export-content p {
    margin: 0 0 16px;
    line-height: 1.7;
}
.export-content ul {
    margin: 0 0 16px;
    padding-left: 22px;
    line-height: 1.7;
}
.export-content li {
    margin-bottom: 6px;
}
`;

const ExportLandingPage = () => {
    const { slug } = useParams();
    const page = exportPages.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!page) {
        return (
            <div style={styles.notFound}>
                <h1 style={styles.h1}>Page Not Found</h1>
                <p style={{ marginBottom: 24 }}>
                    The export resource you are looking for does not exist or may have moved.
                </p>
                <Link to="/export" className="btn btn-primary">
                    Back to Export Information
                </Link>
            </div>
        );
    }

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(`/export/${page.slug}`)}#faq`,
        mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <article className="export-content" style={styles.article}>
            <Seo
                title={page.metaTitle}
                description={page.metaDescription}
                path={`/export/${page.slug}`}
                jsonLd={[
                    faqJsonLd,
                    breadcrumbLd([
                        { name: 'Home', path: '/' },
                        { name: 'Export', path: '/export' },
                        { name: page.h1, path: `/export/${page.slug}` },
                    ]),
                ]}
            />
            <style>{contentCss}</style>

            <nav aria-label="Breadcrumb" style={styles.breadcrumb}>
                <Link to="/" style={styles.breadcrumbLink}>Home</Link>
                {' / '}
                <Link to="/export" style={styles.breadcrumbLink}>Export</Link>
                {' / '}
                <span>{page.h1}</span>
            </nav>

            <h1 style={styles.h1}>{page.h1}</h1>
            <p style={styles.intro}>{page.intro}</p>

            {page.sections.map((section) => (
                <section key={section.heading}>
                    <h2 style={styles.sectionHeading}>{section.heading}</h2>
                    {/* Content is static, trusted data from exportPagesData.js */}
                    <div dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
            ))}

            <section>
                <h2 style={styles.faqHeading}>Frequently Asked Questions</h2>
                {page.faqs.map((faq) => (
                    <div key={faq.question}>
                        <h3 style={styles.faqQuestion}>{faq.question}</h3>
                        <p style={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                ))}
            </section>

            <div style={styles.ctaBox}>
                <h2 style={styles.ctaHeading}>{page.cta.heading}</h2>
                <p style={styles.ctaText}>{page.cta.text}</p>
                <Link to="/contact" className="btn btn-primary">
                    Get an Export Quote
                </Link>
            </div>

            <aside style={styles.related}>
                <h2 style={styles.relatedHeading}>Related resources</h2>
                <ul style={{ paddingLeft: 22, lineHeight: 2 }}>
                    <li>
                        <Link to="/products" style={styles.relatedLink}>
                            Our Cardamom Products &amp; Grades
                        </Link>
                    </li>
                    <li>
                        <Link to="/knowledge/understanding-cardamom-grades" style={styles.relatedLink}>
                            Understanding Cardamom Grades
                        </Link>
                    </li>
                    <li>
                        <Link to="/export" style={styles.relatedLink}>
                            Export Process &amp; Markets
                        </Link>
                    </li>
                </ul>
            </aside>
        </article>
    );
};

export default ExportLandingPage;
