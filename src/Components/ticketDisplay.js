// TicketDisplay.js

import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

const TicketDisplay = ({ color, character }) => {
  const imagePath = require(`../Tickets/${color}/${character}.png`);
  const stampPath = require("../Tickets/ticket-stamp.png");
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#f0f4f8");
  const [stampPosition, setStampPosition] = useState(null);

  const handleTouchStart = (event) => {
    if (event.touches.length === 3) {
      const touch = event.touches[0];
      setStampPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  useEffect(() => {
    const colorThief = new ColorThief();
    const handleImageLoad = () => {
      const currentImgRef = imgRef.current;
      if (currentImgRef) {
        const color = colorThief.getColor(currentImgRef);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      }
    };

    if (imgRef.current.complete) {
      handleImageLoad();
    } else {
      imgRef.current.addEventListener("load", handleImageLoad);
      return () => imgRef.current.removeEventListener("load", handleImageLoad);
    }
  }, [imagePath]);

  return (
    <div
      className="ticket-container"
      style={{
        backgroundColor: bgColor,
      }}
      onTouchStart={handleTouchStart}
    >
      <img
        src={imagePath}
        alt={`${character} Ticket`}
        className="ticket-image"
        ref={imgRef}
        crossOrigin="anonymous"
      />
      {stampPosition && (
        <img
          src={stampPath}
          alt="Stamp"
          className="stamp"
          style={{
            top: stampPosition.y - 50,
            left: stampPosition.x - 50,
          }}
        />
      )}
    </div>
  );
};

export default TicketDisplay;
