const Total = ({parts}) =>{
    
    let total = parts.reduce(function (a,b) {
        return a + b.exercises;
    },0)
    
    console.log(total);
    
    var test2 = <p>Number of exercises </p>

    console.log('test2 = ', test2);

    return test2

}

export default Total;