import User from "../models/UserModel.js";

//used to authenticate the users and provide roles

//verify user will prevent anyone form accesing any data unless they log in
export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "You are not logged in!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

//giving certain rights to admin
export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User does not exist"});
    if(user.role !== "admin") return res.status(403).json({msg: "Forbidden access"});
    next();
}