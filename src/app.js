// console.log(__dirname)
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


//define paths for express
const publicpath=path.join(__dirname, '../public')
const viewspath=path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname, '../templates/partials')

const app=express()
//setup static directory to serve
app.use(express.static(publicpath))

//setup handlebars position and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather APP',
        name:'Himanshu'

    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About Me',
        name:'Himanshu Mishra'

    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help Forum',
        helptext:'lorem impsum is a heavy guy with  a lot of money in his pockets and a brand new car which he bought for his wife on the occasion of diwali',
        name:"Himanshu Mishra"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:"Help article not found"
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title:"Page Not found"
    })
})

app.listen(3000, ()=>{
    console.log('Server up and running!')
})