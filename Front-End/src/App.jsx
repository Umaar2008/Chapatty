import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import LandingPage from './Pages/LandingPage'
import Profile from"./Pages/Profile";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import ProfileMaking from "./Pages/ProfileMaking";
import './App.css'

function App() {

  return (
  <Router><div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ProfileMaking" element={<ProfileMaking/>} />
      <Route path="/Inbox" element={<Profile/>} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />


      
    </Routes>
    
    
    </div> </Router>
  )
}

export default App
