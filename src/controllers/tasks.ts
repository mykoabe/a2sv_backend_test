import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private/Admin
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
// @access  Private/Admin
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
// @access  Private/Admin
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
// @access  Private/Admin
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No task found",
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
