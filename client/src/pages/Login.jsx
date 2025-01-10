import Header from "../components/Header"
export default function Login() {

    function handleSubmit(event) {
        event.preventDefault()
    }
    return(
        <>
        <Header></Header>
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
            </form>
        </div>
        </>
    )
}