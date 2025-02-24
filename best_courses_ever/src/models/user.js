import { Schema, model } from "mongoose";

export const userScheme = new Schema({
  full_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  role: {
    type: String,
    required: true,
    enum: ['author', 'student'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  password: String,
});

export const User = model("User", userScheme);
