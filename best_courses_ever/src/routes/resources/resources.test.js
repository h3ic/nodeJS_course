import request from "supertest";
import express from "express";
import { apiRouter } from "./resources.js";

const app = express();
app.use(express.json());
app.use("/api/resources", apiRouter);

describe("User API CRUD operations", () => {
  let resourceId;

  it("should create a new resource", async () => {
    const payload = {
      name: "Презентация_Kubernetes_вводная.pptx",
      type: "presentation",
      link: "",
    };

    const response = await request(app).post("/api/resources").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Презентация_Kubernetes_вводная.pptx");
    expect(response.body.type).toBe("presentation");
    expect(response.body.link).toBe("");

    resourceId = response.body.id;
  });

  it("should get all resources", async () => {
    const response = await request(app).get("/api/resources");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a resource by ID", async () => {
    const response = await request(app).get(`/api/resources/${resourceId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Презентация_Kubernetes_вводная.pptx");
    expect(response.body.type).toBe("presentation");
    expect(response.body.link).toBe("");
  });

  it("should update a resource by ID", async () => {
    const payload2 = {
      name: "Видео_Kubernetes_2",
      type: "video",
      link: "https://youtu.be/dQw4w9WgXcQ?si=5hT_In-Qcigop2U_",
    };

    const response = await request(app)
      .put(`/api/resources/${resourceId}`)
      .send(payload2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", resourceId);
    expect(response.body.name).toBe("Видео_Kubernetes_2");
    expect(response.body.type).toBe("video");
    expect(response.body.link).toBe(
      "https://youtu.be/dQw4w9WgXcQ?si=5hT_In-Qcigop2U_",
    );
  });

  it("should delete a resource by ID", async () => {
    const response = await request(app).delete(`/api/resources/${resourceId}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when trying to get a deleted resource", async () => {
    const response = await request(app).get(`/api/resources/${resourceId}`);

    expect(response.status).toBe(404);
  });
});
