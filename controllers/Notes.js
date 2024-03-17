import ProgressNotes from '../models/NotesModel.js';
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getNotes = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await ProgressNotes.findAll({ //get all products if user is admin
                attributes:['uuid','name','status','details','date'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await ProgressNotes.findAll({
                attributes:['uuid','name','status','details','date'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User, //iclude user model details
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createNote= async (req,res)=>{
    const {name,status,details,date} = req.body;
    try {
        await ProgressNotes.create({
            name: name,
            details:details,
            status:status,
            date:date,
            userId: req.userId
        });
        res.status(201).json({msg: "Progress Added"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const updateNote= async (req,res)=>{
    try {
        const notes = await ProgressNotes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!notes) return res.status(404).json({msg: "Result not found"});
        const {name,status,details} = req.body;
        if(req.role === "admin"){
            await ProgressNotes.update({name, status,details},{
                where:{
                    id: notes.id
                }
            });
        }else{
            if(req.userId !== notes.userId) return res.status(403).json({msg: "User Cannot Update Admin data"});
            await ProgressNotes.update({name, status,details},{
                where:{
                    [Op.and]:[{id: notes.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
    
}
export const getNotebyId= async (req,res)=>{
    try {
        const note = await ProgressNotes.findOne({
            where:{
                uuid: req.params.id //uuid represent a key to get a specific product
            }
        });
        if(!note) return res.status(404).json({msg: "Result not found"});
        let response;
        if(req.role === "admin"){
            response = await ProgressNotes.findOne({
                attributes:['uuid','name','status','details','date'], //what to output
                where:{
                    id: note.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await ProgressNotes.findOne({
                attributes:['uuid','name','status','details','date'],
                where:{
                    [Op.and]:[{id: note.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const deleteNote= async (req,res)=>{
    try {
        const note = await ProgressNotes    .findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!note) return res.status(404).json({msg: "Result not found"});
        const {name, price} = req.body;
        if(req.role === "admin"){
            await ProgressNotes.destroy({
                where:{
                    id: note.id
                }
            });
        }else{
            if(req.userId !== note.userId) return res.status(403).json({msg: "User does not have rights"});
            await ProgressNotes.destroy({
                where:{
                    [Op.and]:[{id: note.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Progress deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}