import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";

export default function Logout() {
    const [cookies, setCookies, removeCookie] = useCookies(['user'])
    let navigate = useNavigate()
    React.useEffect(() => {
        removeCookie("user")
        navigate("/home")
    }, [])
    
}