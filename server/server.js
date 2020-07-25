import config from "../config/config"
import app from "./express"
import mongoose from "mongoose"
import bidding from "./controllers/bidding.controller"
mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false    
})

mongoose.connection.on("error",() => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

const server = app.listen(config.PORT,err =>{
    if(err){
        console.log(err)
    }
    console.info("Server started on port %s",config.PORT)
})
bidding(server)