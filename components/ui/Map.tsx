"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Props = {
  lat: number;
  lng: number;
};

const Map = (props: Props) => {
  const { lat, lng } = props;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={15}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default Map;
