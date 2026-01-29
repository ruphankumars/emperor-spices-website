import React from 'react';

const TrustStrip = () => {
  const certifications = [
    { icon: '✓', label: 'FSSAI Licensed' },
    { icon: '🏆', label: 'ISO 22000:2018' },
    { icon: '🛡️', label: 'HACCP Certified' },
    { icon: '🌿', label: 'Spices Board India' },
    { icon: '📋', label: 'APEDA Registered' },
    { icon: '🏷️', label: 'GI-Tagged' },
    { icon: '⭐', label: 'Three Star Export House' },
  ];

  return (
    <section className="trust-strip">
      <div className="trust-strip-container">
        {certifications.map((cert, index) => (
          <React.Fragment key={index}>
            <div className="trust-strip-item">
              <span className="trust-strip-icon">{cert.icon}</span>
              <span>{cert.label}</span>
            </div>
            {index < certifications.length - 1 && (
              <div className="trust-strip-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
