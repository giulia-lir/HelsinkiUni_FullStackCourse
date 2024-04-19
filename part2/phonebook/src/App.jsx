import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('Add a new contact')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: newName
    }
    const isDuplicate = persons.some(person => person.name === newNameObject.name);

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }
    setPersons(persons.concat(newNameObject))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
    </div>
  )
}

export default App