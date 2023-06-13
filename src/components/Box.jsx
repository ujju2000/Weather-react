
import React , {useState, useEffect} from 'react'

export default function Box() {
    const [city, setCity] = useState("ghaziabad");
    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect( () => {
    const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e82fa87a29919d5f377ffcfea701fd92&units=metric`;
     
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const res = await response.json();
            if(response.ok) setWeatherInfo(res)
            else console.log(res.message);
        }
        catch(err) {
            console.error(err);
        }
    }
    if(city) fetchData(url);
    },[city]);
  
  return (
    
    <div className = 'box'>
        <div className="top">
          <img className = 'logo' src="assets/logo.png" alt="" />
          <h1 className = 'title'>Weather Forecast</h1>
        </div>

        <input 
          className = 'cityInput' 
          type="text"  
          placeholder = 'Enter a city....'
          value = {city}
          onChange = {(event) => setCity(event.target.value)}
          />
          
          {weatherInfo && <div className="bottom">
          {console.log(weatherInfo)}
            <h3 className='title'>{weatherInfo.name}</h3>
            <h4 className='desc'>{weatherInfo.weather[0].description}</h4>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="" />
            <h2 className = 'temp'>{weatherInfo.main.temp}</h2>

            <p className="min_max">min : {weatherInfo.main.temp_min} || max : {weatherInfo.main.temp_max}</p>
          </div>}
    </div>
  )
}
