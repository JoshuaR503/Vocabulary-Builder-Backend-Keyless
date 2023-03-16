import mongoose, { Schema } from "mongoose";
import InterfaceUser from '../../interfaces/user.interface';

const roles: object = {
   values: ['UpperPermission', 'LowerPermission', 'NoPermission'],
   message: '{VALUE} is not a valid role.'
}

const schema: Schema = new Schema({
   name: {
      type: String,
      required: true,
      min: 2,
      max: 40
   },

   email: {
      type: String,
      unique: true,
      required: true,
      min: 2,
      max: 40
   },

   password: {
      type: String,
      required: true,
      min: 6,
      max: 40
   },

   role: {
      type: String,
      enum: roles,
      required: true,
   },

   verified: {
      type: Boolean,
      default: false
   },

}, {timestamps: true});

export const model = mongoose.model<InterfaceUser>('Usuario', schema);
export default model;
