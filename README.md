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

I implemented the getSpecificNote controller where you send a get request to api/notes/:id where "id" is the parameter and returns the corresponding note. A new route was created for the aforementioned function. Then I learn about middleware, which runs some code between a request and a response. In my case, when a get request for all notes is sent, the middleware runs and identifies the method of the request and the URL. The code to do this is pretty readable too. In the server.js file you use the app.use method with three parameters. First you add whatever code you need to add such as printing console log statements and then you call the next() which is akin to saying "yep let's proceed with the response from the server". 

Lastly, I installed the upstash ratelimit and redis package to implement rate limiting. This prevents any one user (potentially malicious) from spamming the server with multiple requests, wasting resources

### 30/08/25

Implemented the upstash and the rate limiter. First the RateLimit method had to be imported from upstash, then we define the redi and limiter properties inside of it. 100 requests for every 60 seconds was configured but I tried using 6 request every 10 seconds to make sure that the error messages worked. 

Then created and exported a rateLimiter.js function that imports the rateLimit and checks whether or not the limit has been exceeded. Then in the server.js we use the app.use(rateLimiter) to make use of the rate limiter.

### 07/09/25

Completed the backend and started working on the frontend. The frontend is via Vite + React so Hot Module Replacmement stuff. Also installed react router to allow for navigation to different pages. So by appending text to the base url, which is the localhost, I can navigate to the home page, the create note page, and the view note detail page. I also installed the react-hot-toast package so that toast notifications can be added when a note is created successfully, unsuccessfully, or when an operation is unsuccessful.

I also installed tailwindcss, version 3.4.17 for Vite, already have experience in that due to working with next.js so gg.

### 08/09/25

I installed daisyUI, never used it before but it promises to cut down on long tailwindcss classes 

### 09/09/25

Configured DaisyUI but version 4 was used. I decided to go with the cyberpunk theme for this project. 


### 10/09/25 & 11/09/25

Created the navbar and the card component, the latter holds the data for the note as well as some functions to edit and delete the note.

cors is cross origin resource sharing -  a browser security feature that checks whether or an api is allowed to share information to a specific url, that being the frontend url. To allow cors you add it to the middleware of the api

### 12/09/25

Modified the server.js by adding the app.use(cors()) at the top of the middleware as is standard practice. Then tested the too many request error message via react toasts and it works. Some work on the frontend.

I converted the note card into a NoteCard component and then used map to iterate over them

### 14/09/25

Created a utility function to print out the date in a nice human readable format

### 15/09/25

Fixed a bug relating to the wrong date being showed. Created an axios.js file which contains the base url to avoid writing the same full url on each page. Implemented the create new note page, which takes the title and content and sends a post request to the api and creates a new note.

So the create not function works well and for good practice implemented a banner that displays that there are not notes and to click on the button to add a new note