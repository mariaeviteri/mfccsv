// this code is essentially the front end for the scanner

import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      Quagga.stop(); // Stop the scanner when component unmounts
    };
  }, []);

  const startScanner = () => {
    setError("");
    setScanning(true);

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment", // Use back camera if available
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader"], // Adjust based on your barcodes
        },
      },
      (err) => {
        if (err) {
          setError("Camera access denied or not available.");
          setScanning(false);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      Quagga.stop();
      setScanning(false);
      onScanSuccess(result.codeResult.code); // Send scanned ticket number
    });
  };

  return (
    <div>
      <button onClick={startScanner} disabled={scanning}>
        {scanning ? "Scanning..." : "Scan Ticket"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={videoRef} style={{ width: "100%", maxWidth: "500px" }}></div>
    </div>
  );
};

export default BarcodeScanner;
