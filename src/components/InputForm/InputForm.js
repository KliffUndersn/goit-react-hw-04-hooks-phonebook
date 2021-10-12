import { Component } from 'react';
import { v4 as generate } from 'uuid';
export default class InputForm extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    name: '',
    filter: '',
    number: ''
    
  };
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const s = this.state.contacts.map(e=> e.name)
    if (s.includes(e.target.name.value)){return alert(`${e.target.name.value} says hello from chat`)}
    this.contactList();
    this.createContact();
  }
  createContact = () => {
    const {name, number,contacts} = this.state
    const singleContact = {
      name,
      number,
      id: generate(),
    }
    this.setState({contacts: [...contacts, singleContact]})
  }
  filterContacts = (e) => {
    if (e){this.setState({filter:e.target.value.trim()})}
    const {contacts,filter} = this.state
    return this.contactList(contacts.filter((e) => e.name.toLowerCase().includes(filter)))
  }
  contactList = (datas) => {
    if (!datas){return}
    return datas.map(e => <li key={e.id}>{e.name} : {e.number} <button onClick={()=>this.deleteContact(e.id)}>Delete</button></li>)    
  }
  deleteContact = (id) => {
   this.setState((prevState)=>({contacts:prevState.contacts.filter(e=>e.id !==id)}))
  }
  render() {

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>Phonebook</h1>
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.handleChange}
          />
          <h2>Number</h2>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
          <h2>Find contacts by name</h2>
            <input
            type="text"
            name="filter"
            placeholder="start typing"
            onChange={this.filterContacts}
            />
          <h3>Contacts</h3>
          <ul>{this.filterContacts()}</ul>
          
      </>
    );
  }
}
