// import React, { useRef, useState, useEffect } from "react";
// import "../styles/CameraPage.css";

// function CameraPage() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [image, setImage] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [result, setResult] = useState("");

//   /* Start Camera */
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((mediaStream) => {
//         setStream(mediaStream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       });
//   }, []);

//   /* Capture */
//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     setImage(canvas.toDataURL("image/png"));
//   };

//   /* UI */
//   return (
//     <div className="camera-page">

//       {!image ? (
//         <>
//           <video ref={videoRef} autoPlay playsInline className="camera-video" />
//           <button onClick={captureImage} className="capture-btn">📷</button>
//         </>
//       ) : (
//         <>
//           <img src={image} alt="captured" className="preview-img" />
//         </>
//       )}

//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//     </div>
//   );
// }

// export default CameraPage;
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CameraPage.css";

function CameraPage() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // ✅ IMPORTANT

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  /* ---------------- START CAMERA ---------------- */
  useEffect(() => {
    startCamera();

    return () => {
      stopCamera(); // ✅ cleanup
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
      videoRef.current.srcObject = null; // ✅ VERY IMPORTANT
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

    stopCamera(); // ✅ CAMERA STOPS HERE
  };

  /* ---------------- RETAKE ---------------- */
  const retakeImage = async () => {
    setImage(null);
    await startCamera();
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

      {/* ❌ EXIT BUTTON */}
      <button className="exit-btn" onClick={handleExit}>
        ✕
      </button>

      {/* CAMERA VIEW */}
      {!image ? (
        <>
          <video ref={videoRef} autoPlay playsInline></video>

          <button className="capture-btn" onClick={captureImage}>
            ●
          </button>
        </>
      ) : (
        /* PREVIEW */
        <div className="preview-screen">

          <img src={image} alt="captured" />

          <div className="bottom-actions">
            <button onClick={retakeImage}>Retake</button>
            <button onClick={() => navigate("/result", { state: { image, skinType: "Oily", score: 73, tone: "Deep" } })}>
              Analyze
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default CameraPage;