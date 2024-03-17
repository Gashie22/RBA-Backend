
import express from "express";
import {
    getNotes,
    getNotebyId,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/Notes.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/notes', verifyUser, getNotes);
router.get('/notes/:id', verifyUser, getNotebyId);
router.post('/notes', verifyUser, createNote);
router.patch('/notes/:id', verifyUser,updateNote);
router.delete('/notes/:id', verifyUser, deleteNote);

export default router;
