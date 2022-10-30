import GoogleMapReact from "google-map-react";
import { useState } from "react";
type Props = {
  center: {
    lat: number;
    lng: number;
  };
  onBoundsChange: (bounds: any) => void;
  children: React.ReactNode;
  onClick: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
};

export default function Map(props: Props) {
  const { center, onBoundsChange, children, onClick, onZoomChange, zoom } =
    props;

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      }}
      defaultCenter={center}
      onZoomAnimationEnd={(_zoom) => onZoomChange(_zoom)}
      options={{ zoomControl: false, fullscreenControl: false }}
      zoom={zoom}
      yesIWantToUseGoogleMapApiInternals
      onClick={onClick}
      onChange={({ zoom, bounds }) => {
        onZoomChange(zoom);
        onBoundsChange([
          bounds.nw.lng,
          bounds.se.lat,
          bounds.se.lng,
          bounds.nw.lat,
        ]);
      }}
    >
      {children}
    </GoogleMapReact>
  );
}
