import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

// cors make it secure in sending request to backend like controls who can send requesst to backend


// morgan logger
// morgan prints information of api response and request in console
app.use(morgan('tiny'))
// tiny is the method of morgan


export default app