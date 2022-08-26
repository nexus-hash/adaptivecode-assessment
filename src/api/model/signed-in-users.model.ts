import mongoose, { Schema, Document } from "mongoose"
export interface IUserEmail extends Document {
  email: String;
}
const SignedInUsers: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
})
export default mongoose.model < IUserEmail > ("SignedInUser", SignedInUsers)