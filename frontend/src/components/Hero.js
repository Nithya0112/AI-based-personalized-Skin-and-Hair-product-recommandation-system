


// import React, { useRef, useState, useEffect } from "react";
// import "../styles/Hero.css";

// function Hero() {

// const videoRef = useRef(null);
// const canvasRef = useRef(null);

// const [cameraOn, setCameraOn] = useState(false);
// const [image, setImage] = useState(null);
// const [stream, setStream] = useState(null);
// const [result, setResult] = useState("");

// /* ---------------- Start Camera ---------------- */

// useEffect(() => {

// if (cameraOn) {

// navigator.mediaDevices.getUserMedia({ video: true })
// .then((mediaStream) => {

// setStream(mediaStream);

// if (videoRef.current) {
// videoRef.current.srcObject = mediaStream;
// }

// })
// .catch(err => {
// console.error("Camera error:", err);
// });

// }

// }, [cameraOn]);

// /* ---------------- Stop Camera on Unmount ---------------- */

// useEffect(() => {

// return () => {
// if (stream) {
// stream.getTracks().forEach(track => track.stop());
// }
// };

// }, [stream]);

// /* ---------------- Open Camera ---------------- */

// const startCamera = () => {
// setCameraOn(true);
// };

// /* ---------------- Capture Image ---------------- */

// const captureImage = () => {

// const canvas = canvasRef.current;
// const video = videoRef.current;

// canvas.width = video.videoWidth;
// canvas.height = video.videoHeight;

// const ctx = canvas.getContext("2d");
// ctx.drawImage(video, 0, 0);

// const imgData = canvas.toDataURL("image/png");
// setImage(imgData);

// };

// /* ---------------- Retake Image ---------------- */

// const retakeImage = async () => {

// setImage(null);
// setResult("");

// try {

// if(stream){
// stream.getTracks().forEach(track => track.stop());
// }

// const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

// setStream(mediaStream);

// if(videoRef.current){
// videoRef.current.srcObject = mediaStream;
// }

// } catch(error){
// console.error("Camera restart error:", error);
// }

// };

// /* ---------------- Analyze Image ---------------- */

// const analyzeImage = async () => {

// try {

// const response = await fetch("http://localhost:8080/api/analyze", {
// method: "POST",
// headers: {
// "Content-Type": "application/json"
// },
// body: JSON.stringify({
// image: image
// })
// });

// const text = await response.text();

// setResult(text);

// } catch (error) {

// console.error(error);

// }

// };

// /* ---------------- Close Camera ---------------- */

// const closeCamera = () => {

// if (stream) {
// stream.getTracks().forEach(track => track.stop());
// }

// if (videoRef.current) {
// videoRef.current.srcObject = null;
// }

// setCameraOn(false);
// setImage(null);
// setStream(null);
// setResult("");

// };

// /* ---------------- UI ---------------- */

// return (

// <section className="hero">

// {/* -------- Left Text -------- */}

// <div className="hero-text">

// <h1>AI Powered Skin & Hair Care Recommendations</h1>

// <p>
// Upload your skin or hair image and get personalized
// product recommendations using Artificial Intelligence.
// </p>

// <button className="hero-btn" onClick={startCamera}>
// Start AI Analysis
// </button>

// </div>

// {/* -------- Hero Image -------- */}

// <div className="hero-img">

// <img
// src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
// alt="skincare"
// />

// </div>

// <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

// {/* -------- Camera Section -------- */}

// {cameraOn && (

// <div className="camera-box">

// {/* -------- Camera View -------- */}

// {!image && (

// <>

// <video ref={videoRef} autoPlay playsInline></video>

// <div className="camera-buttons">

// <button onClick={captureImage}>
// Capture
// </button>

// <button onClick={closeCamera}>
// Cancel
// </button>

// </div>

// </>

// )}

// {/* -------- Image Preview -------- */}

// {image && (

// <div className="preview">

// <h3>Captured Image</h3>

// <img src={image} alt="captured" />

// <div className="camera-buttons">

// <button onClick={retakeImage}>
// Retake
// </button>

// <button onClick={analyzeImage}>
// Analyze Skin
// </button>

// <button onClick={closeCamera}>
// Close
// </button>

// </div>

// {/* -------- Result -------- */}

// {result && (

// <div className="result-box">

// <h2>Detected Skin Type</h2>

// <p>{result}</p>

// </div>

// )}

// </div>

// )}

// </div>

// )}

// </section>

// );

// }

// export default Hero;
import React from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (

    <section className="hero">

      {/* -------- Left Text -------- */}
      <div className="hero-text">

        <h1>AI Powered Skin & Hair Care Recommendations</h1>

        <p>
          Upload your skin or hair image and get personalized
          product recommendations using Artificial Intelligence.
        </p>

        <button 
          className="hero-btn" 
          onClick={() => navigate("/camera")}
        >
          Start AI Analysis
        </button>

      </div>

      {/* -------- Hero Image -------- */}
      <div className="hero-img">

        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
          alt="skincare"
        />

      </div>

    </section>

  );
}

export default Hero;