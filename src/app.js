const path = require('path')

const express = require('express')
const hbs = require('hbs') // for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for express cofig
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()  
const port = process.env.PORT || 3000//environment variable for heroku

//setup handlebars and views location
app.set('view engine', 'hbs') //set up handlebars
app.set('views',viewsPath) //views path
hbs.registerPartials(partialsPath)

//set up static direcotry to server
app.use(express.static(publicDirectoryPath))


//domain routing 

app.get('',(req,res) => {
    res.render('index',{
        title: "weather app",
        name: "richard le"
    })
})

//somehow knows how to get to views
app.get('/about',(req,res)=> {
    res.render('about', {
        title:"weather",
        name:"richard le"
    })
})

app.get('/help', (req,res)=> {
    res.render('help',{
        help: "you need help",
        title: "help",
        name: "richard le"
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"you must provide search term."
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error: "no address provided"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
      //  console.log(latitude,longitude)
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})

app.get("/help/*",(req,res)=>{
    res.render('error',{
        title:'404',
        name:"richard le",
        errorMessage: "help article not found",
    })
})

app.get("*",(req,res)=>{
    res.render('error',{
        title: '404',
        name : "richard le",
        errorMessage: "Page not found",
    })
})


app.listen(port, ()=>{
    console.log("server is up on port" + port)
})

