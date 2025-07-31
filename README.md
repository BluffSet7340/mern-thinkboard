# Note Taking App using the MERN Stack

I will be following the tutorial from the youtube channel called codesistency to learn how the MERN stack works. Everything I learn will be recorded in this readme file


## Journal

### 14/07/25

A short introduction on the MERN tech stack. 

Installed expressjs and learnt about the different HTTP methods, and did a basic implementation of a get request. 

Rather than stopping and starting the server over and over each time a line of code was changed in the server.js file, I installed nodemon and modified the package.json so that the script runs nodemon server.js.

Brief rundown of status codes pertaining to success (2xx), redirection (3xx) failure on the client side (4xX), and failure on the server side (5xx)

### 15/07/25

I divided the api endpoints into two folders - the routes which contain the URL, and the controllers, that determine what each HTTP method does. This was implemented for the get, post, put, and delete methods

The api directs any requests on the api/notes route to the notesRoutes router via the .use() method. This keeps the code clean and maintainable as the app grows in size

### 16/07/25

Made an account on MongoDB and created a new project. Grabbed the details of the cluster and connected to it via the Mongoose npm package

Created a separate folder called config to handle the database logic

### 17/07/25

Created .env file to store database secret and connected to DB via an environment variable. This required the dotenv package. 

### 18/07/25

I created a schema that contains the fields for the notes. Each note will have a title, content, createdAtm and updatedAt fields. MongoDB comes with timestamps by default

I then created a model based on this schema called "Note"

### 19/07/25

Implemented part of the getAllNotes endpoint

### 31/07/25

I followed the implementation of the controller for the getAllNotes controller. It returns an array of notes from the Notes model or an internal server error