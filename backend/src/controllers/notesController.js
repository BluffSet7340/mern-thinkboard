// all the controllers go here, decides what to do when a specific request happens
import Note from "../model/Note.js"

export const getAllNotes = async (req, res)=>{
    // res.status(200).send("You just fetched the notes");
    try{
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch(error){
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const createNewNote = (req, res)=>{
    res.status(200).send("Note created successfully!");
}

export const updateNote =  (req, res)=>{
    res.status(200).send("Note updated successfully!");
}

export const deleteNote = (req, res)=>{
    res.status(200).send("Note deleted successfully!")
}