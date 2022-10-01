import fetch from 'cross-fetch';
import { key } from './API_Key.js';
// good video https://www.youtube.com/watch?v=T4MQrRDo20w

//https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=12345

async function handler(event) {
    console.log(`lambda event ${JSON.stringify(event, null, 4)}`)
    const location = event.pathParameters.locationName;
    //
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},uk&units=metric&appid=${key}`, {
        method: 'GET'
    });
    const resultBody = await result.json();
    const cod = { resultBody };
    //
    if (cod === '404') {
        throw new Error('bad location given');
    }    
    const weather = resultBody.weather[0].main;
    const temp = resultBody.main.temp;
    console.log(`result: ${JSON.stringify(resultBody, null, 4)}`)
    const locationObject = { location, weather, temp };

    //
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        //{'customerId': location, 'customerName': "Customer " + location }
        body: JSON.stringify(locationObject),
    };
};

export { handler }
