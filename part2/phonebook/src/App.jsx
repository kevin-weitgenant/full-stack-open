import { useState } from 'react'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')


  const submitHandler = (event) =>{
    event.preventDefault()
  }

  const newNameHandler = (event)=>{
    setNewName(event.target.value)

  }
  

  const getNames = () => persons.map(x => x.name)

  const ButtonHandler = ()=>{ 
    let names = getNames()
    names.includes(newName) ? alert("Nome já existe"): setPersons(persons.concat({name: newName})) 
    setNewName('')
  }

  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value = {newName} onChange = {newNameHandler}  />
        </div>
        <div>
          <button type="submit" onClick={ButtonHandler}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => <p key={x.name}>{x.name + '\n'}</p>)}
    </div>
  )
}

export default App