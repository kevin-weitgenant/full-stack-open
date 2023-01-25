import axios from 'axios'


const baseUrl = 'https://restcountries.com/v3.1/all'

const getCountries = () => axios.get(baseUrl)



export default {getCountries}