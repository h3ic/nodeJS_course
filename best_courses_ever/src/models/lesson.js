import { Schema, model } from "mongoose";

const lessonScheme = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
});

export const Lesson = model("Lesson", lessonScheme);
