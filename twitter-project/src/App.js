//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000
import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import LoginBar from "./login/LoginBar";
import LoginCard from "./login/LoginCard";
// import "./App.css";
import "./css/tailwind.css";
import "./css/tailwind-small.css";

function App() {
  return (
    <div className="app">
      <LoginBar />
      <LoginCard />
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Feed */}
      {/* <Feed /> */}

      {/* Widgets */}
      {/* <Widgets /> */}
    </div>
  );
}

export default App;
