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
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports=forecast