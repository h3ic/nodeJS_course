import express from "express";
import { User } from "../../models/user";
export const apiRouter = express.Router();

/* API Routes */

// Get all users
apiRouter.get("/", (req, res) => {});

// Get user by ID
apiRouter.get("/:id", (req, res) => {});

// Create a new user
apiRouter.post("/", (req, res) => {});

// Update a user
apiRouter.put("/:id", (req, res) => {});

// Delete a user
apiRouter.delete("/:id", (req, res) => {});

// Rate an author
apiRouter.put("/:id/rate", (req, res) => {});

export default { apiRouter };
