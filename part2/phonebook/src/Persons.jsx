const Persons = ({persons}) => persons.map(x => <div key={x.id}>{`${x.name} ${x.number}`}</div>)






export default Persons 