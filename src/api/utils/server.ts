import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import connect from "../config/db"
import routes from "../routes"

async function createServer(): Promise<Application> {
  return new Promise(async (resolve, reject) => {
  const app: Application = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get("/", (req: Request, res: Response) => {
    res.send("TS App is Running")
  })
  
  const db = process.env.DB_CONNECTION

  if (!db) {
    console.log("DB connection string not found")
    process.exit(1)
  }

  routes({ app })
  await connect({ db })
  resolve(app);
})
}

export default createServer;