const Persons = ({persons,deleteHandler}) => persons.map(x => <div key={x.id}>{`${x.name} ${x.number}`}
                <button onClick={deleteHandler} id = {x.id} name = {x.name}>delete</button>
                </div>)






export default Persons 