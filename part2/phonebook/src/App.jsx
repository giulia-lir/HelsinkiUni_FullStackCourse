import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '04599746985',
    }
  ]) 

  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const addNewNumber = (event) => {
    event.preventDefault();

    const isDuplicate = persons.some(person => person.name === newPerson.name);

    if (isDuplicate) {
      alert(`${newPerson.name} is already added to phonebook.`);
      setNewPerson({ name: '', phone: '' });
      return;
    }

    setPersons([...persons, newPerson]);
    setNewPerson({ name: '', phone: '' });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNumber}>
        <div>
        name: <input name="name" value={newPerson.name} onChange={handleInputChange} />
        </div>
        <div>
          number: <input name="phone" value={newPerson.phone} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}</div>
    </div>
  )
}

export default App