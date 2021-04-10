const request=require('request')

//GEOCODING
// const geoCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGhpaW1hYW5zaHUiLCJhIjoiY2ttcnZjcnVhMGJ1YTJ3bnhwOHM1bWloZiJ9.1YyK8ChAzwO1-855SrbAKQ&limit=1'

// request({url:geoCodeUrl, json:true}, (error,response)=> {

//     if(error)
//     {
//         console.log('Not able to connect')
//     }else if(response.body.features.length===0)
//     {
//         console.log('location not found')
//     }else
//     {
//         const latitude=response.body.features[0].center[1]
//         const longitude=response.body.features[0].center[0]

//         console.log(longitude, latitude)
//     }

// })

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGhpaW1hYW5zaHUiLCJhIjoiY2ttcnZjcnVhMGJ1YTJ3bnhwOHM1bWloZiJ9.1YyK8ChAzwO1-855SrbAKQ&limit=1'
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode