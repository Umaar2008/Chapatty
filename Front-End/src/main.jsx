import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "firebaseui/dist/firebaseui.css";
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext/index.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <AuthProvider>
      <App />
  </AuthProvider>
    </StrictMode>,

  )
