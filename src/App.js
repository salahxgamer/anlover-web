import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import ToastContainer from "./components/ToastContainer";
import { AuthProvider } from "./contexts/AuthContext";
import AppContainer from "./layout/AppContainer";
import Modal from "./layout/Modal";
import Anime from "./pages/Anime";
import Animes from "./pages/Animes";
import Episode from "./pages/Episode";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UpdateProfile from "./pages/UpdateProfile";

import "./styles/App.scss";



function App() {
  return (
    <div className="w-100">
      <Helmet defaultTitle="Anime Lover Website - Watch Free Online Anime" titleTemplate="%s - AnLover" />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppContainer showSideBar={false} />} >
              <Route index element={<Home />} />
            </Route>

            <Route path="/" element={<AppContainer />} >
              <Route exact path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route exact path="update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route exact path="animes" element={<PrivateRoute><Animes /></PrivateRoute>} />
              <Route exact path="anime/:animeId" element={<PrivateRoute><Anime /></PrivateRoute>} />
              <Route exact path="episode/:episodeId" element={<PrivateRoute><Episode /></PrivateRoute>} />
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
      <ToastContainer />
    </div>
  )
}

export default App
