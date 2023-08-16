import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projects";

import taskRouter from "./tasks";
import { protect, authorize } from "../middlewares/auth";

const router = express.Router({ mergeParams: true });
router.use("/:projectId/tasks", taskRouter);

router.route("/").get(protect, getProjects).post(protect, createProject);
router
  .route("/:id")
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
