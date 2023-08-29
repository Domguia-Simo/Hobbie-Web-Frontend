import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Link ,Route,Routes, BrowserRouter as Router} from 'react-router-dom'
import Body from './body.jsx';
import Foot from './footer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
);
