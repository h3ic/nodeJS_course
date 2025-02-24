import { Schema, model } from "mongoose";

const fileScheme = new Schema({
  filename: String,
  path: String, // cloud storage url
  mimetype: String,
  size: Number,
})

const File = model("File", fileScheme);

const resourceScheme = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  type: {
    type: String,
    enum: ['video', 'article', 'presentation', 'custom'],
    required: true,
    maxLength: 20,
  },
  link: {
    type: String,
    maxLength: 200,
  },
  file: fileScheme,
});

export const Resource = model("Resource", resourceScheme);
