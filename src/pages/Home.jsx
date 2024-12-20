import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <h1>Contacts Manager</h1>

            <Link to='/sign-in'>Sign In</Link> <Link to='/sign-up'>Sign Up</Link>
        </div>
    )
}

export default Home
