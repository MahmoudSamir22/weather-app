const request = require('request');


const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibWVuYXRvMjIiLCJhIjoiY2t1N2pyZjJ1MDkxMDJ3bnpwa3Zvb3I3MSJ9.1Hh0XA7psF9nkNg8L2tMEA&limit=1`
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to get the currnt location', undefined)
        } else if (body.features.length === 0){
            callback('Please Enter an Invaled name', undefined)
        } else {
            const coordinates = body.features[0].geometry.coordinates;
            callback(undefined, {
                longitude: coordinates[0],
                latitude: coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode