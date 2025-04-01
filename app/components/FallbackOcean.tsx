import React from 'react';

const FallbackOcean: React.FC = () => {
  return (
    <div className="ocean-container">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="sparkle"></div>
      </div>
    </div>
  );
};

export default FallbackOcean;