import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { RefreshTokenContextProvider } from './context/RefreshTokenContext';
import { ShowDashboardContextProvider } from './context/ShowDashboardContext';
import { UserProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RefreshTokenContextProvider>
      <AuthContextProvider>
        <ShowDashboardContextProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ShowDashboardContextProvider>
      </AuthContextProvider>
    </RefreshTokenContextProvider>
  </React.StrictMode>
);

reportWebVitals();
