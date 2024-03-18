import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import NotesRoute from "./routes/NotesRoute.js";


dotenv.config();

const app = express();

app.set('trust proxy', 1);

app.use(cors({
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    origin: ['*']
}));


//this is screwing things
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
        secure: 'auto',
        path: '/',
        httpOnly: true,
        sameSite: "lax"
    }
}));
// ==>




app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(NotesRoute);
app.use(AuthRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
