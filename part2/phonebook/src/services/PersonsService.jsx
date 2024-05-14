import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const add = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const Persons = { getAll, add }
export default Persons