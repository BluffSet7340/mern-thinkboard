// i guess this is where the schema goes
import mongoose from "mongoose"

// 1. create schema
// 2. create model based on schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type:String,
            required: true
        },
    },
    // mongodb comes with timestamp by default, can be used for createdAt and updatedAt for the notes
    { timestamps: true }
);

// create a note model based off of this schema
const Note = mongoose.model("Note", noteSchema)

export default Note
// use this to interact - create, update, delete

