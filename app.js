const express = require("express");
const { Server } = require("socket.io");
const http = require('http');
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const swaggerSpecs = require("./Config/swagger");
const courseRoutes = require("./Routes/courseRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const registerRouter = require("./Routes/registerRoute");
const instructorRoutes = require("./Routes/instructorRoutes");
const loginRouter = require("./Routes/loginRoute");
const studentRoutes = require("./Routes/studentRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");

const { ERROR, FAIL } = require("./Utils/responseStatus");

const logger = require("./Services/logger");
const setLoggerInfo = require("./Utils/setLoggerInfo");

const connectToDatabase = require("./Config/connectToDatabase");

/************************************************************************/

const app = express();

let server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

connectToDatabase();






app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/************************************************************************/
//Routes
app.use("/payment", paymentRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form requests

app.use("/admin", adminRoutes);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/course", courseRoutes);
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);

/************************************************************************/
// Handle Errors

// handle app errors
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
    statusText: error.statusText || "ERROR",
    stack: error.stack,
  });
});

// handle not found page error
app.use((req, res, next) => {
  return res.status(404).json({
    message: "page not found",
    statusText: FAIL,
  });
});

/************************************************************************/
// Socket.io

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  let userName = "Anonymous";

  // user joins
  socket.on("join", (name) => {
    userName = name || "Anonymous";

    socket.broadcast.emit("user joined", userName);
  });

  // chat message
  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      user: userName,
      text: msg
    });
  });

  // typing
  socket.on("typing", () => {
    socket.broadcast.emit("typing", userName);
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  // disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("user left", userName);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`app is listing on port ${process.env.PORT}`);
});
