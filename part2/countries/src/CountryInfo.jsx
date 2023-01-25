const CountryInfo = ({json})=>{
    
    console.log(json);

 


    return(
    <div> 
        <h2>{json['name']['common']}</h2>
        <div>capital {json['capital'][0]} </div>
        <div>area {json['area']} </div>
        <br></br>
        <b>languages:</b>

        <ul>
            {Object.values(json['languages']).map((x,i)=> <li key= {i}> {x}</li>)}
        </ul>

        <div> <img src={Object.values(json['flags'])[0] } alt="" /></div>

    </div>
    )
}



export default CountryInfo