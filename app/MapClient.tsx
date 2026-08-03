"use client";

import dynamic from "next/dynamic";

const MapDynamic = dynamic(() => import("./MapDynamic"), {
  ssr: false,
  loading: () => (
    <p className="flex h-[300px] items-center justify-center bg-gray-500">
      Map loading
    </p>
  ),
});

type MapProps = {
  lat: number;
  lng: number;
};

export default function Map({ lat, lng }: MapProps) {
  return (
    <div className="h-[300px] max-w-full w-full">
      <MapDynamic lat={lat} lng={lng} />
    </div>
  );
}
