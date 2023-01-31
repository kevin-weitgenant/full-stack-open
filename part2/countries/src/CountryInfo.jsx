import service from "./services/service"
import { useEffect, useState } from 'react';
import { Weather } from "./Weather";

const CountryInfo = ({json})=>{
    

    const [weatherInfo, setWeatherInfo] = useState({wind : '', temperature: '', icon:''})



    if (!json){return null}   // I think that I could prevent to have to check this 
                              // probably happening because of delay in updating the countrie variable in Countries.jsx

    console.log("country info = ", json);

    const getLatLong = ()=>{
        let lat,lon = json['capitalInfo']['latlng']
        return (lat,lon)
    }
 

    // response.data['wind']['speed']

    useEffect(() => {
        let [lat,lon] = getLatLong();
        service.getWeather(lat,lon).then(response => {
        let info = response.data
        console.log("info = ", info);
        
        setWeatherInfo({wind: info['wind']['speed'], temperature: info['main']['temp'], icon: info['weather'][0]['icon']})
        console.log("logzao aqui", weatherInfo);
        })},[])

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
        <Weather capital={json['capital'][0]} weatherInfo = {weatherInfo}> </Weather>
        
    </div>  
    )
}



export default CountryInfo