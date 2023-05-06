/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

The SidebarOption.js file is a React component that renders a sidebar option with an icon and text. 
It imports the React library and the SidebarOption.css file for styling.

The component takes in several props:

active: a boolean value that determines whether the option is currently active or not
text: a string that represents the text to be displayed for the option
Icon: a component that represents the icon to be displayed for the option
onClick: a function that is called when the option is clicked
iconStyle: an optional object that represents the style to be applied to the icon

The component returns a div element with the class sidebarOption. 
If the active prop is true, the sidebarOption--active class is also applied. 
When the option is clicked, the onClick function is called. 
The Icon component is rendered with the optional iconStyle prop, and the text prop is rendered as an h2 element.

Finally, the component is exported as the default export of the file, allowing it to be imported and used in other components.
*/

import React from "react";
import "../css/SidebarOption.css";

function SidebarOption({ active, text, Icon, onClick, iconStyle}) {
  return (
    <div
      className={`sidebarOption ${active && "sidebarOption--active"}`} 
      onClick={onClick}
    >
      <Icon style={iconStyle}/>
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
