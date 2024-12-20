import { useState } from "react"
import api from "../../data/api"

function ContactCard({ contact, refresh }) {

  const [editMode, setEditMode] = useState(false)
  const [cont, setCont] = useState({
    id: contact.id,
    name: contact.name,
    phone: contact.phone
  })

  function handleDelete() {
    const token = localStorage.getItem('token')
    api.delete(`contact/delete/${contact.id}`, {
      headers: {
        'Authorization': token
      }
    })

    refresh(prev => !prev)
  }

  const changeEditStatus = () => setEditMode(p => !p)

  function handleUpdate() {
    changeEditStatus()
    if (editMode) {

      const token = localStorage.getItem('token')

      api.put("contact/edit", cont, {
        headers: {
          'Authorization': token
        }
      })

      refresh(prev => !prev)
      setEditMode(false)
      setCont({ ...cont, name: contact.name, phone: contact.phone })
    }
  }

  function handleChange({ target }) {
    setCont({ ...cont, [target.id]: target.value })
  }

  if (editMode) {
    return (
      <div>
        <p>
          <label htmlFor="name">Name:
            <input type="text" id="name" value={cont.name} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label htmlFor="phone">Phone:
            <input type="text" id="phone" value={cont.phone} onChange={handleChange} />
          </label>
        </p>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    )
  }
  else if (editMode == false) {
    return (
      <div key={contact.id}>
        <h5>Name: {contact.name} </h5>
        <p>Telefone: {contact.phone}</p>
        <button onClick={handleUpdate}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }

}

export default ContactCard
