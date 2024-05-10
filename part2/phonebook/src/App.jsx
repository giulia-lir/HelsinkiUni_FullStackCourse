import { useState, useEffect } from 'react'
import axios from 'axios'
import Title from './components/Title'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [newPerson, setNewPerson] = useState({ id: null, name: '', number: '' })
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
      setNewPerson({ id: null, name: '', number: '' });
      return;
    }

    const maxId = persons.reduce((max, person) => (person.id > max ? person.id : max), 0);
    const newId = maxId + 1;

    const newPersonWithId = { ...newPerson, id: newId };

    setPersons([...persons, newPersonWithId]);
    setNewPerson({ id: null, name: '', number: '' });
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