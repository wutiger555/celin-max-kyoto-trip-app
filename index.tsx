import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

// 🌸 A hidden message for someone special
console.log(
  '%c💕 Built with love for Celin & Max\'s Kyoto Adventure 💕',
  'color: #C44302; font-size: 14px; font-weight: bold; font-family: serif;'
);
console.log(
  '%c"The best journeys are the ones we take together." — M',
  'color: #888; font-style: italic; font-family: serif;'
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);