import { useState,useEffect } from 'react'

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


  const filterAux = (x) => {
    if (x.name.startsWith(filterString) ){
      return   {name: x.name, phone:x.phone}
    }
  }

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
  }, [filterString])  // pass `value` as a dependency


  
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



  const NumbersComponent = () => persons.map(x => <div key={x.name}>{`${x.name} ${x.number}`}</div>)
  const FilteredNumbersComponent = () => filteredNumbers.map(x => <div key={x.name}>{`${x.name} ${x.number}`}</div>)

  console.log('num component =' + NumbersComponent())
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value = {filterString} onChange = {filterHandler}  /> </div>
      <form onSubmit={submitHandler}>
        <div>name: <input value = {newName} onChange = {newNameHandler}  /> </div>
        <div>number: <input value = {newNumber} onChange = {newNumberHandler} /></div>
        <div><button type="submit" onClick={ButtonHandler}>add</button> </div>
      </form>
      <h2>Numbers</h2>
      {filterString.length == 0 ? NumbersComponent() : FilteredNumbersComponent()}
    </div>
  )
}

export default App