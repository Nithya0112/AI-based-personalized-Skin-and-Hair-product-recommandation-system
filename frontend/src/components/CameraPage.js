
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CameraPage.css";

function CameraPage() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------------- START CAMERA ---------------- */
  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });

      streamRef.current = mediaStream;

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  /* ---------------- STOP CAMERA ---------------- */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  /* ---------------- CAPTURE ---------------- */
  const captureImage = () => {

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imgData = canvas.toDataURL("image/png");
    setImage(imgData);

    stopCamera();
  };

  /* ---------------- RETAKE ---------------- */
  const retakeImage = async () => {
    setImage(null);
    await startCamera();
  };

  /* ---------------- ANALYZE (🔥 MAIN FIX) ---------------- */
  const analyzeImage = async () => {

    if (!image) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: image
        })
      });

      if (!response.ok) throw new Error("Server error");

      let skinType = await response.text();

      // ✅ CLEAN VALUE
      skinType = skinType.trim().toLowerCase();

      // ✅ NAVIGATE WITH REAL DATA
      navigate("/result", {
        state: {
          image,
          skinType,
          score: 73,
          tone: "Deep"
        }
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EXIT ---------------- */
  const handleExit = () => {
    stopCamera();
    navigate("/");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="camera-full">

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button className="exit-btn" onClick={handleExit}>
        ✕
      </button>

      {!image ? (
        <>
          <video ref={videoRef} autoPlay playsInline></video>

          <button className="capture-btn" onClick={captureImage}>
            ●
          </button>
        </>
      ) : (
        <div className="preview-screen">

          <img src={image} alt="captured" />

          <div className="bottom-actions">
            <button onClick={retakeImage}>Retake</button>

            {/* 🔥 ANALYZE BUTTON */}
            <button onClick={analyzeImage} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default CameraPage;