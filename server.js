const mongoose=require('mongoose')
process.env.NODE_ENV='development'

process.on('uncaughtException',err=>{
    console.log("UNCAUGHT EXCEPTION!!!",err.message);
    process.exit(1)  
})
require('dotenv').config({path:'./config.env'})
const app=require('./app')

mongoose.connect(process.env.MONGODB_URI).then(
    ()=>console.log('database is connected')
)
port = process.env.PORT;
const server =app.listen(port, () => console.log(`app running on ${port}....`));
process.on('unhandledRejection',err=>{
    console.log("UNHANDLED REJECTION!!!",err.message);
    server.close(()=>{
        process.exit(1)
    })
})
