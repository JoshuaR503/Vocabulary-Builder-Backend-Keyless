import mongoose, { Schema } from "mongoose";
import InterfaceFeedback from "../../interfaces/feedback.interface";

const schema: Schema = new Schema({
   title: {
      type: String,
      required: true,
      min: 2,
      max: 40
   },

   email: {
      type: String,
      required: false,
      min: 2,
      max: 40
   },

   text: {
      type: String,
      required: true,
      min: 6,
      max: 40
   },

   device_data: {
      type: Object,
      required: false
   },

   user_data: {
      type: Object,
      required: false
   }
   
}, {timestamps: true});

export const model = mongoose.model<InterfaceFeedback>('Feedback', schema);
export default model;
