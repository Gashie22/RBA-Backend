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

// CORS configuration:
app.use(cors({
    origin: "https://elaladb.onrender.com", // Specific allowed origin for security
    credentials: true, // Allow sending cookies for authenticated requests
}));
app.options('*', cors()); // Handle preflight requests with CORS headers

// Secure session configuration:
const sessionStore = new SequelizeStore({
    db: db,
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: true, // Ensure cookies are only sent over HTTPS
        sameSite: 'none', // Allow cross-site usage for authenticated requests
        httpOnly: true // Prevent client-side JavaScript access for security

    },
}));

// Database and routes:
(async () => {
    await db.sync();
})();

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

store.sync(); // Initialize session store after routes

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running...");
});
