import mongoose, { Schema } from "mongoose";
import InterfaceMissingEmoji from "../../interfaces/missing.interface";

const schema: Schema = new Schema({
    name: {
       type: String,
       required: true,
    },
}, {timestamps: true});

export const model = mongoose.model<InterfaceMissingEmoji>('MissingEmoji', schema);
export default model;
