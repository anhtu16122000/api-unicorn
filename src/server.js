import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes'
import dotenv from 'dotenv'
import connectDB from './config/connectDB'
import { __express } from 'ejs'
import cookieParse from 'cookie-parser'
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParse())

configViewEngine(app)
initWebRoutes(app)

connectDB()


const port = process.env.PORT || 6969

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})