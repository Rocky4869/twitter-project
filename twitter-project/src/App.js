//cd twitter-project

//First terminal
//npm start

//Second terminal
//npm run build
//serve -s build
//- Network:  http://192.168.8.2:3000

import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />
      

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

    </div>
  );
}

export default App;
