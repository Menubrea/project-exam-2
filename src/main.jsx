import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollBackToTop from './helpers/ScrollBackToTop';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollBackToTop />
    <App />
  </BrowserRouter>
);
