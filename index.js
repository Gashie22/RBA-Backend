import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "https://elaladb.onrender.com",
    credentials: true
}
))
app.options('*', cors())


//session template (store included)
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db //from the db imported
});

(async () => {
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {

        secure: true, // Ensure cookies are only sent over HTTPS
        sameSite: 'none', // Allow cross-site usage for authenticated requests
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7

    }
}));





app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);


store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
