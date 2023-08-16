import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/config.env" });

const app = express();

// Body parser
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
