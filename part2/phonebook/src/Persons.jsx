const Persons = ({persons,deleteHandler}) => persons.map(x => <div key={x.id}>{`${x.name} ${x.number}`}
                <button onClick={deleteHandler} id = {x.id}>delete</button>
                </div>)






export default Persons 