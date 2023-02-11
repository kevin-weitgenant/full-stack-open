import { useState,useEffect } from 'react'
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'
import service from './services/service.js'
import './App.css'
import Status from './Status'


const App = () => {
  
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [filteredNumbers, setfilteredNumbers] = useState('')

  const [status, setStatus] = useState(null)



  useEffect(() => {
  service.getPersons().then(response => {
    setPersons(response.data)})
  },[])
  
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

    const update = () => {
      if (window.confirm(`update ${newName}?`)) {  
        let person = persons.find(x => x.name === newName )
        let updatedPerson = {...person, number: newNumber}
        service.updatePerson(updatedPerson)
                            .then(response =>{
                              setPersons(persons.map(x => x.id != updatedPerson.id ? x:response.data ))
                              statusUpdate(`Updated ${updatedPerson.name} number`, false)
                            })
                            .catch(error => statusUpdate(`Information of ${newName} has already been removed from server`, true))
      }
    }


    const statusUpdate = (message, error) =>{
      console.log('message = ',message,'error = ',error);
      setStatus({message, error})
      setTimeout(() => {setStatus(null)},5000)
    }

    


    names.includes(newName) ? update():
                            service.create({name: newName,number: newNumber})
                            .then(response => {
                              const {name, number,id} = response.data
                              setPersons(persons.concat({name,number,id}))
                              statusUpdate(`Added ${newName}`, false)

                            })
                            .catch(error => {statusUpdate(error.response.data.error, true)}) 
    setNewName('')
    setNewNumber('')
  }


  const deleteHandler = (event)=>{

    let buttonID = event.currentTarget.id;
    let name = event.currentTarget.name;

    if (window.confirm(`Delete ${name}?`)) {
      
    service.deletePerson(buttonID).then((response)=> {   
      setPersons(persons.filter(x => x.id !=buttonID ))
    })
    }  
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Status status = {status}/>
      <Filter filterString = {filterString} filterHandler = {filterHandler} /> 
      {/* must definitely have better ways to pass this props to Form */}
      
      <Form submitHandler = {submitHandler} newName = {newName} newNameHandler = {newNameHandler} newNumber = {newNumber}
          newNumberHandler = {newNumberHandler} ButtonHandler = {ButtonHandler}/>    
      
      <h2>Numbers</h2>
      {filterString.length == 0 ? <Persons persons = {persons} deleteHandler = {deleteHandler}/> : <Persons persons = {filteredNumbers} deleteHandler= {deleteHandler}/>}
    </div>
  )
}

export default App