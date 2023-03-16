import { Document } from "mongoose";

export default interface InterfaceFeedback extends Document {
   title: string,
   email: any,
   text: string,
   device_data: object,
   user_data: object
}
