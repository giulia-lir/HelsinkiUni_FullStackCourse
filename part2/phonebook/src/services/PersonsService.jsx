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

const remove = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${url}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const Persons = { getAll, add, remove, update }
export default Persons