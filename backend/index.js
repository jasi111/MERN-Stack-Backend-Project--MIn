import mongoose from "mongoose"
import app from "./app.js"
import config from "./config/index"


// as soon as this app runs connect to database
// For that
// 1. create a function
// 2. Run a function

// ()()
// 
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED")

        app.on("error", (err) =>{
            console.log("ERROR:", err);
            throw err;
        })

        const onListening =() =>{            
        console.log(`Listening on ${config.PORT}`)
            }
        
        app.listen(config.PORT, onListening)

    } catch (err) {
        console.log("ERROR", err);
        throw err
        
    }
// learn express event -event listeners
})

()