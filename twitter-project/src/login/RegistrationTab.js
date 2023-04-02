import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const MONTH_TYPES = [
  { label: "Jan", value: "Jan" },
  { label: "Feb", value: "Feb" },
  { label: "Mar", value: "Mar" },
  { label: "Apr", value: "Apr" },
  { label: "May", value: "May" },
  { label: "Jun", value: "Jun" },
  { label: "Jul", value: "Jul" },
  { label: "Aug", value: "Aug" },
  { label: "Sep", value: "Sep" },
  { label: "Oct", value: "Oct" },
  { label: "Nov", value: "Nov" },
  { label: "Dec", value: "Dec" },
];

function RegistrationTab() {
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
            Creat an account
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Username"
              className="border-2 rounded-sm mt-24 py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "500px",
              }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Email"
              className="border-2 rounded-sm mt-12 py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "500px",
              }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="password"
              placeholder="Password"
              className="border-2 rounded-sm mt-12 py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "500px",
              }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-2 rounded-sm mt-12 py-12 px-12"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "500px",
              }}
            />
          </div>
          <div className="mt-12">Date of Birth</div>
          <div className="flex flex-row">
            <div className="mx-4 ">
              <TextField select label="" id="type" name="type" type="text">
                {MONTH_TYPES.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="mx-4">
              <input
                type="text"
                placeholder="Day"
                className="border-2 rounded-sm mt-12 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
            <div className="mx-4">
              <input
                type="text"
                placeholder="Year"
                className="border-2 rounded-sm mt-12 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-24 border-2 bg-blue focus:bg-blue-900 rounded-16 text-center px-8 py-8 font-bold text-xs text-white"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "600px",
              }}
            >
              Register
            </button>
          </div>
          <div>
            <a className="mt-24 text-center text-xs underline flex justify-center">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationTab;
