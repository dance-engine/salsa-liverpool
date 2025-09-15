'use client'
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

// const MapDynamic = dynamic(() => import('./MapDynamic'), {
//   ssr: false
// });

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = ({width,height, lat, lng}:{ width: number, height: number, lat: number, lng: number }) => {

  const MapDynamic = useMemo(() => dynamic(
        () => import('./MapDynamic'),
        { 
          loading: () => <p className='flex items-center justify-center h-[300px] bg-gray-500'>Map loading</p>,
          ssr: false 
        }
    ), [])
    
  // const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: `${width || DEFAULT_WIDTH}/${height || DEFAULT_HEIGHT}` }} className="w-full h-[300px]">
      <MapDynamic lat={lat} lng={lng} />
    </div>
  )
}

export default Map;