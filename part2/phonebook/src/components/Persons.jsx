const Persons = ( {filteredPersons} ) => {
    return (
        <div>
            {filteredPersons.map(person => (
                <div key={person.id}>
                {person.name} {person.phone}
                </div>
            ))}
        </div>)}

export default Persons