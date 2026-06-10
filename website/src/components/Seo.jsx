import { useEffect } from 'react';
import { SITE, absoluteUrl } from '../seo/seoConfig';

// Head manager: keeps title, meta, canonical, OG/Twitter tags and JSON-LD in
// sync with the active route. Works with build-time prerendering (the
// prerenderer snapshots the DOM after these effects run).

const upsertMeta = (attr, key, content) => {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

const Seo = ({ title, description, path = '/', image, type = 'website', jsonLd = [] }) => {
    useEffect(() => {
        const canonical = absoluteUrl(path);
        const img = image ? absoluteUrl(image) : SITE.defaultImage;

        document.title = title;
        upsertMeta('name', 'description', description);
        upsertCanonical(canonical);

        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:site_name', SITE.name);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', canonical);
        upsertMeta('property', 'og:image', img);
        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);
        upsertMeta('name', 'twitter:image', img);

        // Replace route-scoped JSON-LD blocks
        document.head
            .querySelectorAll('script[data-seo-jsonld]')
            .forEach((s) => s.remove());
        const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
        blocks.filter(Boolean).forEach((data) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.seoJsonld = 'true';
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        });
    }, [title, description, path, image, type, jsonLd]);

    return null;
};

export default Seo;
