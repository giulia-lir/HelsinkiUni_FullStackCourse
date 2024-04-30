import { useState } from 'react'
import Title from './components/Title'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 1,
      name: 'Arto Hellas',
      phone: '04599746985',
    },
    {
      id: 2,
      name: 'Essi Esimerkki',
      phone: '04923984203',
    },
    {
      id: 3,
      name: 'Noora Malli',
      phone: '83094280343'
    },
    {
      id: 4,
      name: 'Timo Tottakai',
      phone: '9039824093'
    }
  ]) 

  const [newPerson, setNewPerson] = useState({ id: null, name: '', phone: '' })
  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const addNewNumber = (event) => {
    event.preventDefault();

    const isDuplicate = persons.some(person => person.name === newPerson.name);

    if (isDuplicate) {
      alert(`${newPerson.name} is already added to phonebook.`);
      setNewPerson({ id: null, name: '', phone: '' });
      return;
    }

    const maxId = persons.reduce((max, person) => (person.id > max ? person.id : max), 0);
    const newId = maxId + 1;

    const newPersonWithId = { ...newPerson, id: newId };

    setPersons([...persons, newPersonWithId]);
    setNewPerson({ id: null, name: '', phone: '' });
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Title text={'Phonebook'} />
      <Search handleSearchInput={handleSearchInput} />

      <Title text={'add a new'} />
      <PersonForm 
        addNewNumber={addNewNumber}
        handleInputChange={handleInputChange}
        newPerson={newPerson}
      />

      <Title text={'Numbers'} />
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App