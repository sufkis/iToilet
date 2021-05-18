import React from "react";
import GoogleMapReact from "google-map-react";
import toiletIcon from "./toilet.png";
import { useAuth } from "./contexts/Auth";
import Marker from "./components/marker";

function Map(props) {
  const { toilets } = props;
  // const Marker = ({ text }) => <div> <i className="fas fa-map-marker text-primary"></i>{text} </div>;
  let userLat = 32.722124799999996;
  let userLng = 35.2485376;

  const { coords } = useAuth();

  const { lat, lng} = coords

  console.log(lat, lng);

  return (
    <div style={{ height: 777, width:375}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `AIzaSyCfQfEo0boyriOF_SwxKA0mboSY3JWUWtw` }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={15}
      >
        {toilets.map((toilet, i) => {
          return (
            <Marker
              lat={toilet.lat}
              lng={toilet.lng}
              text={toilet.text}
              href={toiletIcon}
              key={i}
              toilet={toilet}
            ></Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
