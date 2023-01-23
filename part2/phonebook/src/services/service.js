import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl)

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const updatePerson = updatedObject => axios.put(`${baseUrl}/${updatedObject.id}`,updatedObject)


export default {getPersons,create, deletePerson, updatePerson}