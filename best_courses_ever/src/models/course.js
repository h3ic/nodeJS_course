import { Schema, model } from "mongoose";
import { tagScheme } from "./tag.js";
import { userScheme } from "./user.js";

const courseScheme = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: String,
  prerequisites: String,
  skills: String,
  difficulty: {
    type: Number,
    min: 1,
    max: 5
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  author: userScheme,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [tagScheme],
});

export const Course = model("Course", courseScheme);
