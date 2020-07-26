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

// Comment out before building for production
// import devBundle from './devBundle'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()



// Only for development
// devBundle.compile(app)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())


app.use("/dist",express.static(path.join(CURRENT_WORKING_DIR,
    'dist')))
app.use("/",userRoutes)
app.use("/",authRoutes)

// app.get("/",(req,res) => {
//     return res.status(200).send(Template())
// })

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        sheets.collect(
          <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
              <MainRouter />
            </ThemeProvider>
          </StaticRouter>
        )
      )
      if (context.url) {
        return res.redirect(303, context.url)
      }
      const css = sheets.toString()
      res.status(200).send(Template({
        markup: markup,
        css: css
      }))
  })
  
//This catches unauthorised errors
app.use((err,req,res,next) => {
    if(err.name ==="UnauthorizedError"){
        res.status(401).json({"error":err.name + ": " + err.message})
    }else if(err){
        res.status(400).json({"error":err.name + ": " + err.message})
    }
})

export default app