//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import LoginContainer from "./login/LoginContainer";

function App() {
  return (
    <LoginContainer />
    // <div className="app">
    //   <Sidebar />
    //   <Feed />
    //   <Widgets />
    // </div>
  );
}

export default App;
