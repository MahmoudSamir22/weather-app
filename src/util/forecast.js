const request = require('request');

const foreCast = (lon, lat, callback) =>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2fb7fd0d890f5efaad67cfe30ff6ce88&units=metric`;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to get data from the api', undefined)
        }else if(body.cod != 200){
            callback(body.message, undefined)
        }else {
            callback(undefined,{temp: body.main.temp, hum: body.main.humidity})
        }
    })
}

module.exports = foreCast;