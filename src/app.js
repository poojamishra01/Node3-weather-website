const path=require('path')
const express=require('express')
const hbs=require('hbs')//for partials
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()//express application
const port=process.env.PORT || 3000
//for serving a directory ,it configures our express application
//define path for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')//to handlebars setup
app.set('views',viewPath)//to setup views location
hbs.registerPartials(partialsPath)

//setup satic directory to serve
app.use(express.static(publicdirectorypath));

//routing
app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'pooja mishra'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'pooja mishra',
        title:'About Me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'pooja mishra',
        title:'Help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return  res.send({
            error:'Please provide address '
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
           return  res.send({error})
        }
        //const {longitude,latitude,location}=data
        forecast(longitude,latitude,(error,forecastdata)=>{
            if(error)
            {
            return res.send({error})
            }
            const {weather,temperature,feelslike}=forecastdata
            const forecast=weather+'. Temperature is '+temperature+' but it feels like '+feelslike+'.'
            res.send({
                forecast,
                location,
                address:req.query.address
            })
        })
    })
   
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article Not Found ',
        name:'pooja mishra'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page Not Found',
        title:'404',
        name:'pooja mishra'
    })
})

app.listen(port,()=>{
    console.log("server up on port: "+port )
})