const Total = ({exercises}) =>{
    return (<p>Number of exercises {exercises.reduce(function (a, b) {
        return a + b;
    })} </p> )

}

export default Total;