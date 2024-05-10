const PersonForm = ( {addNewNumber, handleInputChange, newPerson} ) => {
    return(
        <div>
            <form onSubmit={addNewNumber}>
                <div>
                name: <input name="name" value={newPerson.name} onChange={handleInputChange} />
                </div>
                <div>
                number: <input name="number" value={newPerson.number} onChange={handleInputChange} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>

        </div>
    )
}

export default PersonForm