import { RoutesInput } from "../types/route"
import SignIn from "../services/sign-in"
import SignUp from "../services/sign-up"
import SignOut from "../services/sign-out"
import SecreteMessage from "../services/secrete-message"
import ResetPassword from "../services/reset-password"
export default ({ app }: RoutesInput) => {
  
  app.post("/api/sign-in", async (req, res) => {
    SignIn(req, res)
  })

  app.post("/api/sign-up", async (req, res) => {
    SignUp(req, res)
  })

  app.post("/api/sign-out", async (req, res) => {
    SignOut(req, res)
  })

  app.post("/api/reset-my-password", async (req, res) => {
    ResetPassword(req, res)
  })

  app.get("/api/secrete-message", async (req, res) => {
    SecreteMessage(req, res)
  })
}