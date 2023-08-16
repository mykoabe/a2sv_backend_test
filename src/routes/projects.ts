import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projects";

import taskRouter from "./tasks";
const { protect } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });
router.use("/:projectId/tasks", taskRouter);

router.route("/").get(getProjects).post(protect, createProject);
router
  .route("/:id")
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
