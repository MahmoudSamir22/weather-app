const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast= require('./util/forecast')


const app = express();

const port = process.env.PORT || 3000

//path for the views and public files
const publicFiles = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicFiles))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mahmoud'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'Mahmoud'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }else {
            forecast(data.longitude, data.latitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }else {
                    res.send({
                        temp: forecastData.temp,
                        hum: forecastData.hum,
                        location: data.location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/products' , (req, res) => {
    if (!req.query.search){
        res.send({
            error: 'You must enter data to search'
        })
    }else{
        res.send({
            products:[]
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage: 'Help Artical not found',
        name:'Mahmoud'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage: '404 page not found',
        name: 'Mahmoud'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
