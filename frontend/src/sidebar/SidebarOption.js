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
