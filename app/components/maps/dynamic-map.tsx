'use client';

import dynamic from 'next/dynamic';

const SriLankaForecastMap = dynamic(
  () => import('./SriLankaMap'),
  {
    ssr: false,
  }
);

export default SriLankaForecastMap;