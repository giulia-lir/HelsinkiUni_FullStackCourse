import { useState, useEffect } from 'react'
import PersonService from './services/PersonsService'
import Title from './components/Title'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newPerson, setNewPerson] = useState({ id: '', name: '', number: '' })
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
      setNewPerson({ id: '', name: '', number: '' });
      return;
    }

    const maxId = persons.reduce((max, person) => (parseInt(person.id) > max ? parseInt(person.id) : max), 0);
    const newId = maxId + 1;

    const newPersonWithId = { ...newPerson, id: newId.toString() };

    PersonService
      .add(newPersonWithId)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setNewPerson({ id: '', name: '', number: '' });
  };

  const removePerson = ( id ) => {
    PersonService
      .remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
  }

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
      <Persons
        filteredPersons={filteredPersons}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App