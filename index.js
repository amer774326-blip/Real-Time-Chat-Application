const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

const LoginRouter = require("./router/LoginRouter");
const UsersRouter = require("./router/UsersRouter");
const InboxRouter = require("./router/InboxRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
const server = http.createServer(app);
dotenv.config();

const People = require('./models/People');
async function createAdminUser() {
    try {
        const existingUser = await People.findOne({ email: 'slymanamyr295@gmail.com' });
        if (!existingUser) {
            const newAdmin = new People({
                name: 'slyman admin',
                email: 'slymanamyr295@gmail.com',
                mobile: '00966500000000',
                password: 'y6j2iu4gwu7dniiw',
                role: 'admin',
            });
            await newAdmin.save();
            console.log('Admin user created successfully!');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}
createAdminUser();

const io = require("socket.io")(server);
global.io = io;

app.locals.moment = moment;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.database_url)
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", LoginRouter);
app.use("/users", UsersRouter);
app.use("/inbox", InboxRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
