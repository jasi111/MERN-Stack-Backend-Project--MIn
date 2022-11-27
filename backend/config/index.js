import dotenv from 'dotenv'


dotenv.config()
// creating the variable and calling the value from .env
const config ={
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY || "30d"
}



export default config