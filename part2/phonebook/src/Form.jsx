const Form = ({submitHandler,newName,newNameHandler,newNumber,newNumberHandler,ButtonHandler}) => 
{
    return( <form onSubmit={submitHandler}>
        <div>name: <input value = {newName} onChange = {newNameHandler}  /> </div>
        <div>number: <input value = {newNumber} onChange = {newNumberHandler} /></div>
        <div><button type="submit" onClick={ButtonHandler}>add</button> </div>
      </form>)
}






export default Form 