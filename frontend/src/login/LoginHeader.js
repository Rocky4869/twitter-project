import React from "react";
import "../css/LoginHeader.css";

function LoginHeader() {
  return (
    <div>
      <div
        className="container"
        style={{
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "48px",
          lineHeight: "56px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        Simplified Twitter
      </div>
    </div>
  );
}

export default LoginHeader;
