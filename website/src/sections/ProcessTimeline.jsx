import React from 'react';

const ProcessTimeline = () => {
  const steps = [
    {
      number: 1,
      title: 'Harvest',
      description: 'Hand-picked from plantations in the Western Ghats at peak ripeness',
    },
    {
      number: 2,
      title: 'Sorting',
      description: 'Size and color grading by experienced workers for quality consistency',
    },
    {
      number: 3,
      title: 'Processing',
      description: 'Traditional kiln drying (Bhatti method) preserves natural oils and color',
    },
    {
      number: 4,
      title: 'Packaging',
      description: 'Aroma Lock technology in multi-layered packaging for freshness',
    },
    {
      number: 5,
      title: 'Export',
      description: 'Global shipping to 40+ countries with complete documentation',
    },
  ];

  return (
    <section className="process-section">
      <div className="process-container">
        <div className="section-header">
          <span className="section-label">Our Process</span>
          <h2 className="section-title">
            From Plantation to <span className="text-accent-gradient">Package</span>
          </h2>
          <p className="section-subtitle">
            Every step is carefully managed to ensure the highest quality cardamom reaches you
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-number">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
