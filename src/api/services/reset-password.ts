import { verifyToken } from "../utils/jwt";
import signedInUsers from "../model/signed-in-users.model";
import User from "../model/user.model";
import bcrypt from "bcryptjs";

export default async function ResetPassword(req: any, res: any) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      res.status(401).send({
        message: "UnAuthorized",
        status: false
      })
    }
    const payload = await verifyToken(token);

    if (!payload) {
      res.status(401).send({
        message: "UnAuthorized",
        status: false
      });
    }

    var isSignedIn = await signedInUsers.findOne({
      email: payload.email
    })
    if(!isSignedIn) {
      res.status(401).send({
        message: "UnAuthorized",
        status: false
      });
    }
    const newPassword = req.body.password;
    const newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
    const user = await User.findOneAndUpdate({
      email: payload.email
    },{
      password: newEncryptedPassword
    })
    res.status(200).send({
      message: "Password updated successfully",
      status: true
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      status: false
    });
  }
}