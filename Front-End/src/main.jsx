import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "firebaseui/dist/firebaseui.css";
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext/index.jsx';
import { ProfileMaking } from './Contexts/ProfileContext/index.jsx';
import React from 'react';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
    <ProfileMaking>

      <App />
    </ProfileMaking>
  </AuthProvider>
    </StrictMode>

  )
