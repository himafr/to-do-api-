const express = require("express");
const bodyParser=require("body-parser")
const cors=require("cors")
const morgan = require('morgan');
const todoRoute=require('./router/todoRoute')
const userRoute=require('./router/userRoute')
const app = express();
const AppError=require('./utils/appError')
const globalErrorControllers=require('./controllers/errorController');
const authControllers=require('./controllers/authController')
// middlewares 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req,res,next)=>{
//   req.dateTime=new Date().toLocaleTimeString();
//   next();
// });
 
app.use(morgan('dev'))

//Routes
app.use("/api/v1/todo",authControllers.protect,todoRoute);
app.use("/api/v1/users",userRoute);

app.all("*",(req,res,next)=>{
next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorControllers)

module.exports=app