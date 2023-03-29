//import logo from './logo.svg';
import React from "react";
import Sidebar from './Sidebar';
import './App.css';

function App() {
  return (
    // BEM
    <div className="app">
      <h1>Hey Clever Programmers... Let's build a Twitter Clone</h1>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      {/* Widgets */}

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
