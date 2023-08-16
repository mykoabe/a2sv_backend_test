import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private/Admin
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private/Admin
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Create project
// @route   POST /api/v1/projects
// @access  Private/Admin
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private/Admin
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private/Admin
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "No project found",
      });
    }
    await project.deleteOne();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};
