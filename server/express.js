import path from "path"
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import compress from "compression"
import cors from "cors"
import helmet from "helmet"
import Template from "../template"

// For SSR functionality
import React from "react"
import ReactDOMServer from "react-dom/server"
import StaticRouter from "react-router-dom/StaticRouter"
import MainRouter from "../client/MainRouter"
import {ServerStyleSheets,ThemeProvider} from "@material-ui/styles"
import theme from "../client/theme"

import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import courseRoutes from "./routes/course.routes"
import enrollmentRoutes from "./routes/enrollment.routes"

// import devBundle from './devBundle'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()


IAcfdYhHX3Ixjh0u
// Only for development
// devBundle.compile(app)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())


app.use("/",enrollmentRoutes)
app.use("/",userRoutes)
app.use("/",authRoutes)
app.use("/",courseRoutes)
app.use("/dist",express.static(path.join(CURRENT_WORKING_DIR,
    'dist')))

// app.get("/",(req,res) => {
//     return res.status(200).send(Template())
// })

app.get("*",(req,res) => {
    // Upon a new Request a new stylesheets is generated
    const sheets = new ServerStyleSheets()
    const context = {}
    // This render a react element to it's initial html form
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
            // This is a stateless router used to sync the
            // url address on the backend to the frontend
            <StaticRouter location={req.url}
             context={context}>
                {/* This make our styles available to our components */}
                 <ThemeProvider theme={theme} >
                     <MainRouter/>
                 </ThemeProvider>
            </StaticRouter>
        )
    )
    // Used to check if there is a redirect 
    if(context.url){
        return res.redirect(303,context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
        markup:markup,
        css:css
    }))
})

app.use((err,req,res,next) => {
    if(err.name ==="UnauthorizedError"){
        res.status(401).json({"error":err.name + ": " + err.message})
    }else if(err){
        res.status(400).json({"error":err.name + ": " + err.message})
    }
})

export default app