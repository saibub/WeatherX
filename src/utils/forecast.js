const request=require('request')
// const chalk=require('chalk')

const forecast=(longitude,latitude, callback)=>{

    const url='http://api.weatherstack.com/current?access_key=4810fba584c4e18d9fd985571b2c8009&query='+longitude+' , '+latitude+''
    request({url:url,json:true,},(error,response)=>{
        if(error){
            callback('Unable tp connect', undefined)

        }else if(response.body.error)
    {
        callback('Not able to find location', undefined)
    }else{
        callback(undefined, response.body.current.weather_descriptions[0]+ ", It is currently " + response.body.current.temperature+ " degree but kinda feels like "+ response.body.current.feelslike+" degree!")
    }
    })
}

module.exports=forecast