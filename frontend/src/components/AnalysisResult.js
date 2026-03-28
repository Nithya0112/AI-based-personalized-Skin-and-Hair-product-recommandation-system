import React, { useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const AnalysisResult = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [showMap, setShowMap] = useState(false);

  const [center, setCenter] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);

  // Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Convert to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Call Backend
  const analyzeImage = async () => {
    const base64 = await toBase64(image);

    const response = await axios.post(
      "http://localhost:8080/api/analyze",
      {
        image: base64,
      }
    );

    const res = response.data;
    setResult(res);

    // Show map for severe cases
    if (res === "acne") {
      setShowMap(true);
      getLocation();
    }
  };

  // Get Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setCenter(userLoc);
      searchNearby(userLoc);
    });
  };

  // Search Dermatologists
  const searchNearby = (location) => {
    const map = new window.google.maps.Map(
      document.createElement("div")
    );

    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: location,
      radius: 5000,
      keyword: "dermatologist",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Skin Analysis</h2>

      <input type="file" onChange={handleImage} />

      {preview && (
        <div>
          <img src={preview} alt="preview" width="200" />
        </div>
      )}

      <button onClick={analyzeImage}>Analyze</button>

      {result && (
        <h3>
          Prediction: <span style={{ color: "blue" }}>{result}</span>
        </h3>
      )}

      {/* ALERT */}
      {showMap && (
        <h3 style={{ color: "red" }}>
          ⚠️ Possible Skin Issue - Visit Dermatologist
        </h3>
      )}

      {/* MAP */}
      {center && showMap && (
        <LoadScript
          googleMapsApiKey="AIzaSyDyIfgMFMCo-lzSyC3ph3ATiwiR46Old0c"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            <Marker position={center} label="You" />

            {places.map((place, i) => (
              <Marker
                key={i}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                onClick={() => setSelected(place)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{
                  lat: selected.geometry.location.lat(),
                  lng: selected.geometry.location.lng(),
                }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h4>{selected.name}</h4>
                  <p>{selected.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default AnalysisResult;