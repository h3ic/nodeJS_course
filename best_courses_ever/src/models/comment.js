import { Schema, model } from "mongoose";

const commentScheme = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
    maxLength: 1000,
  },
});

export const Comment = model("Comment", commentScheme);
