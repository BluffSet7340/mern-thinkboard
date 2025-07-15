import express from "express"
import { getAllNotes, createNewNote, updateNote, deleteNote } from "../controllers/notesController.js";

const router = express.Router();

// /api/notes is already prefixed
router.get("/", getAllNotes)
router.post("/", createNewNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

// app.get("/api/notes", (req, res)=>{
//     // you'd send a req like deleting a post or deleting a note
//     res.status(200).send("You got 35 notes")
// });

// app.post("api/notes", (req, res)=>{
//     res.status(201).json({
//         message:"Note created successfully!"
//     })
// })

// // user can't just update all notes on the database, only access specific 
// // post based on id of that post
// // id is dynamic, can be any number really son
// app.put("api/notes/:id", (req, res)=>{
//     res.status(201).json({
//         message:"Note updated successfully!"
//     })
// })

// app.delete("api/notes/:id", (req, res)=>{
//     res.status(201).json({
//         message:"Note deleted successfully!"
//     })
// })



export default router