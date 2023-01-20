import { useState,useEffect } from 'react'
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'
const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [filteredNumbers, setfilteredNumbers] = useState('')


  
  const getNames = () => persons.map(x => x.name)   //aux
  // const getNumbers = () => persons.map(x => x.number)   //aux

  const filterHandler = (event) =>{
    setFilterString(event.target.value)  
  }


  useEffect(() => {

    let resultado = persons.filter((x) => {
      if (x.name.toLowerCase().startsWith(filterString.toLowerCase()) ){
        return   {name: x.name, number:x.number}
      }
    })

    
    console.log(resultado);
    setfilteredNumbers(resultado)
  }, [filterString])  


  
  const submitHandler = (event) =>{
    event.preventDefault()
  }

  const newNameHandler = (event)=>{
    setNewName(event.target.value)
  }
  
  const newNumberHandler = (event)=>{
    setNewNumber(event.target.value)
  }
  
  const ButtonHandler = ()=>{ 
    let names = getNames()

    names.includes(newName) ? alert("Nome já existe"): setPersons(persons.concat({name: newName, number: newNumber})) 
    setNewName('')
    setNewNumber('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterString = {filterString} filterHandler = {filterHandler} /> 
      {/* must definitely have better ways to pass this props to Form */}
      <Form submitHandler = {submitHandler} newName = {newName} newNameHandler = {newNameHandler} newNumber = {newNumber}
          newNumberHandler = {newNumberHandler} ButtonHandler = {ButtonHandler}/>    
      <h2>Numbers</h2>
      {filterString.length == 0 ? <Persons persons = {persons}/> : <Persons persons = {filteredNumbers}/>}
    </div>
  )
}

export default App