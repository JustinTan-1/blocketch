import Header from "../components/Header"
import axios from "axios"
import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [cookies, setCookie] = useCookies(['user'])

    let navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/api/login", {
            username: username,
            password: password
        }, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then((res) => {
            if (res.data.error){
                alert(res.data.error)
            }
            else {
                alert(res.data.success)
                setCookie('user', res.data.username)
                navigate("/home")
            }
        })
    }
    return(
        <>
        <Header></Header>
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input placeholder="Password" value ={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
}