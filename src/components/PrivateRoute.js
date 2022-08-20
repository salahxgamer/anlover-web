import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser)
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} />

  // authorized so return child components
  return children;

}
