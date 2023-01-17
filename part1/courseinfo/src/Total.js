const Total = ({parts}) =>{
    
    var teste = <p>Number of exercises {parts.reduce(function (a,b) {
        return a + b.exercises;
    },0)} </p>

    console.log('teste = ', teste);

    return teste

}

export default Total;