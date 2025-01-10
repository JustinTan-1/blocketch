import React from 'react'
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie'

export default function Header() {
    const [cookies, setCookie] = useCookies(['user'])

    return(
        <div className="header">
        {!cookies.user ? <><Link to="/login">Login</Link> <Link to="/register">Register</Link></> : <Link to="/logout">Logout</Link>}
        </div>
    )
}