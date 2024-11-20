import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { RefreshTokenContextProvider } from './context/RefreshTokenContext';
import { ShowDashboardContextProvider } from './context/ShowDashboardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RefreshTokenContextProvider>
      <AuthContextProvider>
        <ShowDashboardContextProvider>
          <App />
        </ShowDashboardContextProvider>
      </AuthContextProvider>
    </RefreshTokenContextProvider>
  </React.StrictMode>
);

reportWebVitals();
