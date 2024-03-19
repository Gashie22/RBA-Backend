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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://elmala.com");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


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
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: 'false',
        httpOnly: true,
        sameSite: 'lax'
    }
}));
app.use(cors({ origin: null , credentials :  false,allowedHeaders:['Content-Type', 'Authorization']}));

app.use((req, res, next) => {
    console.log("Passed this")
    if(req.session.userId !== undefined){
        console.log(req.session.userId)
    } else {
        console.log("Undefined")
    }
    next();
})



app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(NotesRoute);
app.use(AuthRoute);

store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
