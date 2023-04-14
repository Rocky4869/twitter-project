import React from "react";
import "../css/SidebarOption.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, forwardRef } from "react";

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
