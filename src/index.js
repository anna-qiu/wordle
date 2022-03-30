import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './board.css';
import './keyboard.css';
import './popup.css';
import reportWebVitals from './reportWebVitals';
import { Game } from './game';
import { Footer } from './footer';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Game />
    <Footer />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
