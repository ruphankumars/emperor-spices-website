import React, { useState } from 'react';

const GradingSystem = () => {
  const [activeGrade, setActiveGrade] = useState(null);

  const grades = [
    {
      name: 'Purple',
      size: '8mm+',
      oilContent: '7-8%',
      description: 'Ultra-premium selection. Deep vibrant green pods with highest aromatic oil content. Reserved for luxury gifting and gourmet applications.',
      className: 'purple',
    },
    {
      name: 'Pink',
      size: '7.5-8mm',
      oilContent: '7%',
      description: 'Hand-selected pods with bright, uniform green color and high oil content. Ideal for specialty stores and premium retail.',
      className: 'pink',
    },
    {
      name: 'Green',
      size: '7-8mm',
      oilContent: '6-7%',
      description: 'GI-tagged Alleppey Green Cardamom. Perfect balance of size, color, and aroma. Most popular export grade.',
      className: 'green',
    },
    {
      name: 'Orange',
      size: '7-7.5mm',
      oilContent: '6%',
      description: 'Quality cardamom for daily use with good aroma and excellent value. Popular in domestic markets.',
      className: 'orange',
    },
    {
      name: 'Red',
      size: '6-7mm',
      oilContent: '5-6%',
      description: 'Ideal for food processing with consistent quality at scale. Essential oil extraction and industrial use.',
      className: 'red',
    },
  ];

  return (
    <section className="grading-section">
      <div className="grading-container">
        <div className="section-header">
          <span className="section-label">Quality Grades</span>
          <h2 className="section-title">
            The United Colors of <span className="text-accent-gradient">Cardamom</span>
          </h2>
          <p className="section-subtitle">
            Emperor Spices pioneered the color-coded grading system that has become the industry standard
          </p>
        </div>

        <div className="grading-bar">
          {grades.map((grade, index) => (
            <div
              key={index}
              className={`grade-item ${grade.className} ${activeGrade === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveGrade(index)}
              onMouseLeave={() => setActiveGrade(null)}
            >
              <div className="grade-name">{grade.name}</div>
              <div className="grade-size">{grade.size}</div>
              {activeGrade === index && (
                <div className="grade-description">{grade.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GradingSystem;
