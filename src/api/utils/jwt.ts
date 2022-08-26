import jwt from 'jsonwebtoken';

interface IJwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
}

export const verifyToken = (token: string): Promise<IJwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as IJwtPayload);
      }
    } );
  })
}