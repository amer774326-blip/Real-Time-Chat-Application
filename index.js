const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);
global.io = io;

app.locals.moment = moment;

mongoose.set("strictQuery", true);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error", err));

const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const TboxRouter = require("./router/TboxRouter");

const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// async function createAdminUser() {
//   try {
//     const People = require("./models/People");
//     const existingAdmin = await People.findOne({ email: "slymunumy29@gmail.com" });
//     if (!existingAdmin) {
//       const newAdmin = new People({
//         name: "Slyman admin",
//         email: "slymunumy29@gmail.com",
//         mobile: "05xxxxxxxxx",
//         password: "password",
//         role: "admin",
//       });
//       await newAdmin.save();
//       console.log("Admin user created successfully!");
//     } else {
//       console.log("Admin user already exists.");
//     }
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//   }
// }
// createAdminUser(); 

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
app.use("/tbox", TboxRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
