import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import toiletIcon from "./toilet.png";

const AnyReactComponent = ({ text }) => < div > { text } < /div>;

function Map() {
    const [lat, setLat] = useState(32.06342);
    const [lng, setLng] = useState(34.773181);
    return ( <
        div style = {
            { height: "75%", width: "100%" }
        } >
        <
        GoogleMapReact bootstrapURLKeys = {
            { key: `AIzaSyDqrYGToxFX3WcTkH6Dpllx7F0JnSwjuOM` }
        }
        defaultCenter = {
            { lat: lat, lng: lng }
        }
        defaultZoom = { 15 } >
        <
        AnyReactComponent lat = { 59.955413 }
        lng = { 30.337844 }
        text = "My Marker"
        href = { toiletIcon }
        /> < /
        GoogleMapReact > <
        /div>
    );
}

export default Map;