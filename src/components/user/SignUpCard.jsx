import { useState } from "react"
import api from "../../data/api"

function SignUpCard() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(data)

        api.post('user/register', data)
            .then(res => {
                console.log(res.data)
            })

        console.log(e.target.name)
        window.location.href = '/sign-in'
    }

    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    return (
        <div>
            <h1>Create Account</h1>
            <form action="submit">
                <p>
                    <label htmlFor="name">
                        Name:
                        <input type="text" id="name" name="name" value={data.name} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="email">
                        Email:
                        <input type="text" id="email" name="email" value={data.email} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="password">
                        Password:
                        <input type="password" id="password" name="password" value={data.password} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <label htmlFor="phone">
                        Phone:
                        <input type="number" id="phone" name="phone" value={data.phone} onChange={handleChange} required />
                    </label>
                </p>
                <p>
                    <button onClick={handleSubmit}>Submit</button>
                </p>
            </form>
            <p>Create account or <a href="/sign-in">login</a></p>
        </div>
    )
}

export default SignUpCard
