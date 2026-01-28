import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductShowcase = () => {
  const products = [
    {
      name: 'Alleppey Green Extra Bold',
      grade: 'AGEB',
      size: '8mm+',
      oilContent: '7-8%',
      bestFor: 'Premium Retail, Luxury Gifting',
      image: '/media/images/brand-reference/Emperor_brand_pouch_violet.jpg',
      isPremium: true,
    },
    {
      name: 'Alleppey Green Bold',
      grade: 'AGB',
      size: '7.5mm',
      oilContent: '6.5-7.5%',
      bestFor: 'Gulf Markets, European Export',
      image: '/media/images/brand-reference/Emperor_brand_pouch_red.jpg',
      isPremium: true,
    },
    {
      name: 'Alleppey Green Standard',
      grade: 'AGS',
      size: '7mm',
      oilContent: '6-7%',
      bestFor: 'Food Service, Hospitality',
      image: '/media/images/brand-reference/Emperor_brand_pouch_blue.jpg',
      isPremium: false,
    },
    {
      name: 'Cardamom Seeds',
      grade: 'SEEDS',
      size: 'N/A',
      oilContent: '8-10%',
      bestFor: 'Essential Oils, Pharmaceuticals',
      image: '/media/images/brand-reference/Emperor_brand_pouch_fanta.jpg',
      isPremium: false,
    },
  ];

  return (
    <section className="product-showcase">
      <div className="product-showcase-container">
        <div className="section-header">
          <span className="section-label">Our Products</span>
          <h2 className="section-title">
            Premium Cardamom <span className="text-accent-gradient">Grades</span>
          </h2>
          <p className="section-subtitle">
            AGMARK certified cardamom, graded by size and quality for diverse market needs
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                {product.isPremium && (
                  <span className="product-badge badge badge-gold">Premium</span>
                )}
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-specs">
                  <span className="product-spec">
                    <strong>{product.size}</strong>
                  </span>
                  <span className="product-spec">
                    Oil: <strong>{product.oilContent}</strong>
                  </span>
                </div>
                <p className="product-uses">Best for: {product.bestFor}</p>
                <Link to={`/products#${product.grade.toLowerCase()}`} className="btn btn-ghost btn-sm">
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
