require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 2611;
const dashboardRouter = require("./routers/dashboard.router");
const projectsRouter = require("./routers/projects.router");
const usersRouter = require("./routers/users.router");
const messagesRouter = require("./routers/messages.router");
const checkAuth = require("./middlewares/auth.mw");
const cors = require("cors");
const path = require("path");

// MiddleWares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/dashboard", checkAuth, dashboardRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/user", usersRouter);

// Connect to DB
mongoose
<<<<<<< HEAD
  .connect(process.env.MONGODB_URI)
=======
  .connect(
    "mongodb+srv://dockerPracticeUser:dockerPracticePass@cluster0.5rihyov.mongodb.net/am-portfolio"
  )
>>>>>>> 5df5a6d6cc6007b3b59c97dc70d008ac76739cd5
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Server Listening
app.listen(port, () => console.log(`http://localhost:${port}/api/projects`));
