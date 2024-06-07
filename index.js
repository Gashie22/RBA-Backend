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
import cookieSession from 'cookie-session';

dotenv.config();

const app = express();


// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "https://elmala.com");
//     res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");//'Access-Control-Allow-Credentials'
//     res.setHeader("Access-Control-Allow-Credentials", "true");//'Access-Control-Allow-Credentials'
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });



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
        secure: 'auto',
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// app.use(
//     cookieSession({
//       secret:  process.env.SESS_SECRET,
//       sameSite: 'none',
//       secure: false,
//       httpOnly: false,
//     }),
//   );

//   app.enable('trust proxy');

  app.use(cors({ 
    credentials: true,
      methods: ['GET', 'POST', 'PUT', "DELETE"],
    origin: "http://143.244.178.37:3000"}));

app.use((req, res, next) => {
    console.log("Passed this")
    console.log(req.session)
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

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
  
