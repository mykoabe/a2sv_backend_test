import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

// @desc    Get all tasks
// @route   GET /api/v1/tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Create task
// @route   POST /api/v1/tasks
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Check if the logged-in user is the task owner
    if (task.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to update this task",
      });
    }

    // Update the task data
    Object.assign(task, updatedData);
    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Check if the logged-in user is the task owner
    if (task.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to delete this task",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Mark task as complete
// @route   PUT /api/v1/tasks/:id/complete
export const markTaskAsComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Check if the logged-in user is the task owner
    if (task.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to mark this task as complete",
      });
    }

    task.status = "Done"; // Set task status as "Done"
    await task.save();

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};
