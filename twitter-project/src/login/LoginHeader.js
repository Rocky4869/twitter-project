import React from "react";
import "../css/twitter.css";

function LoginHeader() {
  return (
    <div>
      <div
        className="text-white bg-blue w-screen px-16 py-4"
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
