import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

import Home from "./pages/Home"
import Navbar from "./pages/components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
      <div className=" container-fluid bg-dark text-light" >
        <Navbar />
        <Routes>
          <Route 
            path = "/"
            element = {user ? <Home  /> : <Navigate to='/login' />}         
          />
          <Route 
            path = "/login"
            element = {!user ? <Login /> : <Navigate to='/' /> }         
          />
          <Route 
            path = "/signup"
            element = {!user ? <Signup /> : <Navigate to='/' /> }         
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
