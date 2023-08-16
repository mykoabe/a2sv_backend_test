import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  markTaskAsComplete,
} from "../controllers/tasks";
const router = express.Router({ mergeParams: true });
const { protect } = require("../middlewares/auth");

router.route("/").get(protect, getTasks).post(protect, createTask);
router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);
router.route("/:id/complete").put(protect, markTaskAsComplete);

export default router;
