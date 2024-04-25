import { useState } from 'react'

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
    console.log(event.target.value)
  }
  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleSearchInput} />
      <h2>add a new</h2>
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
      <div>{persons.map(person => <div key={person.id}>{person.name} {person.phone}</div>)}</div>
    </div>
  )
}

export default App