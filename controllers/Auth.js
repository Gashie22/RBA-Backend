import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User does not exist"});
    const match = await argon2.verify(user.password,req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    //set session if paasword matches
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}
  
//funct to get user login
export const Me = async (req, res) =>{
   try {
    if(!req.session.userId){ //if theres no session id

    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User does not exist"});
    res.status(200).json(user);
   } catch (error) {
    console.log("===============================")
    console.log(error)
    res.status(500).json({
        "message": "Exception"
    });
   }
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Error loging out"});
        res.status(200).json({msg: "Succesfully logged out"});
    });
}