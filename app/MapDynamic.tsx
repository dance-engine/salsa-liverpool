'use client'
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapDisplay = ({ lat, lng }: {lat: number, lng: number}) => {
  const [position, setPosition] = useState({ lat, lng } as L.LatLngLiteral);

  const CenterMap = ({position}: {position: L.LatLngLiteral}) => {
    const map = useMap();
  
    useEffect(() => {
      map.setView(position, map.getZoom(), { animate: true });
    }, [position, map]);
  
    return null;
  };

  useEffect(()=>{
    setPosition({lat,lng})
  },[lat,lng])


  return (
    <div className="border p-[1px] rounded-md border-gray-300 bg-gray-200 w-full h-full">
      <MapContainer center={position} zoom={16} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMap position={position} />
        <Marker
          position={position}
          icon={customIcon}
          eventHandlers={{
          click: () => {
              window.location.href = `https://www.google.com/maps/dir//Arts+Bar,+22+Hope+St,+Liverpool+L1+9BY/@53.4028573,-2.9721175,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x487b216e6f3f3f3f:0x8e8e8e8e8e8e8e8e!2m2!1d-2.9699284!2d53.4028573`;
            },
          }}
        />
      </MapContainer>
    </div>
    );
}

export default MapDisplay;