import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import connect from "./config/db"
import routes from "./routes"
import SignIn from "./services/sign-in"
import createServer from "./utils/server"

async function ExpressApp(){
  
  const app = await createServer();

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
  })
}

ExpressApp()