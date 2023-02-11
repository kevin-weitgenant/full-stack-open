const Persons = ({persons,deleteHandler}) => {
    return(
    
    typeof(persons) == 'object' ?
        persons.map(x => <div key={x.id}>{`${x.name} ${x.number}`}
                <button onClick={deleteHandler} id = {x.id} name = {x.name}>delete</button>
                </div>) : null )
}





export default Persons 