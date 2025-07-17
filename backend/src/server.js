import express from "express";
// import notesRoutes from "./routes/notesRoutes.js"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()


const app = express()
const port = process.env.PORT || 5001;

connectDB()

// api prevents direct access to database via the frontend

// "/api/notes is the route"
//  listening for a get request and handling it
// this is a route

// endpoint - access URL and perform HTTP method on a specific resource

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

// all incoming http request are routed through notesRouter.js
// the same process can be repeated for /products, /payments, /emails, and more
app.use("/api/notes", notesRoutes);

// 4 routes and/or endpoints

// next step is to integrate the database

// a good practice is to create a route folder
// storing each api endpoint

app.listen(5001, ()=>{
    console.log("Server has started on port", port);
})