//import logo from './logo.svg';
import React from "react";
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from "./Widgets";
import './App.css';

function App() {
  return (
    // BEM
    <div className="app">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}

export default App;