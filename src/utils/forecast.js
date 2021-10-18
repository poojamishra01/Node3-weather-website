//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a511efe7c28f26274f93abf5432baf73&query=' + longitude +','+ latitude
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('unable to connect to weather service!',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location!',undefined)
        }else{
            callback(undefined,{
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports=forecast