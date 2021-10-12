import react from "react"

export const ContactList = ({filteredContacts, deleteContact }) => {
    return(<ul>{filteredContacts.map(e => <li key={e.id}>{e.name} : {e.number} <button onClick={()=>deleteContact(e.id)}>Delete</button></li>)    }</ul>)
   
}
