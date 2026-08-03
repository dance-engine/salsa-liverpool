"use client";

type MapDisplayProps = {
  lat: number;
  lng: number;
};

function getOpenStreetMapEmbedUrl(lat: number, lng: number) {
  const latitudeOffset = 0.004;
  const longitudeOffset = 0.008;

  const bbox = [
    lng - longitudeOffset,
    lat - latitudeOffset,
    lng + longitudeOffset,
    lat + latitudeOffset,
  ].join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export default function MapDisplay({ lat, lng }: MapDisplayProps) {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-gray-300 bg-gray-200 p-[1px]">
      <iframe
        title="Class location map"
        src={getOpenStreetMapEmbedUrl(lat, lng)}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
