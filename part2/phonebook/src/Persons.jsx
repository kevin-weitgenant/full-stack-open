const Persons = ({persons}) => persons.map(x => <div key={x.name}>{`${x.name} ${x.number}`}</div>)






export default Persons 