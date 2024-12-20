import { useEffect } from 'react'
import api from '../data/api'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import ContactCard from '../components/contacts/ContactCard'
import NewContactCard from '../components/contacts/NewContactCard'

function DashBoard() {

    const [refresh, setRefresh] = useState(false)
    const [expireMessage, setExpireMessage] = useState(null)
    const [contacts, setContacts] = useState(null)
    const [createContactModal, setCreateContactModal] = useState(false)

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                setExpireMessage('Sessão expirada, redirecionando para login...');
                localStorage.removeItem('token')
                window.location.reload()
            }
        }

        checkTokenExpiration()
    }, [])

    useEffect(() => {
        listContacts()
    }, [refresh])

    const token = localStorage.getItem('token')

    function listContacts() {
        api.get("contact/list", {
            headers: {
                'Authorization': token
            }
        })
            .then(res => setContacts(res.data))
    }

    function createtModal() {
        setCreateContactModal(() => setCreateContactModal(true))
    }

    return (
        <div>
            <h1> {expireMessage ? expireMessage : 'Contacts List'}</h1>

            <button onClick={createtModal}>Create</button>

            {
                createContactModal ? <NewContactCard setOpen={setCreateContactModal} refresh={setRefresh} /> : null
            }

            <ul>
                {
                    contacts && contacts.data.map(cont => (
                        <ContactCard contact={cont} refresh={setRefresh} />
                    ))
                }
            </ul>
        </div>
    )
}

export default DashBoard
