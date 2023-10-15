import {
  GoogleMap, Marker, useLoadScript
} from "@react-google-maps/api";
import React, { useMemo, useState, useEffect } from "react";
import "./Map.css";

const Map = ({initialAddress}) => {
  // load google maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    mapIds: ["f840034defc4fc2c"]
  });
  const [markers, setMarkers] = useState([]);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState(0);
  // center of the map
  var center = useMemo(() => ({ lat: 40.377, lng: 49.892 }), []);

  useEffect(() => {
    if (initialAddress !== 0) // if initial address is not 0, then geocode it
      geocodeAddress(initialAddress);
  } , [initialAddress]);
  // geocode means to get lat and lng from address

  useEffect(() => {
    if (area !== 0)
      setPrice(area*100); // 100 is the price per m2
  }
  , [area]);

  const geocodeAddress = (address) => {
    if (!window.google) {
      console.error("Google API not available");
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    console.log(`Geocoding address: ${address}`);
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0].geometry.location) {
        const location = results[0].geometry.location; // location is lat and lng
        setMarkers([
          {
            lat: location.lat(),
            lng: location.lng(),
          },
        ]);

        // fetch price from backend
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: location.lat().toFixed(3), lon: location.lng().toFixed(3) })
        };
        fetch('http://192.168.52.223:8080/price', requestOptions)
          .then(response => response.json())
          .then(data => {
            setPrice(data.price)
            setArea(data.price/100)
          });
      } else {
        console.error("Geocoding error:", status);
      }
    });
  };
  const onMapClick = (e) => {
    // add marker to map
    setMarkers((current) => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    ]);
    // put request to localhost:8080/price with lat and lng
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: e.latLng.lat().toFixed(3), lon: e.latLng.lng().toFixed(3) })
    };
    fetch('http://192.168.52.223:8080/price', requestOptions)
      .then(response => response.json())
      .then(data => setArea(data.price/100));
  };

  const onMapClickNothing = (e) => {
    console.log("nothing");
  }

  const onMapClickHandle = (e) => {
    /*
    if (price === 0)
      onMapClick(e);
    else
      onMapClickNothing(e);
    */
      onMapClick(e);
  }
  // approximate price is 100 azn per m2 +- 5%

  return (
    <div className="map-page-container">
      <div className="flex-space"/>
      <div className="Mapp">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={12}
            options={{ mapId: "f840034defc4fc2c" }}
            onClick={onMapClickHandle}
          >
              {markers.map((marker) => (
                  <Marker 
                    position={{ 
                      lat: marker.lat,
                      lng: marker.lng 
                    }} />
              ))}
          </GoogleMap>
        )}
      </div>
      <div className="flex-space"/>
      <div className="map-page-info">
        <p>Roof area m²:</p>
        <input className="area-input" type="number" placeholder="Roof Area m²" onChange={(e) => setArea(e.target.value)} value={area}/>
        <p>Approximate price: {Math.round(price*0.9/100)*100}₼ ~ {Math.round(price*1.1/100)*100}₼</p><p>or</p><p>{Math.round(price*0.9/100/1.7)*100}$ ~ {Math.round(price*1.1/100/1.7)*100}$</p>
        <button className="confirm-button" type="submit">Contact us</button>
      </div>
    </div>
  );
};

export default Map;
