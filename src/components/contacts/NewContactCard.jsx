import { useState } from "react"
import api from "../../data/api"

function NewContactCard({ setOpen, refresh }) {

    const [contact, setContact] = useState({
        name: '',
        phone: '',
    })

    function handleChange({ target }) {
        setContact({ ...contact, [target.name]: target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const token = localStorage.getItem('token')

        api.post("contact/create", contact, {
            headers: {
                'Authorization': token
            }
        })

        refresh(prev => !prev)
    }

    return (
        <div>
            <form action="submit">
                <h1>Create new contact</h1>

                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={contact.name} onChange={handleChange} />
                </p>

                <p>
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" name="phone" id="phone" value={contact.phone} onChange={handleChange} />
                </p>

                <button onClick={handleSubmit}>Create</button>
            </form>
            <button onClick={() => setOpen(false)}>X</button>
        </div>
    )
}

export default NewContactCard
