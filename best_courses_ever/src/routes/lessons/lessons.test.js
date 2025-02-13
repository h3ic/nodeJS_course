import request from "supertest";
import express from "express";
import { apiRouter } from "./lessons.js";

const app = express();
app.use(express.json());
app.use("/api/lessons", apiRouter);

describe("Lesson API CRUD operations", () => {
  let lessonId;

  it("should create a new lesson", async () => {
    const payload = {
      name: "TypeScript in NodeJS",
      descripton: "How to setup, how to use, features",
      resources: [1, 2, 3],
    };
    const response = await request(app).post("/api/lessons").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("TypeScript in NodeJS");
    expect(response.body.description).toBe(
      "How to setup, how to use, features",
    );
    expect(response.body.resources).toBe([1, 2, 3]);

    lessonId = response.body.id;
  });

  it("should get all lessons", async () => {
    const response = await request(app).get("/api/lessons");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a lesson by ID", async () => {
    const response = await request(app).get(`/api/lessons/${lessonId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", lessonId);
    expect(response.body.name).toBe("TypeScript in NodeJS");
    expect(response.body.description).toBe(
      "How to setup, how to use, features",
    );
    expect(response.body.resources).toBe([1, 2, 3]);
  });

  it("should update a lesson by ID", async () => {
    const payload2 = {
      name: "NodeJS and Docker",
      descripton: "Containers, compose, swarm",
      resources: [4, 5, 6],
    };
    const response = await request(app)
      .put(`/api/lessons/${lessonId}`)
      .send(payload2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", lessonId);
    expect(response.body.name).toBe("NodeJS and Docker");
    expect(response.body.description).toBe("Containers, compose, swarm");
    expect(response.body.resources).toBe([4, 5, 6]);
  });

  it("should save a rating", async () => {
    const ratingPayload = {
      rating: 4,
    };

    const response = await request(app)
      .put(`/api/lessons/${lessonId}`)
      .send(ratingPayload);

    expect(response.status).toBe(200);
  });

  it("should save a comment", async () => {
    const commentPayload = {
      comment: "good enough",
    };
    const response = await request(app)
      .put(`/api/lessons/${lessonId}`)
      .send(commentPayload);

    expect(response.status).toBe(200);
  });

  it("should add resources to a lesson", async () => {
    const resourcesPayload = [1, 2, 3];
    const response = await request(app)
      .put(`/api/lessons/${lessonId}`)
      .send(resourcesPayload);

    expect(response.status).toBe(200);
  });

  it("should delete a lesson by ID", async () => {
    const response = await request(app).delete(`/api/lessons/${lessonId}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when trying to get a deleted lesson", async () => {
    const response = await request(app).get(`/api/lessons/${lessonId}`);

    expect(response.status).toBe(404);
  });
});
