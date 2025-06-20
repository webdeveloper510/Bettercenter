import React, { useState } from "react";

const CalendarEmbed = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{ position: "relative", minHeight: "650px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "650px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            zIndex: 1,
          }}
        >
          <div
            style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #007bff",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <iframe
        src="https://betscienceai.shinyapps.io/monthly-calendar/"
        width="100%"
        height="650"
        frameBorder="0"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default CalendarEmbed;
