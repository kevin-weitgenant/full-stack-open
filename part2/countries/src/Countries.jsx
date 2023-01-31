import CountryInfo from "./CountryInfo";





const Countries = ({countries,json,filterString, showHandler}) =>{
    
    const listTodiv = (list) => list.map(x=> <div key={x}> {x}  <button key={x} id={x} onClick= {showHandler}>show</button></div> )
    
    
    if (countries.length == 0 ) {
        
        return null}

    if (countries.length == 1) {
        return (<CountryInfo json = {json.filter(x => x['name']['common'].toLowerCase().startsWith(filterString.toLowerCase()))[0]} /> )
    }
    
    if (countries.length <=10){
    return(listTodiv(countries))
    }

    if (countries.length >11){
        return(<p>Too many matches, specify another filter</p>)
    }

}

export default Countries

