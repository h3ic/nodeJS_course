import mongoose from "mongoose";
import { Comment } from "./models/comment.js";
import { Course } from "./models/course.js";
import { Lesson } from "./models/lesson.js";
import { Tag } from "./models/tag.js";
import { User } from "./models/user.js";
import { Resource } from "./models/resource.js";

const db_init = async () => {
  await mongoose.connect(`mongodb+srv://h3ic:${process.env.PASS}@cluster0.mcm02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

  const userObj = {
    full_name: "Bob Odenkirk",
    email: "bob@mail.com",
    role: "student",
    password: String,
  }

  const user = new User(userObj);

  await user.save();

  const userAuthorObj = {
    full_name: "Alice Weidel",
    email: "alice@mail.com",
    role: "author",
  }

  const userAuthor = new User(userAuthorObj);

  await userAuthor.save();

  const resource = Resource({
      name: "Презентация_Kubernetes_вводная.pptx",
      type: "presentation",
      link: "",
  });

  resource.save();

  const lesson = Lesson({
      name: "TypeScript in NodeJS",
      descripton: "How to setup, how to use, features",
      resources: [resource._id],
    });

  await lesson.save();

  const tag1 = Tag({
    name: "Backend"
  });

  await tag1.save()

  const tag2 = Tag({
    name: "Web"
  });

  await tag2.save();

  const comment = Comment({
    user: user._id,
    text: "cool",
  });

  await comment.save();

  const course = await Course({
      name: "NodeJS basic",
      description: "Environment, deploy, frameworks",
      prerequisites: "Basic JavaScript",
      skills: "Express, Docker, Nest.js",
      tags: [{name: "Backend"}, {name: "Web"}],
      difficulty: 2,
      lessons: [lesson._id],
      author: userAuthorObj,
      comments: [comment._id],
      users: [user._id]
    })

  await course.save();
}

db_init();
