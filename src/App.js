import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"

import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./pages/ForgotPassword"
import UpdateProfile from "./pages/UpdateProfile"

import 'bootstrap/dist/css/bootstrap.min.css';
import Error from "./pages/Error"
import Modal from "./layout/Modal"


function App() {
  return (
    <div className="w-100">
      <Router>
        <AuthProvider>
          <Routes>
            <Route index element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route exact path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

            <Route path="/" element={<Modal />} >
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route path="*" element={<Error statusCode="404" message="The page you requested was not found." />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
