import CountryInfo from "./CountryInfo";





const Countries = ({countries,json,filterString, showHandler}) =>{
    
    const listTodiv = (list) => list.map(x=> <div key={x}> {x}  <button key={x} id={x} onClick= {showHandler}>show</button></div> )
    
    
    if (countries.length == 0) {
        return null}

    if (countries.length == 1) {
        return (<CountryInfo json = {json.filter(x => x['name']['common'].startsWith(filterString))[0]} /> )
    }
    
    return(listTodiv(countries))
}

export default Countries

