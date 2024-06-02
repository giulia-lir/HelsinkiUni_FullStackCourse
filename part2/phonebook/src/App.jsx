import { useState, useEffect } from 'react'
import PersonService from './services/PersonsService'
import Title from './components/Title'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

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
  const [notificationState, setNotificationState] = useState({ message: null, type: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const setNotification = (message, type, duration = 5000) => {
    setNotificationState({ message, type });
    setTimeout(() => {
      setNotificationState({ message: null, type: '' });
    }, duration);
  };

  const addNewNumber = (event) => {
    event.preventDefault();

    const isDuplicate = persons.find(person => person.name === newPerson.name);

    if (isDuplicate) {
      const confirmUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...isDuplicate, number: newPerson.number };
  
        PersonService
          .update(isDuplicate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            ));
            setNotification(`Note '${newPerson.name}' was changed`, 'success');
          })
          .catch(() => {
            setNotification(`Note '${newPerson.name}' was already removed from server`, 'error')
            setPersons(persons.filter(person => person.name !== newPerson.name));
          });
      }
      setNewPerson({ id: '', name: '', number: '' });
    } else {
      const maxId = persons.reduce((max, person) => (parseInt(person.id) > max ? parseInt(person.id) : max), 0);
      const newId = maxId + 1;
  
      const newPersonWithId = { ...newPerson, id: newId.toString() };
  
      PersonService
        .add(newPersonWithId)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Note '${newPerson.name}' was added`, 'success')
        })
      setNewPerson({ id: '', name: '', number: '' });
    }
  };

  const removePerson = ( id, name ) => {
    if (window.confirm(`Delete ${name} ?`)) {
      PersonService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(() => {
          setNotification(`Note '${name}' was already removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id));
        });
    }
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
      <Notification message={notificationState.message} type={notificationState.type} />
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