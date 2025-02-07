import React, { useEffect, useRef } from "react";

const SeatingChart = () => {
  const canvasRef = useRef(null);
  const tables = 37;
  const chairsPerTable = 8;
  const canvasSize = 900;
  const tableRadius = 30;
  const chairRadius = 10;
  const tableSpacing = 120;
  const cols = 6;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < tables; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = col * tableSpacing + tableSpacing / 2;
        const y = row * tableSpacing + tableSpacing / 2;

      // Draw table
      ctx.beginPath();
      ctx.arc(x, y, tableRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#3498db";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(i + 1, x, y + 5);

      // Draw chairs around the table
      for (let j = 0; j < chairsPerTable; j++) {
        const chairAngle = (j / chairsPerTable) * Math.PI * 2;
        const chairX = x + Math.cos(chairAngle) * (tableRadius + 15);
        const chairY = y + Math.sin(chairAngle) * (tableRadius + 15);

        ctx.beginPath();
        ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#2ecc71";
        ctx.fill();
        ctx.stroke();
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={{ border: "1px solid black" }} />;
};

export default SeatingChart;
