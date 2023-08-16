import { Request, Response, NextFunction } from "express";
import Project from "../models/Project";

// @desc    Get all projects
// @route   GET /api/v1/projects
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
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;
    const updatedData = req.body;

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    // Check if the logged-in user is the project owner
    if (project.owner.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to update this project",
      });
    }

    // Update the project data
    Object.assign(project, updatedData);
    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(error);
  }
};

// @route   DELETE /api/v1/projects/:id
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    // Check if the logged-in user is the project owner
    if (project.owner.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to delete this project",
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
