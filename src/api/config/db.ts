import mongoose from "mongoose"
type DBInput = {
  db: string,
}
export default async ({ db }: DBInput) => {
  const connect = () => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(db, {})
        .then(() => {
          resolve(console.info(`Successfully connected to ${db}`))
        })
        .catch(err => {
          console.error(`Error connecting to database :`, err)
          reject(process.exit(1))
        })
      })
  }
  await connect()
  mongoose.connection.on("disconnected", connect)
}