import axios from 'axios'

let API_KEY = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://restcountries.com/v3.1/all'

const getCountries = () => axios.get(baseUrl)
const getWeather = (lat,lon) => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)


export default {getCountries,getWeather}