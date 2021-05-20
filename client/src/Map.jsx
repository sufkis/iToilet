import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useAuth } from "./contexts/Auth";
import Marker from "./components/marker";
import { getToiletsByLocation } from "./lib/api";

function Map(props) {

  const { coords } = useAuth();


  const { toilets, setToilets } = props;

  const { lat, lng} = coords

  console.log(coords);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && coords) {
      getToiletsByLocation()
      .then(toilets => {
        setToilets([...toilets])
      })
    }
    return () => isMounted = false;
  }, [])

  return (
    <div style={{ height: 777, width:375}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={15}
      >
        {toilets.map((toilet, i) => {
          return (
            <Marker
              lat={toilet.lat}
              lng={toilet.lng}
              key={toilet._id}
              toilet={toilet}
            ></Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
