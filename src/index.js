import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './components/Root';


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
