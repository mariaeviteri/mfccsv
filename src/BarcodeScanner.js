import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (Quagga._scannerRunning) {
        Quagga.stop();
        Quagga._scannerRunning = false;
      }
    };
  }, []);

  const startScanner = () => {
    setError("");
    setScanning(true);

    if (!videoRef.current) {
      setError("Error: Video element not found.");
      setScanning(false);
      return;
    }

    // Prevent multiple initializations
    if (Quagga._scannerRunning) {
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: videoRef.current, // Ensure video element exists
          constraints: {
            facingMode: "environment", // Use back camera
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader"], // Adjust barcode types
        },
        locate: true,
      },
      (err) => {
        if (err) {
          setError("Camera access denied or not available.");
          setScanning(false);
          return;
        }

        Quagga._scannerRunning = true;
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      if (Quagga._scannerRunning) {
        Quagga.stop();
        Quagga._scannerRunning = false;
        setScanning(false);
        onScanSuccess(result.codeResult.code);
      }
    });
  };

  return (
    <div>
      <button onClick={startScanner} disabled={scanning}>
        {scanning ? "Scanning..." : "Scan Ticket"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={videoRef} style={{ width: "100%", maxWidth: "500px", height: "400px", background: "#000" }}></div>
    </div>
  );
};

export default BarcodeScanner;
