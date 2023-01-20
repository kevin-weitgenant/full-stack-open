const Total = ({parts}) =>{
    
    let total = parts.reduce(function (a,b) {
        return a + b.exercises;
    },0)
    
    return (<p>Number of exercises {total}</p>)

}

export default Total;