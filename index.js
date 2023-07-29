const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const dbConfig=require('./config/dbConnection')
const { RoutesLoader } = require('expressjs.routes.autoload');
dotenv.config()
dbConfig()
const app=express()
app.use(express.json())
app.use(RoutesLoader(path.join(__dirname, './routes'), true));
app.set('port',process.env.port)
app.set('host',process.env.host)
app.listen(app.get('port'),()=>{
    console.log("app is running at the port number",app.get('port'))
})