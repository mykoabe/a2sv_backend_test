import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db";
import errorHandler from "./middlewares/error";
dotenv.config({ path: "./src/config/config.env" });

// Connect to database
connectDatabase();

// Route Files
import users from "./routes/users";
import tasks from "./routes/tasks";
import projects from "./routes/projects";

const app = express();

// Body parser
app.use(express.json());

// mount routers
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/users", users);
app.use("/api/v1/projects", projects);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
