import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import getCookie from './getCookie'

export default function ProtectedRoute() {
    const isAuthenticated = getCookie("access_token")
    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/"} />
    )
}