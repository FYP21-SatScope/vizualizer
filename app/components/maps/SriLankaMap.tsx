'use client';

import {
  GeoJSON,
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export default function SriLankaForecastMap({
  geoData,
  districtMetrics,
  onDistrictClick,
}: {
  geoData: any;
  districtMetrics: Record<string, number>;
  onDistrictClick?: (district: string) => void;
}) {
  // console.log("districtMetrics:", districtMetrics);
  // console.log("geoData:", geoData);
  const getColor = (value: number) => {
    if (value > 300) return '#7f0000';
    if (value > 200) return '#b30000';
    if (value > 100) return '#e34a33';
    if (value > 50) return '#fc8d59';

    return '#fee8c8';
  };

  const style = (feature: any) => {
    const district =
      feature.properties.shapeName.split(' ')[0];

    const value =
      districtMetrics[district] || 0;

    // console.log(`District: ${district}, Value: ${value}`);

    return {
      fillColor: getColor(value),
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (
    feature: any,
    layer: any
  ) => {
    const district =
      feature.properties.shapeName.split(' ')[0];

    const value =
      districtMetrics[district] || 0;

    layer.bindPopup(`
      <div>
        <h3>${district}</h3>
        <p>Predicted Cases: ${value}</p>
      </div>
    `);

    layer.on({
      mouseover: (e: any) => {
        e.target.setStyle({ fillColor: '#2563eb', fillOpacity: 1 });
      },
      mouseout: (e: any) => {
        e.target.setStyle(style(feature));
      },
      click: () => { 
        onDistrictClick?.(district);
      },
    });
  };

  return (
    <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-lg border">
      <MapContainer
        center={[7.8731, 80.7718] as [number, number]}
        zoom={7}
        scrollWheelZoom
        className="w-full h-full"
      >
        {/* <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <GeoJSON
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}