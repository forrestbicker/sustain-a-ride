import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const MapContainer = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GCP_KEY,
  });
  const [directions, setDirections] = useState(null);
  const [waypoints, setWaypoints] = useState([
    { location: { lat: 37.4419, lng: -122.143 } },
    { location: { lat: 37.7749, lng: -122.4194 } },
    { location: { lat: 37.0625, lng: -122.084 } },
  ]);

  const directionsCallback = useCallback((response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    }
  }, []);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: 37.7749, lng: -122.4194 };
    const destination = { lat: 37.3352, lng: -121.8811 };

    const waypointsArray = waypoints.map((waypoint) => ({
      location: new google.maps.LatLng(
        waypoint.location.lat,
        waypoint.location.lng
      ),
      stopover: true,
    }));

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypointsArray,
      optimizeWaypoints: true,
      travelMode: "DRIVING",
    };

    directionsService.route(request, directionsCallback);
  }, [waypoints, directionsCallback]);

  return (
    
    <>
      <GoogleMap center={{ lat: 37.7749, lng: -122.4194 }} zoom={8}>
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
        <Marker position={{ lat: 37.3352, lng: -121.8811 }} />
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={{
              lat: waypoint.location.lat,
              lng: waypoint.location.lng,
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default MapContainer;
