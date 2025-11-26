const express = require( express );
const http = require( http );
const mongoose = require( mongoose );
const dotenv = require( dotenv );
const cookieParser = require( cookie-parser );
const moment = require( moment );
const path = require( path );

dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.database_url)
    .then(() => console.log("Database connection successful!"))
    .catch(err => console.error("Database connection error:", err));

const loginRouter = require( ./router/loginRouter );
const InboxRouter = require( ./router/InboxRouter );
const TboxRouter = require( ./router/TboxRouter );
const UsersRouter = require( ./router/UsersRouter );

const { notFoundHandler, errorHandler } = require( ./midlewares/common/errorHandler );

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,  public )));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

async function createAdminUser() {
    try {
        const People = require( ./models/People );
        const existingAdmin = await People.findOne({ email:  slymunumy29@gmail.com  });
        if (!existingAdmin) {
            const newAdmin = new People({
                name:  Slyman admin ,
                email:  slymunumy29@gmail.com ,
                mobile:  05xxxxxxxx ,
                password:  password ,
                role:  admin ,
            });
            await newAdmin.save();
            console.log( Admin user created successfully! );
        } else {
            console.log( Admin user already exists. );
        }
    } catch (error) {
        console.error( Error creating admin user: , error);
    }
}
// createAdminUser();

app.use( /login , loginRouter);
app.use( /inbox , InboxRouter);
app.use( /tbox , TboxRouter);
app.use( /users , UsersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
