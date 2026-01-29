import React from 'react';

const StorySection = () => {
  return (
    <section className="story-section">
      <div className="story-container">
        {/* Left Image */}
        <div className="story-image-wrapper">
          <img 
            src="/images/section-about-heritage.png" 
            alt="Emperor Spices heritage and cardamom plantations"
            className="story-image"
          />
          <div className="story-image-overlay" />
        </div>

        {/* Right Content */}
        <div className="story-content">
          <span className="section-label">Our Heritage</span>
          <h2 className="section-title">
            From the Cardamom Hills to Your World
          </h2>

          <p className="story-text">
            Welcome to the world of Emperor Spices Pvt Ltd. We are on a mission 
            here at the Cardamom Hills of South India, which is home to the 
            Queen of Spices – the most flavorful Cardamom in the world.
          </p>

          <p className="story-text">
            Our mission is to source only the finest organic Cardamom, 
            chemical-free, with all its natural flavor and goodness intact. 
            We send our cardamom across, from our home with love to yours, 
            in our exclusive 'Aroma Lock' packaging.
          </p>

          <p className="story-text">
            We are specialists in the processing, packing, and marketing of 
            the finest organic Indian Green Cardamom. Placing great emphasis 
            on partnerships in business, our customers include leading retail 
            and wholesale distribution companies across the Middle East as well 
            as major food product manufacturers throughout Europe.
          </p>

          <div className="story-stats">
            <div className="story-stat">
              <div className="story-stat-number">25+</div>
              <div className="story-stat-label">Years of Excellence</div>
            </div>
            <div className="story-stat">
              <div className="story-stat-number">40+</div>
              <div className="story-stat-label">Countries Served</div>
            </div>
            <div className="story-stat">
              <div className="story-stat-number">1000+</div>
              <div className="story-stat-label">Tons Annually</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
