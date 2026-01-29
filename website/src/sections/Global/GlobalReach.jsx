import React from 'react';

const GlobalReach = () => {
  const regions = [
    {
      name: 'Middle East',
      countries: 'UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain',
      highlight: 'Primary Market',
    },
    {
      name: 'Europe',
      countries: 'UK, Germany, France, Netherlands, Belgium, Sweden',
      highlight: 'Growing Market',
    },
    {
      name: 'Asia Pacific',
      countries: 'Japan, Korea, Singapore, Malaysia, Indonesia',
      highlight: 'Emerging Market',
    },
    {
      name: 'Americas',
      countries: 'USA, Canada, Mexico',
      highlight: 'Expanding Reach',
    },
  ];

  return (
    <section className="global-section">
      <div className="global-container">
        {/* Map Visual */}
        <div className="global-map-wrapper">
          <img
            src="/images/backgrounds/section_global_export.png"
            alt="Emperor Spices global export destinations"
            className="global-map"
          />
        </div>

        {/* Content */}
        <div className="global-content">
          <span className="section-label">Export Markets</span>
          <h2 className="section-title">
            Trusted <span className="text-accent-gradient">Worldwide</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>
            Our cardamom reaches kitchens, factories, and markets across 40+ countries.
            From Arabic coffee ceremonies in the Gulf to gourmet bakeries in Europe.
          </p>

          <div className="region-grid">
            {regions.map((region, index) => (
              <div key={index} className="region-item">
                <div className="region-name">{region.name}</div>
                <div className="region-countries">{region.countries}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
