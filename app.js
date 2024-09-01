require("dotenv").config();
const connectDB = require("./connectDB/connectDB");
const express = require("express");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = 5000;

const router = require("./routes/taskRoutes");

app.use(express.json());
app.use("/api/v1/tasks", router); // API routes
app.use(express.static("./public")); // Serve static files
app.use(notFound); // Handle 404
app.use(errorHandler); // Handle errors

// app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(PORT, () => {
      console.log(`app is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
