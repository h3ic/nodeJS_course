import request from "supertest";
import express from "express";
import { apiRouter } from "./users.js";

const app = express();
app.use(express.json());
app.use("/api/users", apiRouter);

describe("User API CRUD operations", () => {
  let userId;

  it("should create a new user", async () => {
    const payload = {
      name: "John Doe",
      email: "john@example.com",
      role: "author",
    };
    const response = await request(app).post("/api/users").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@example.com");
    expect(response.body.role).toBe("author");

    userId = response.body.id;
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a user by ID", async () => {
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@example.com");
  });

  it("should update a user by ID", async () => {
    const payload2 = {
      name: "Jane Doe",
      email: "jane@example.com",
      role: "student",
    };
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(payload2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body.name).toBe("Jane Doe");
    expect(response.body.email).toBe("jane@example.com");
    expect(response.body.role).toBe("student");
  });

  it("should save a rating for an author", async () => {
    const ratingPayload = {
      rating: 4,
    };
    // TODO: добавить проверку на роль автора
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(ratingPayload);

    expect(response.status).toBe(200);
  });

  it("should delete a user by ID", async () => {
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when trying to get a deleted user", async () => {
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(404);
  });
});
