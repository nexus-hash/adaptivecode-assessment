import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt";
import signedInUsers from "../model/signed-in-users.model";
import User from "../model/user.model";

/**
 * 
 * @param req 
 * @param res 
 * @description This function is used to sign-in the user
 * @returns {Promise<void>}
 */
export default async function SignIn(req: any, res: any) {
  try {
    if(!req.body.email || !req.body.password) {
      throw new Error('Email or password is missing')
    }
    const email = req.body.email;
    const user = await User.findOne({
      email,
    })
    if(!user) {
      throw new Error('User not found')
    }
    console.log(user)
    if (bcrypt.compareSync( req.body.password as string, user.password as string)) {
      const token = generateToken({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      });
      await signedInUsers.create({
        email: user.email,
      })
      res.status(200).send({
        token,
        status: true,
        message: "User signed in successfully",
      });
    }
    else {
      res.status(401).send({
        message: "Invalid credentials",
        status: false
      })
    }
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
}