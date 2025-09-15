import express from "express";
// import notesRoutes from "./routes/notesRoutes.js"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config()
 
const app = express()
const port = process.env.PORT || 5001;

// middleware
// before the response is sent, give us access to the req.body, so I can access the 
// title and content fields for example

// apparently cors needs to come before everything else in this dunya
app.use(cors()); // allows every request from any url by default but can be restricted to specific urls

app.use(express.json()) // gives us access to the req body
app.use(rateLimiter);

// middleware comes between the request and response => our custom middleware
app.use((req , res, next)=>{
    console.log(`Request method is ${req.method} and Request URL is ${req.url}`) // seeing what sort of requests we're getting ygm
    next() // this is function that basically says okay we did what we had to do 
    // and continue the "execution"
})
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

// code restructuring, only when db is connected, then you can listen for connections
connectDB().then(()=>{
    app.listen(5001, ()=>{
        console.log("Server has started on port", port);
    })
})

