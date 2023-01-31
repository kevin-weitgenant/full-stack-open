import { useState, useEffect } from 'react'
import Countries from './Countries.jsx'
import Form from './Form.jsx'
import service from './services/service.js'


function App() {
  
  
  
  const [countries, setCountries] = useState('')
  const [filterString, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState('')
  const [allCountries, setallCountries] = useState([])
  
  

  // get api/all data
  useEffect(() => {
    service.getCountries().then(response => {
    setCountries(response.data.map(x=> x['name']['common'])) 
    setallCountries(response.data)
    })},[])


  // const getCountries = (countriesAll) => countriesAll.length ==0 ? null : countriesAll.map(x=> x['name']['common']) 
  
  //stores input in >filterString< state
  const filterInput = (event) => {
    setFilter(event.target.value);
  }

  // filter countries that startwith filterString and  saves in filteredCountries state
  useEffect(()=> {
    
    if (filterString.length >0){
      setFilteredCountries(countries.filter(x => x.toLowerCase().startsWith(filterString.toLowerCase()))); 
    }
  },[filterString])


  const showHandler= (event) => {
    let aux = event.currentTarget.id;
    console.log("IGUAL A ",aux);
    setFilter(aux);
}




  return (
    <div>
      <Form filterInput = {filterInput} filterString = {filterString}/>
      {(filterString.length == 0) ? <Countries countries = {countries} showHandler = {showHandler}/> :<Countries countries = {filteredCountries} json = {allCountries} filterString = {filterString} showHandler = {showHandler}/>}
    </div>
  )
}

export default App
