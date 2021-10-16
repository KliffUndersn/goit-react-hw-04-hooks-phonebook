import { useState } from 'react';
import { v4 as generate } from 'uuid';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './FilterContacts/FilterContacts';
import useLocalStorage from '../../hooks/useLocalStorage'

const InputForm =() => {


 const [contacts, setContacts] = useLocalStorage('contacts', '');
 const [state,setState] = useState({
    name: '',
    filter: '',
    number: '',    
  })
  const handleChange = ({ target }) => {
    setState({...state,
      [target.name]: target.value,
    });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, number} = state
    if (contacts.length === 0) {return setContacts([{id: generate(),
      name,
      number,}])}
    const newName = contacts.map(e=> e.name)
    if (newName.includes(e.target.name.value)){return alert(`${e.target.name.value} says hello from chat`)}
    const singleContact = {
      id: generate(),
      name,
      number,
    }
    setContacts([...contacts, singleContact])
    
  }
  const filterContacts = (e) => {
    if (contacts.length === 0) {return}
    return contacts.filter((e) => e.name.toLowerCase().includes(state.filter))
  }

  const changiFilter = ({target}) => {
  
    setState({...state, filter:target.value})
  }
  const deleteContact = (id) => {
   setContacts(contacts.filter(e=>e.id !==id))
  }

    return (<>
        <form onSubmit={handleSubmit}>
          <h1>Phonebook</h1>
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handleChange}
          />
          <h2>Number</h2>
         <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange}
          />
          <button type="submit">Add contact</button>
          </form>
          
          <FilterContacts filtered={changiFilter} />
          
          
          <ContactList filteredContacts={filterContacts()} deleteContact={deleteContact}/>
        </>

    )
  
}

export default InputForm