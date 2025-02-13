import express from "express";
export const apiRouter = express.Router();

/* API Routes */

// Get all resources
apiRouter.get("/", (req, res) => {});

// Get resource by ID
apiRouter.get("/:id", (req, res) => {});

// Create a new resource
apiRouter.post("/", (req, res) => {});

// Update a resource
apiRouter.put("/:id", (req, res) => {});

// Delete a resource
apiRouter.delete("/:id", (req, res) => {});

export default { apiRouter };
