import express from "express";
export const apiRouter = express.Router();

/* API Routes */

// Get all courses
apiRouter.get("/", (req, res) => {});

// Get course by ID
apiRouter.get("/:id", (req, res) => {});

// Create a new course
apiRouter.post("/", (req, res) => {});

// Update a course
apiRouter.put("/:id", (req, res) => {});

// Delete a course
apiRouter.delete("/:id", (req, res) => {});

// Course actions:

// Add students (grant access) to a course
apiRouter.put("/:id/students", (req, res) => {});

// Rate a course
apiRouter.put("/:id/rate", (req, res) => {});

// Get all lessons for a coruse
apiRouter.get("/:id/lessons", (req, res) => {});

// Comments:

// Get comments of a course
apiRouter.get("/:id/comments", (req, res) => {});

// Comment a course
apiRouter.put("/:id/comments", (req, res) => {});

export default { apiRouter };
