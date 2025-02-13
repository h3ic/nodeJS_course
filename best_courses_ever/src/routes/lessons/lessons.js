import express from "express";
export const apiRouter = express.Router();

/* API Routes */

// Get all courses
apiRouter.get("/", (req, res) => {});

// Create a new lesson
apiRouter.post("/", (req, res) => {});

// Update a lesson
apiRouter.put("/:id", (req, res) => {});

// Delete a lesson
apiRouter.delete("/:id", (req, res) => {});

// Rate a lesson
apiRouter.put("/:id/rate", (req, res) => {});

// Comment a lesson
apiRouter.put("/:id/comment", (req, res) => {});

// Add resources for a lesson
apiRouter.put("/:id/resources", (req, res) => {});

export default { apiRouter };
