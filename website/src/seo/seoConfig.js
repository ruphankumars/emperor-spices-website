// Central SEO configuration: site constants, per-route metadata, JSON-LD builders.
import { faqs } from '../data/faqData';

export const SITE = {
    url: 'https://emperorspices.com',
    name: 'Emperor Spices Pvt Ltd',
    legalName: 'Emperor Spices Private Limited',
    logo: 'https://emperorspices.com/favicon.png',
    defaultImage: 'https://emperorspices.com/images/cardamom-pods.png',
    phone: '+91-97900-05649',
    email: 'info@emperorspices.com',
    address: {
        street: 'S.F.NO:552/1F-30W, Gandhi Nagar, Karuppasamy Koil Street',
        locality: 'Bodinayakanur',
        region: 'Tamil Nadu',
        postalCode: '625513',
        country: 'IN',
    },
};

// GitHub Pages serves directory routes canonically with a trailing slash;
// normalize all internal URLs to that form (files with extensions excluded).
export const absoluteUrl = (path = '/') => {
    let p = path.startsWith('/') ? path : `/${path}`;
    if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
    return `${SITE.url}${p}`;
};

// ---- Per-route metadata (B2B export-buyer keyword targeting) ----
export const ROUTE_META = {
    '/': {
        title: 'Green Cardamom Exporter India | Bulk Supplier — Emperor Spices',
        description:
            'Emperor Spices is a premium green cardamom exporter from Bodinayakanur, India. AGMARK certified AGEB, AGB & AGS grades, bulk supply to 40+ countries. Request a sample or export quote.',
    },
    '/about': {
        title: 'About Emperor Spices | Cardamom Exporter, Bodinayakanur India',
        description:
            'Multi-generational cardamom expertise from Bodinayakanur, the cardamom city of India. FSSAI, ISO 22000:2018 and HACCP certified exporter trusted in 40+ countries.',
    },
    '/products': {
        title: 'Cardamom Grades AGEB, AGB, AGS | Export Specifications & Sizes',
        description:
            'Compare export-grade green cardamom: AGEB 8mm+, AGB 7-8mm, AGS 6-7mm, seeds and powder. Oil content, moisture and color specifications for bulk buyers and importers.',
    },
    '/export': {
        title: 'Bulk Cardamom Export & Wholesale Supply | 40+ Countries Served',
        description:
            'Wholesale green cardamom export from India to the Middle East, Europe, USA and Asia. 500kg+ bulk orders, LC/CAD payment terms, jute, PP and vacuum packaging options.',
    },
    '/knowledge': {
        title: 'Cardamom Knowledge Hub: Buying Guides, Recipes & Wellness',
        description:
            'Expert guides on cardamom grades, quality selection, recipes and health benefits — from the cardamom specialists at Emperor Spices, Bodinayakanur.',
    },
    '/contact': {
        title: 'Contact Emperor Spices | Request Cardamom Samples & Export Quote',
        description:
            'Get a cardamom export quote or request 100g-500g samples with Certificate of Analysis. Call +91 97900 05649 or send an enquiry — replies within 24 hours.',
    },
};

// ---- JSON-LD builders ----

export const organizationLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.defaultImage,
    description:
        'Premium Indian green cardamom exporter based in Bodinayakanur, Tamil Nadu. AGMARK certified grades AGEB, AGB and AGS exported to 40+ countries.',
    telephone: SITE.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Tamil', 'Hindi'],
    },
});

export const websiteLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
});

const GRADE_PRODUCTS = [
    { name: 'AGEB Green Cardamom (Extra Bold, 8mm+)', sku: 'AGEB', size: '8mm and above', desc: 'Premium extra bold green cardamom pods, 7-8% oil content, deep green color. Ideal for premium retail and luxury gifting markets.' },
    { name: 'AGB Green Cardamom (Bold, 7-8mm)', sku: 'AGB', size: '7-8mm', desc: 'Bold green cardamom pods, 6-7% oil content, bright green color. Preferred in Middle East and European markets.' },
    { name: 'AGS Green Cardamom (Small, 6-7mm)', sku: 'AGS', size: '6-7mm', desc: 'Small green cardamom pods, 5-6% oil content. Suited for food processing and hospitality.' },
    { name: 'Cardamom Seeds', sku: 'SEEDS', size: 'Decorticated', desc: 'Brown-black cardamom seeds with 8-10% oil content for essential oil extraction and pharmaceutical use.' },
    { name: 'Cardamom Powder', sku: 'POWDER', size: 'Ground', desc: 'Olive-colored ground cardamom, 6-7% oil content, for spice blends and bakery applications.' },
];

export const productsLd = () =>
    GRADE_PRODUCTS.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.sku,
        description: p.desc,
        image: SITE.defaultImage,
        brand: { '@type': 'Brand', name: 'Emperor Spices' },
        manufacturer: { '@id': `${SITE.url}/#organization` },
        countryOfOrigin: 'IN',
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD' },
            businessFunction: 'http://purl.org/goodrelations/v1#Sell',
            eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 500, unitCode: 'KGM' },
            seller: { '@id': `${SITE.url}/#organization` },
        },
    }));

export const faqLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
});

export const breadcrumbLd = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.path),
    })),
});

const stripHtml = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const articleLd = (post) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author || SITE.name },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/knowledge/${post.slug}`),
    articleBody: stripHtml(post.content).slice(0, 1500),
});

export const recipeLd = (post) => ({
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author || SITE.name },
    publisher: { '@id': `${SITE.url}/#organization` },
    recipeCuisine: 'Indian',
    keywords: (post.tags || []).join(', '),
    mainEntityOfPage: absoluteUrl(`/knowledge/${post.slug}`),
});
