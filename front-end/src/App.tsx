//Dependencies & Components
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"

//Pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
// import Register from './pages/Register'
import IsAuth from './components/IsAuth'
import Register from './pages/Register'

const App = () => {

  const loggedIn = false;

  return (
    <Routes>
      <Route path="/" element={<IsAuth isLoggedIn={loggedIn}><Dashboard/></IsAuth>}/>
      <Route path="/login" element={loggedIn ? <Navigate to="/" replace /> : <Login/>}/>
      <Route path="/registration" element={loggedIn ? <Navigate to="/" replace /> : <Register/>}/>
      <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}/>
    </Routes>
  )
}

export default App
