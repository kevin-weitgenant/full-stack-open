import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl)

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }



  export default {getPersons,create}