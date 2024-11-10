import React, { useEffect, useRef } from 'react';
import { useMap } from './use-map';
import { offerCard, CityData } from '../../types';
import { URL_MARKER_DEFAULT } from '../../types/constant';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: offerCard[];
  currentCity: CityData;
}

export const Map: React.FC<MapProps> = ({
  offers,
  currentCity,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({mapRef, currentCity});

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.lat,
            lng: offer.lng,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
};