import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt";
import signedInUsers from "../model/signed-in-users.model";
import User from "../model/user.model";
import { IUser } from "../model/user.model";

export default async function SignUp(req: any, res: any) {
  try {
    
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    console.log(encryptedPassword);
    
    const existingUser = await User.findOne({
      email,
    })
    
    if (existingUser) {
      throw new Error("User already exists");
    }
    
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: encryptedPassword,
    })
    
    if(!user) {
      throw new Error('User not found')
    }
   
    const response = {
      message: "User created successfully",
      status: true
    }

    res.status(201).send(response);

  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
}