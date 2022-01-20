import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ClinicsProvider } from './context/ClinicsProvider';

ReactDOM.render(
  <ClinicsProvider>
    <App />
  </ClinicsProvider>,
  document.getElementById('app'),
);
