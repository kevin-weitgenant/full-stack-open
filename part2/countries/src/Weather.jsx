export function Weather({capital, weatherInfo}){

    const isEmpty = Object.values(weatherInfo).every(x => x === null || x === '');

    if (!isEmpty){

        return(
        <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weatherInfo.temperature} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}></img>
        <p>wind {weatherInfo.wind}m/s</p>
        </div>
        )

    }

}   