const request = require("request")

// const url = "http://api.weatherstack.com/current?access_key=bd3663f18bfd56cef2ff19a8419e4d61&query=37.8267,-122.4233&units=f"


//                               //lower level | response for bad queries
// request({url: url,json:true}, (error,response)=>{
//     if (error)
//     {
//         console.log("unable to connect")
//     } else if(response.body.error){
//         console.log("bad query")
//     }else{
//     console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature +" degrees out. There is a " + response.body.current.precip + "% chance of rain")
//     }
// })

const forecast = (lat,long,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bd3663f18bfd56cef2ff19a8419e4d61&query=" + lat +',' +long+"&units=f"
    request({url,json:true}, (error,{body}) => {
        if(error){
            callback("no internet connection",undefined)
           // console.log("no internet connection")
        } else if(body.error){
            callback("bad query. try again", undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +" degrees out. It feels like " +body.current.feelslike+ " degrees out. There is a " + body.current.precip + "% chance of rain. The Humidity is " +body.current.humidity +".")
            //console.log(response)
        }
    })
}

module.exports = forecast