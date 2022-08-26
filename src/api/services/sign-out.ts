import bcrypt from "bcryptjs"
import { generateToken, verifyToken } from "../utils/jwt";
import signedInUsers from "../model/signed-in-users.model";

export default async function SignOut(req: any, res: any) {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const payload = await verifyToken(token);
    
    if(!payload) {
      res.status(401).send({
        message: "UnAuthorized",
        status: false
      })
    }
    
    await signedInUsers.findOneAndDelete({
      email: payload.email
    })
    
    res.status(200).send({
      message: "User signed out successfully",
      status: true
    })

  } catch (error: any) {

    res.status(500).send({
      message: "Something went wrong",
      status: false
    });
  }
}