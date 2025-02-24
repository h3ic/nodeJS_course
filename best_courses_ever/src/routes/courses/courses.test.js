import request from "supertest";
import express from "express";
import { apiRouter } from "./courses.js";

const app = express();
app.use(express.json());
app.use("/api/courses", apiRouter);

describe("Courses API CRUD operations", () => {
  let courseId;

  it("should create a new course", async () => {
    const payload = {
      name: "NodeJS basic",
      description: "Environment, deploy, frameworks",
      prerequisites: "Basic JavaScript",
      skills: "Express, Docker, Nest.js",
      tags: [{name: "Backend"}, {name: "Web"}],
      difficulty: 2,
      lessons: [1, 2, 3],
    };

    const response = await request(app).post("/api/courses").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("NodeJS basic");
    expect(response.body.description).toBe("Environment, deploy, frameworks");
    expect(response.body.prerequisites).toBe("Basic JavaScript");
    expect(response.body.skills).toBe("Express, Docker, Nest.js");
    expect(response.body.tags).toBe([{name: "Backend"}, {name: "Web"}]);
    expect(response.body.difficulty).toBe(2);
    expect(response.body.lessons).toBe([1, 2, 3]);

    courseId = response.body.id;
  });

  it("should get all courses", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a course by ID", async () => {
    const response = await request(app).get(`/api/courses/${courseId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", courseId);
    expect(response.body.name).toBe("NodeJS basic");
    expect(response.body.description).toBe("Environment, deploy, frameworks");
    expect(response.body.prerequisites).toBe("Basic JavaScript");
    expect(response.body.skills).toBe("Express, Docker, Nest.js");
    expect(response.body.difficulty).toBe(2);
    expect(response.body.lessons).toBe([1, 2, 3]);
  });

  it("should update a course by ID", async () => {
    const payload2 = {
      name: "Go advanced",
      description: "Frameworks, algorithms",
      prerequisites: "Basic Go",
      skills: "Microservices, highload servers, architecture",
      tags: [{name: "Backend"}, {name: "Highload"}],
      difficulty: 3,
      lessons: [4, 5, 6],
    };

    const response = await request(app)
      .put(`/api/courses/${courseId}`)
      .send(payload2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", courseId);
    expect(response.body.name).toBe("Go advanced");
    expect(response.body.description).toBe("Frameworks, algorithms");
    expect(response.body.prerequisites).toBe("Basic Go");
    expect(response.body.skills).toBe(
      "Microservices, highload servers, architecture",
    );
    expect(response.body.tags).toBe([200, 201]);
    expect(response.body.difficulty).toBe(3);
    expect(response.body.lessons).toBe([4, 5, 6]);
  });

  it("should add students to a course", async () => {
    const studentsToAdd = [7, 8, 9];

    const response = await request(app)
      .put(`/api/courses/${courseId}/students`)
      .send(studentsToAdd);

    expect(response.status).toBe(200);
    expect(response.body.students).toBe([7, 8, 9]);
  });

  // Comments

  it("should save a comment from a user", async () => {
    const commentPayload = {
      user: 1, // TODO: после добавления авторизации сохранять пользователя по токену
      comment: "cool!",
    };
    const response = await request(app)
      .put(`/api/courses/${courseId}/comment`)
      .send(commentPayload);

    expect(response.status).toBe(200);
    expect(response.body.comments).toBe([{ user: 1, comment: "cool!" }]);
  });

  it("should save a rating from a user", async () => {
    const ratingPayload = {
      user: 1, // TODO: после добавления авторизации сохранять пользователя по токену
      rating: 5,
    };
    const response = await request(app)
      .put(`/api/courses/${courseId}/comment`)
      .send(ratingPayload);

    expect(response.status).toBe(200);
  });

  // Lessons

  it("should list all lessons for a course", async () => {
    const response = await request(app).get(`/api/courses/${courseId}/lessons`);

    expect(response.status).toBe(200);
    expect(response.body.lessons).toBe([4, 5, 6]);
  });

  it("should list all comments of a course", async () => {
    const response = await request(app).get(
      `/api/courses/${courseId}/comments`,
    );

    expect(response.status).toBe(200);
    expect(response.body.comments).toBe([{ user: 1, comment: "cool!" }]);
  });

  it("should delete a course by ID", async () => {
    const response = await request(app).delete(`/api/courses/${courseId}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when trying to get a deleted course", async () => {
    const response = await request(app).get(`/api/courses/${courseId}`);

    expect(response.status).toBe(404);
  });
});
