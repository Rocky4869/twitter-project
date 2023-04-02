import React from "react";

function ResetPassword() {
  return (
    <div className="flex justify-center">
      <div
        className="bg-white my-48 flex justify-center"
        style={{
          width: "700px",
          height: "839px",
          border: "1px solid #000000",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
          borderRadius: "30px",
        }}
      >
        <div className="mt-12">
          <div className="flex justify-center">
            <img
              src="twitter.png"
              alt="twitter.png"
              className="w-36 h-36 my-12"
            ></img>
          </div>
          <div
            style={{
              letterSpacing: "letter-spacing: -0.02em",
            }}
            className="text-center text-xl font-bold text-black"
          >
            Reset your password
          </div>
          <div className="mt-36 flex flex-col justify-center text-center">
            <div>Please enter and confirm your new password</div>
          </div>
          <div className="flex justify-center mt-36">
            <input
              type="text"
              placeholder="New Password"
              className="border-2 rounded-sm py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "600px",
              }}
            />
          </div>
          <div className="flex justify-center mt-24">
            <input
              type="text"
              placeholder="Confirm Password"
              className="border-2 rounded-sm py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "600px",
              }}
            />
          </div>
          <div className="flex justify-center mt-24">
            <button
              type="submit"
              className="mt-36 border-2 bg-blue focus:bg-blue-900 rounded-16 text-center px-8 py-8 font-bold text-xs text-white"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "600px",
              }}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center mt-36">
            <button
              type="submit"
              className="border-2 bg-black rounded-16 text-center px-8 py-8 font-bold text-xs text-white"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "200px",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
