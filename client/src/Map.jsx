import React from "react";
import GoogleMapReact from "google-map-react";
import toiletIcon from "./toilet.png";

function Map(props) {
  const { toilets } = props;
  const AnyReactComponent = ({ text }) => <div> {text} </div>;
  let userLat = 32.06342;
  let userLng = 34.773181;
  return (
    <div style={{ height: 450, width:400}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `AIzaSyCfQfEo0boyriOF_SwxKA0mboSY3JWUWtw` }}
        defaultCenter={{ lat: userLat, lng: userLng }}
        defaultZoom={15}
      >
        {toilets.map((toilet, i) => {
          return (
            <AnyReactComponent
              lat={toilet.lat}
              lng={toilet.lng}
              text={toilet.text}
              href={toiletIcon}
              key={i}
            ></AnyReactComponent>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
