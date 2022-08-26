import signedInUsers from "../model/signed-in-users.model";
import { verifyToken } from "../utils/jwt";

export default async function SecreteMessage(req: any, res: any) {
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

    var secretMessage = `${payload.firstName} ${payload.lastName} I scream, you scream, we all scream ice cream!`;

    res.status(200).send({
      message: secretMessage,
      status: true
    });
  } catch (error: any) {
    if(error.name === "JsonWebTokenError") {
      res.status(401).send({
        message: "UnAuthorized",
        status: false
      });
    }
    res.status(500).send(error);
  }
}