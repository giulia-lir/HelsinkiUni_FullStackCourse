const Persons = ( {filteredPersons, removePerson} ) => {
    return (
        <div>
            {filteredPersons.map(person => (
                <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => removePerson(person.id, person.name)}>delete</button>
                </div>
            ))}
        </div>)}

export default Persons