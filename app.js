const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

const send_formatted_response_handler = require("./API/helper/HTTP_response_handler");

const baseRoute = require("./API/routes/baseRoute");
const noticeRoutes = require("./API/routes/admin/notice");
const userRoutes = require("./API/routes/user");
const studentRoutes = require("./API/routes/student/student");
const projectRoutes = require("./API/routes/student/project");
const experienceRoutes = require("./API/routes/student/experience");
const certificationRoutes = require("./API/routes/student/certification");
const achievementRoutes = require("./API/routes/student/achievement");
const researchRoutes = require("./API/routes/student/research");
const emailConfirmation = require("./API/routes/emailConfirmation");
const facultyRoutes = require("./API/routes/faculty/faculty");
const committeeRoutes = require("./API/routes/faculty/comittee");
const meetingRoutes = require("./API/routes/faculty/meeting");

//DB Connection
mongoose.connect(process.env.DEV_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use("/uploads", express.static("uploads"));

// CORS error :
app.use(cors());
app.options("*", cors());

// setting up the middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use("/", baseRoute);
app.use("/notice", noticeRoutes);
app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/student/project", projectRoutes);
app.use("/student/experience", experienceRoutes);
app.use("/student/certification", certificationRoutes);
app.use("/student/achievement", achievementRoutes);
app.use("/student/research", researchRoutes);
app.use("/confirmation", emailConfirmation);
app.use("/faculty", facultyRoutes);
app.use("/committee", committeeRoutes);
app.use("/meeting", meetingRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json(send_formatted_response_handler(error, false, error.message));
});

module.exports = app;
