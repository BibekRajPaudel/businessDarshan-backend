const app = require("./app")

cors = require("cors");

app.use(cors());
const dotenv = require("dotenv") 
const connectDatabase = require("./config/database")


//Config
dotenv.config({path:"backend/config/config.env"}) 

//Connecting database
connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Handle uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(err, "errr")
    console.log(`Error:${err.message}`)
    console.log("Shutting down due to the unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
})
})


//Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down due to the unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
})

})