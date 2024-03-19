import express from "express";
import cors from 'cors';
import {Login, logOut, Me} from "../controllers/Auth.js";


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://elmala.com");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(cors({ origin: null , credentials :  false,allowedHeaders:['Content-Type', 'Authorization']}));
const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;