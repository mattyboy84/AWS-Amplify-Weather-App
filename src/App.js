import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const myAPI = "api46b44044"
const path = '/location'; 

const App = () => {
  const [input, setInput] = useState("")
  const [locations, setLocations] = useState([])

  //Function to fetch from our backend and update customers array
  function getLocation(e) {
    let location = e.input
    API.get(myAPI, path + "/" + location)
       .then(response => {
         console.log(`api response ${JSON.stringify(response, null, 4)}`);
         let newLocations = [...locations]
         newLocations.push(response)
         setLocations(newLocations)

       })
       .catch(error => {
         console.log(error)
       })
  }

  return (
    
    <div className="App">
      <h1>Get Weather Info</h1>
      <div>
          <input placeholder="Location" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getLocation({input})}>Get Location Info</button>

      <h2 style={{visibility: locations.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       locations.map((thisLocation, index) => {
         return (
        <div key={thisLocation.location}>
          <span><b>Location:</b> {thisLocation.location} - <b>Weather</b>: {thisLocation.weather} - <b>Temp</b>: {thisLocation.temp}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;