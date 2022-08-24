import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./styles/App.scss";

import { AuthProvider } from "./contexts/AuthContext"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import UpdateProfile from "./pages/UpdateProfile"
import Error from "./pages/Error"
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute"
import Modal from "./layout/Modal"
import AppContainer from "./layout/AppContainer"



function App() {
  return (
    <div className="w-100">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppContainer />} >
              <Route index element={<Home />} />
              <Route exact path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route exact path="update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            </Route>

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
