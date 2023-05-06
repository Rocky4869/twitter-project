/*
Documentation by ChatGPT (modified):

The index.js file is the entry point for a React application. 
It imports the necessary modules and components to render the application on the web page.

The first two lines import the React and ReactDOM modules. 
React is the core library for building user interfaces in React, while ReactDOM is the package that provides DOM-specific methods for rendering React components.

The third line imports the index.css file, which contains the styles for the application.

The fourth line imports the App component from the App.js file. 
This is the main component that will be rendered on the web page.

The fifth line imports the reportWebVitals function from the reportWebVitals.js file. 
This function is used to measure the performance of the application.

The sixth line creates a root element using the ReactDOM.createRoot() method. 
This method creates a new root for a React tree and returns a Root object that can be used to render the application.

The seventh line renders the App component inside a React.StrictMode component.
The React.StrictMode component is used to highlight potential problems in the application during development.

The eighth line calls the reportWebVitals() function to start measuring the performance of the application.

Overall, this index.js file sets up the necessary components and modules to render the React application on the web page and measure its performance.
*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
