import { Schema, model } from "mongoose";

export const tagScheme = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
});

export const Tag = model("Tag", tagScheme);
