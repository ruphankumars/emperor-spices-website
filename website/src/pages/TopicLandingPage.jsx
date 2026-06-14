import React from 'react';

// Sections (curated subsets reused per variant; HeroSection is intentionally excluded
// because it owns the homepage <h1>).
import CertificationsStrip from '../sections/About/CertificationsStrip';
import LegacySection from '../sections/About/LegacySection';
import QualitySection from '../sections/About/QualitySection';
import GradesSection from '../sections/Products/GradesSection';
import ProductsSection from '../sections/Products/ProductsSection';
import PackagingSection from '../sections/Products/PackagingSection';
import GlobalReachSection from '../sections/Global/GlobalReachSection';
import IndustriesSection from '../sections/Global/IndustriesSection';
import NationwideSection from '../sections/Global/NationwideSection';
import BlogSection from '../sections/Resources/BlogSection';
import RecipesSection from '../sections/Resources/RecipesSection';
import HealthSection from '../sections/Resources/HealthSection';
import FAQSection from '../sections/Resources/FAQSection';
import GetInTouchSection from '../sections/Contact/GetInTouchSection';

// Intro styles, consistent with the site palette (dark headings, green accent, neutral body).
const introStyles = {
  section: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '120px 24px 40px',
  },
  h1: {
    fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
    lineHeight: 1.2,
    color: '#1a1a1a',
    margin: '0 0 24px',
    fontWeight: 700,
  },
  p: {
    fontSize: '1.05rem',
    lineHeight: 1.75,
    color: '#333',
    margin: '0 0 18px',
  },
  ul: {
    margin: '0 0 18px',
    padding: '0 0 0 22px',
    color: '#333',
    lineHeight: 1.7,
  },
  accent: {
    color: '#2d6b4a',
    fontWeight: 600,
  },
};

// Per-variant unique primary content (one <h1> + original, keyword-targeted copy)
// followed by a curated subset of existing sections.
const VARIANTS = {
  about: {
    intro: (
      <section style={introStyles.section}>
        <h1 style={introStyles.h1}>
          About Emperor Spices — Cardamom Exporter in Bodinayakanur
        </h1>
        <p style={introStyles.p}>
          Emperor Spices is a green cardamom exporter rooted in{' '}
          <span style={introStyles.accent}>Bodinayakanur, Tamil Nadu</span> — the town widely
          known as the cardamom city of India and the trading heart of the Cardamom Hills. Our
          family has worked with cardamom across multiple generations, moving from the auction
          floors and estates of the Western Ghats to a modern export operation that serves buyers
          in more than 40 countries.
        </p>
        <p style={introStyles.p}>
          That heritage shapes how we source. We buy close to the growing belt, grade by hand and
          by specification, and hold cardamom to the standards that demanding importers expect.
          Our operations are backed by recognised certifications, so partners can rely on
          documented, audit-ready quality at every step:
        </p>
        <ul style={introStyles.ul}>
          <li>FSSAI licensed food business operator</li>
          <li>ISO 22000:2018 food safety management</li>
          <li>HACCP-based process controls</li>
          <li>APEDA and Spices Board registered exporter</li>
          <li>IEC holder for direct international trade</li>
        </ul>
        <p style={introStyles.p}>
          Whether you are an importer building a private-label range or a distributor sourcing bulk
          AGEB, AGB and AGS grades, our goal is the same: consistent green cardamom, transparent
          grading, and dependable supply from origin. Learn more about our legacy, certifications
          and quality systems below.
        </p>
      </section>
    ),
    sections: ['CertificationsStrip', 'LegacySection', 'QualitySection'],
  },
  products: {
    intro: (
      <section style={introStyles.section}>
        <h1 style={introStyles.h1}>
          Green Cardamom Grades &amp; Specifications — AGEB, AGB, AGS
        </h1>
        <p style={introStyles.p}>
          Emperor Spices supplies export-grade green cardamom across the full quality spectrum, so
          buyers can match grade to application and budget. Each lot is graded by pod size, oil
          content and colour, and is available with supporting specification documentation for
          import and quality-control teams.
        </p>
        <ul style={introStyles.ul}>
          <li>
            <span style={introStyles.accent}>AGEB (Extra Bold)</span> — 8mm and above, 7–8% volatile
            oil; premium retail and gifting.
          </li>
          <li>
            <span style={introStyles.accent}>AGB (Bold)</span> — 7–8mm pods, 6–7% oil; the workhorse
            grade for most importers.
          </li>
          <li>
            <span style={introStyles.accent}>AGS (Small)</span> — 6–7mm pods, 5–6% oil; ideal for
            processing and blending.
          </li>
          <li>
            <span style={introStyles.accent}>Cardamom seeds and powder</span> — for extraction,
            bakery and spice-blend manufacturers.
          </li>
        </ul>
        <p style={introStyles.p}>
          Selecting the right grade is about more than pod size. Oil content drives aroma intensity
          and shelf appeal, while colour and moisture affect presentation and storage life. Our
          grading is consistent lot to lot, which lets buyers standardise their own recipes,
          packaging and pricing without surprises.
        </p>
        <p style={introStyles.p}>
          Below you will find detailed grade comparisons, the full product range and our packaging
          options — including bulk and private-label formats — to help you specify exactly what you
          need.
        </p>
      </section>
    ),
    sections: ['GradesSection', 'ProductsSection', 'PackagingSection'],
  },
  export: {
    intro: (
      <section style={introStyles.section}>
        <h1 style={introStyles.h1}>Bulk Green Cardamom Export &amp; Wholesale Supply</h1>
        <p style={introStyles.p}>
          Emperor Spices is a direct green cardamom exporter, wholesaler and bulk supplier working
          with importers, distributors and food manufacturers worldwide. By sourcing at origin in
          Bodinayakanur and shipping directly, we keep the chain short, the quality traceable and
          the pricing competitive for serious volume buyers.
        </p>
        <p style={introStyles.p}>
          We are set up for commercial-scale procurement. Our typical terms make it straightforward
          for buyers to plan, sample and commit:
        </p>
        <ul style={introStyles.ul}>
          <li>
            <span style={introStyles.accent}>MOQ</span> — 500kg for bulk orders, 250kg for
            private-label programs.
          </li>
          <li>
            <span style={introStyles.accent}>Samples</span> — 100–500g with a Certificate of
            Analysis before you order.
          </li>
          <li>
            <span style={introStyles.accent}>Payment</span> — LC and CAD terms supported for
            established trade.
          </li>
          <li>
            <span style={introStyles.accent}>Incoterms</span> — FOB or CIF quotes on request.
          </li>
        </ul>
        <p style={introStyles.p}>
          We ship regularly to the UAE, Saudi Arabia and the wider Gulf, as well as Europe, the USA
          and across Asia. As an importer or distributor, you get a single accountable partner from
          grading through documentation to dispatch. Explore our global reach, the industries we
          serve and our distribution coverage below.
        </p>
      </section>
    ),
    sections: ['GlobalReachSection', 'IndustriesSection', 'NationwideSection'],
  },
  knowledge: {
    intro: (
      <section style={introStyles.section}>
        <h1 style={introStyles.h1}>Cardamom Knowledge Hub — Guides, Grades &amp; Recipes</h1>
        <p style={introStyles.p}>
          The Emperor Spices Knowledge Hub gathers what we have learned across generations of
          sourcing and exporting green cardamom from Bodinayakanur. It is built for buyers, chefs
          and curious cooks who want to understand the spice beyond the price list — how it is
          graded, how to judge quality, and how to get the most from it.
        </p>
        <p style={introStyles.p}>
          Here you can read practical guides on the AGEB, AGB and AGS grades and what their oil
          content and pod size really mean, alongside tips for evaluating freshness, aroma and
          colour. Our recipes show how cardamom performs in real cooking — from classic Indian
          dishes to baking and beverages — while our wellness notes cover its traditional uses and
          nutritional profile.
        </p>
        <p style={introStyles.p}>
          Whether you are sourcing for a brand, stocking a kitchen or simply learning, the articles,
          recipes, health insights and frequently asked questions below are a free, factual resource
          from the cardamom specialists at Emperor Spices.
        </p>
      </section>
    ),
    sections: ['BlogSection', 'RecipesSection', 'HealthSection', 'FAQSection'],
  },
  contact: {
    intro: (
      <section style={introStyles.section}>
        <h1 style={introStyles.h1}>Contact Emperor Spices — Cardamom Export Enquiries</h1>
        <p style={introStyles.p}>
          Ready to source green cardamom from Bodinayakanur? Whether you need a price quote, a
          spec sheet or a sample on your bench before committing, the Emperor Spices export team is
          here to help importers, distributors and manufacturers worldwide.
        </p>
        <p style={introStyles.p}>
          Tell us the grade you are after — <span style={introStyles.accent}>AGEB, AGB, AGS</span>,
          seeds or powder — your target volume and destination, and we will respond with a quote and
          the right next step. We can send representative samples of 100–500g together with a
          Certificate of Analysis so your quality team can verify oil content, colour and moisture
          for themselves.
        </p>
        <p style={introStyles.p}>
          Call or message us on{' '}
          <span style={introStyles.accent}>+91 97900 05649</span>, or send your enquiry using the
          form below. We typically reply within 24 hours.
        </p>
      </section>
    ),
    sections: ['GetInTouchSection'],
  },
};

const SECTION_MAP = {
  CertificationsStrip,
  LegacySection,
  QualitySection,
  GradesSection,
  ProductsSection,
  PackagingSection,
  GlobalReachSection,
  IndustriesSection,
  NationwideSection,
  BlogSection,
  RecipesSection,
  HealthSection,
  FAQSection,
  GetInTouchSection,
};

// Unique primary-content landing page per route. RouteSeo in App.jsx already injects
// the per-path <Seo> meta, so no <Seo> is rendered here.
const TopicLandingPage = ({ variant }) => {
  const config = VARIANTS[variant];
  if (!config) return null;

  return (
    <main>
      {config.intro}
      {config.sections.map((name) => {
        const Section = SECTION_MAP[name];
        return <Section key={name} />;
      })}
    </main>
  );
};

export default TopicLandingPage;
