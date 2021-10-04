import React from 'react';

const HeroBanner = ({ imageSrc, quote, name, title }) => {
  return (
    <div className='hero-banner'>
      <div className='hero-banner-bg'>
        <img src={imageSrc} alt={name} className='hero-banner-bg-img' />
      </div>
      <div className='hero-banner-content'>
        <div className='hero-banner-quote'>
          <span>
            <i className='fas fa-quote-left'></i>
          </span>
          {quote}
        </div>
        <div className='hero-banner-name'>
          {name} <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
