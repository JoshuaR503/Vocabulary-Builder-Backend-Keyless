import { Document } from "mongoose";

export default interface InterfaceUser extends Document {
   name: string,
   email: string,
   password: string,
   role: string,
   verified: boolean,
   
}
