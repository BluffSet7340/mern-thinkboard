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

I created a schema that contains the fields for the notes. Each note will have a title, content, createdAt and updatedAt fields. MongoDB comes with timestamps by default

I then created a model based on this schema called "Note"

### 19/07/25

Implemented part of the getAllNotes endpoint

### 31/07/25

I followed the implementation of the controller for the getAllNotes controller. It returns an array of notes from the Notes model or an internal server error

### 21/08/25

Implemented the createNewNote controller. For this to work you need to add middleware via app.use(express.json()). Then you have to destructure the body of the request into title and desc. Then you create a new note and assign it to title and content respectively. Then save the new note via the save method. As outlined in the tutorial, I used Postman to send the post request to test the save new notes controller

### 22/08/25

Implemented the updateNote and deleteNote controllers. One interesting thing to note was that even though in the request body of the PUT request I only sent the desc key and corresponding value. Then I used array desctructuring to take out the title and desc. However, the title was undefined but despite that, I was able to pass in both title and desc to update a specifc note via its id. From the docs and AI, it seems that if one of the fields in undefined, such as in the case of title, the update still goes through for the desc!! Then I impelemented the deleteNote controller, pretty straightforward, just calling the Note.deleteOne method

### 23/08/25

I implemented the getSpecificNote controller where you send a get request to api/notes/:id where "id" is the parameter and returns the corresponding note. A new route was created for the aforementioned function. Then I learn about middleware, which runs some code between a request and a response. In my case, when a get request for all notes is sent, the middleware runs and identifies the method of the request and the URL. Lastly, I installed the upstash ratelimit and redis package to implement rate limiting. This prevents any one user (potentially malicious) from spamming the server with multiple requests, wasting resources