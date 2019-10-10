import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    const adsbygoogle = (window as any).adsbygoogle;
    if (adsbygoogle && process.env.NODE_ENV === 'production') {
      adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.REACT_APP_ADSENSE_AD_CLIENT}
      data-ad-slot={process.env.REACT_APP_ADSENSE_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
