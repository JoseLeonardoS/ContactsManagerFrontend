import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../../data/api"

function SignInCard() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function signIn(e) {
        e.preventDefault()
        api.post('/user/login', { email: email, password: password })
            .then((token) => {
                localStorage.setItem("token", `Bearer ${token.data}`)
                console.log(token.data)
            })

        window.location.href = '/dashboard'
    }

    return (
        <div>
            <h1>Login</h1>

            <form action="submit">
                <p>
                    <label htmlFor="email">
                        Email:
                        <input type="text" id="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="example@email.com" />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Password:
                        <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="********" />
                    </label>
                </p>

                <button onClick={signIn}>Sign In</button>
                <p>Or <Link to="/sign-up">create</Link> account</p>
            </form>
        </div>
    )
}

export default SignInCard
