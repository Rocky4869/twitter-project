/*

Documentation by ChatGPT (modified):

The LoginHeader component is a functional component that renders a simple header for the login page of a Twitter-like application. 
It imports the React library and a CSS file for styling.

The component returns a div element that contains another div element with a class of "container". 
The text "Simplified Twitter" is rendered inside this div element.

The LoginHeader component is exported as a default export, which means it can be imported and used in other parts of the application.

*/

import React from "react";
import "../css/LoginHeader.css";

function LoginHeader() {
  return (
    <div>
      <div className="container">Simplified Twitter</div>
    </div>
  );
}

export default LoginHeader;
