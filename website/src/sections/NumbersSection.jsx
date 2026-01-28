import React from 'react';

const NumbersSection = () => {
  const stats = [
    { value: '25+', label: 'Years of Excellence' },
    { value: '40+', label: 'Countries Served' },
    { value: '1000+', label: 'Tons Annually' },
    { value: '500+', label: 'Happy Partners' },
  ];

  return (
    <section className="numbers-section">
      <div className="numbers-container">
        {stats.map((stat, index) => (
          <div key={index} className="number-item">
            <div className="number-value">{stat.value}</div>
            <div className="number-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NumbersSection;
