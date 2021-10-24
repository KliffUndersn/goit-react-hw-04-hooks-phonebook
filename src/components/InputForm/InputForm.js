import { useState } from 'react';
import { v4 as generate } from 'uuid';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './FilterContacts/FilterContacts';
import { connect } from 'react-redux';
import { addContact, deleteContact, filterContact } from '../redux/actions';

const InputForm = ({ onSubmit, items, onDelete, filter, changiFilter }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = state;
    const newName = items.map(e => e.name);
    if (newName.includes(e.target.name.value)) {
      return alert(`${e.target.name.value} says hello from chat`);
    }
    const singleContact = {
      id: generate(),
      name,
      number,
    };
    onSubmit(singleContact);
  };
  const filterContacts = e => {
    return items.filter(e => e.name.toLowerCase().includes(filter));
  };
  return (
    <>
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

      <ContactList
        filteredContacts={filterContacts()}
        deleteContact={onDelete}
      />
    </>
  );
};

const mapStateToProps = ({ items, filter }) => {
  return {
    items,
    filter,
  };
};
const mapDispatchToProps = dispatch => ({
  onSubmit: value => dispatch(addContact(value)),
  onDelete: id => dispatch(deleteContact(id)),
  changiFilter: ({ target }) => dispatch(filterContact(target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
