# MERN ThinkBoard

## Project Overview
MERN ThinkBoard is a full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, view, update, and delete notes with a modern, responsive UI. 

## Acknowledgement
The project was based on this [tutorial](https://www.youtube.com/watch?v=Ea9rrRj9e0Y&t=3s). However, I used a different daisy theme and tried to modify the code wherever I could and added notes in my journal talking about what I learnt. 

## Features
- Create, view, edit, and delete notes
- Rate limiting to prevent abuse
- Responsive design with TailwindCSS and DaisyUI (Cyberpunk theme)
- Toast notifications for user feedback
- Organized codebase with clear separation of backend and frontend
- Deployed on Render.com

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, DaisyUI, React Router, Axios
- **Backend:** Express, MongoDB (Mongoose), Upstash Rate Limiter, dotenv, CORS

## Setup Instructions
1. **Clone the repository:**
	```sh
	git clone https://github.com/BluffSet7340/mern-thinkboard.git
	cd mern-thinkboard
	```
2. **Install dependencies:**
	```sh
	npm install --prefix backend
	npm install --prefix frontend
	```
3. **Configure environment variables:**
	- Create a `.env` file in the `backend` folder with your MongoDB URI and UPSTASH secrets
4. **Run the development servers:**
	- Backend: `npm run start --prefix backend`
	- Frontend: `npm run dev --prefix frontend`
5. **Build for production:**
	```sh
	npm run build
	```
6. **Deploy:**
	- Follow platform-specific instructions (e.g., Render.com) for deployment.

---

## Screenshots 

![Login Page](https://github.com/BluffSet7340/mern-thinkboard/blob/main/logging%20in.png)

![Page containing the notes](https://github.com/BluffSet7340/mern-thinkboard/blob/main/notes%20page.png)

![Editing Notes](https://github.com/BluffSet7340/mern-thinkboard/blob/main/edtiing%20note.png)

![Page containing the notes](https://github.com/BluffSet7340/mern-thinkboard/blob/main/notes%20page.png)

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

So the create not function works well and for good practice implemented a banner that displays that there are not notes and to click on the button to add a new note.

After completing both the frontend and backend, the next step is to deploy it on github and then use a platform called render.com for hosting?

Creating the package.json file outside of the backend and frontend folders manages the packages for those two folders.

### 16/09/25

so the npm run build creates the production build, similar to npx expo build, to optimize for release. 

We're gonna have the frontend and backend on a single domain. No need for the cors config then.

Based on the environment the files are served, so both the backend and the frontend are on the same domain.

Deployed to Render.com, project complete!!

### 20/09/25

Adding some new features now so starting with auth, and maybe later I'll add some redux feature too. Yes I will use chatgpt for help on this but will take care to ensure that the code is safe and reliable. I will also rely on the tutorial by codesistency as always to get a grasp on authentication

### 21/09/25

So I was able to create the controller, the routes, and the endpoints for the signup, login, and logout. I am still working on the implemetnation for the signup, will have to figure out how JWT comes into this??

Today I learnt that expres only allows you to send one reponse with each request

okay I think I understand how the JWT works. You have the header - metadata about the token, the payload, which should not contain sensitive data since it is not encrypted and lastly the signature, which is the combination of the header + payload and signed with the secret.

So this is about guaranteeing integrity of the application, the server that has the secret key can take the header + payload that it receives and sign it with the secret and compare its test signature with the one it received. If it matches we straight, else there is an issue.

So to generate this secret key, we can use node and run this long command to get the 32 bit key ygm.

So mailtrap will be used as the way to send custom template emails to verify that the user is real or no

### 22/09/25

Still working on the signup route in the auth controller. So when the user signs up, they should receive a code in their email to ensure that no fake emails are used and no spam attack from malicious actors. 

So three email templates are provided, I just copied em from codesistency's tutorial - for the sign up, reset password request, reset password success you get me

So the verification email is sent with the code to the intended recipient

so since I am using the free plan of mailtrap, I can only send verification and other sorts of emails to my email registered with them

for the user to input the verification code that they receive we need to create another endpoint for this

### 23/09/25

okay I was having some issue with the requests not working all of a sudden but I get it now lol. I set the request to be GET instead of POST on Postman

So another bug where mailtrap expects the name of the object to be email not any other name, I was using userEmail.

Another bug fix where the name field should be inside of the template variables for the welcome email, with a proper plan, this would send emails where the name would dynamically change based on the details that the user inputtted.

Another bug fix, subject and category fields are not allowed when using template uuid. 

also realized that I need to add the res (as in response) otherwise in postman the request just keeps loading and never ends.

Added the first_name parameter to the email so that it shows the username in the welcome email

so from what I understand, when doing the logout, it removes the cookie from the local browser, the localhost in this case

Another bug but it was caused by me not putting the await keyword before telling mongodb to find me the specified user

So the logout get rids of token from the cookie and the login now works and sets the cookie to the token, generated via JWT

### 25/09/25

now creating the forgot password endpoint. So by creating a reset token we can have the reset url to be used for creating a new password. Had a little discussion with the AI whether I should hash the password on the frontend and then send it to the backend but that's a bad idea cuz apparently people can expose the JS and see the hash algo and salt rounds and whatnot. It is alright to send plaintext password as long as you do it over HTTPS, thx to its TLS encryption. Also read some posts on stack overflow to confirm this

A bug I noticed is that I kept getting an error when trying to hash the password and save it to the db but turns out that bcrypt is promise, so you have to add the await keyword before it, let it complete first and then continue execution

So the true nature of resetting passwords is interesting, based on the email that is sent, a user token is generated connected to that email and when the new password is updated, that same token is used again, ofc the token can only last one hour so it needs to be done in that timeframe

okay so the hash is different on the db as before which means it works xD. I guess one issue is the fact that you can spam the forgot password over and over again, having a cool down should be good or something?

Still not sure what to do with the token set in the cookie via jwt but let's see 

okay so since mailtrap limit is exceeded, I'll put the link for resetting the password in the frontend itself, user will click on it and be navigated to the reset password page kk


### 26/09/25

So with the middleware we check whether or not the user is logged in. First we try to extract the token from the request - if no token then that request is unauthorized and blocked. If we do get the token - the server runs a jwt.verify check using the secret key to make sure that the data hasn't been tampered - gives us integrity. It can also check if the token is expired

One thing that bewilders me is the fact that this isn't some vodoo magic or just using packages. It is just me writing code, lots of if and else statements, destructuring the requests, which are always in json, do my work such as updating the db and whatnot and then you send a respose of whether it is successful or not. It really is simply isn't it.

### 28/09/25

Okay so now is the time to protect the routes for creating, updating, and deleting notes belonging to specific users. Will also need to protect it on the frontend too but need to figure that part out.

So far I did edit the scheme of the Note to include the userId.



### 29/09/25

So based on Codesistency's tutorial, I will be implementing the criteria for the password meter - so that password meet basic requirements. Yea tbh I am just copy and pasting this part from his tutorial but trying to understand ygm. 

### 01/10/25

Yea deadass used chatgpt to create the verify email page which those neat features that you normally see - easy copy paste, then backspace changes focus to previous input box, and adding digits focuses to next input box.

Interesting now we will be using zustand for state management of the authentication, makes sense cuz you do not want to have the user log in constantly after a page refresh?? I guess.

I am unable to create another account to showcase the verification step, hmm maybe there is another way I can still make an account and just skip the mailtrap stuff just to show that this works you get me


### 02/10/25

The check-auth function will be used to protect our routes ygm

### 03/10/25

so ProtectedRoutes component had to be created and whatever components that you want to protect, you have to wrap those components inside of the ProtectedRoute

Right now trying to figure out the state management for the log out part proving to be quite difficult cuz it does not seem that the tutorial covererd it but it should be fine, he implemented everything else for me so I have a basic idea of how that works tbh.

### 04/10/25

okay I was wrong the logout function on the authStore was alr implemented by him so I did that and called that function once the logout button was clicked and it worked and navigated me to the login page alhamdulillah. Trying to go to the homepage after log out redirects me to the login page

Okay sweet so claude was giving some interesting prompts and from there I figured out that one of my responses was giving a 400 status code when the response was a success, so I changed it to 200 and now when the user is logged in and tries to access a route that does not exist, they are redirected to the home page and if the user is not logged in and does the same, they are redirected to the login page xD

Okay so even though I exceeded all of mailtrap limit, making it impossible to test the adding new account and resetting password I can still add another acc through mongodb so then I can simulate multiple users ygm

one thing that confused me was his structure in accessing the errors from axios like he would start with error.response.data.message and that did not make sense to me but this is basically the strucuture of an axios error response, got some sample error from claude as well to understand it 

### 06/10/25

So I added safeguards to prevent the reset password url from being accessed by someone who is already logged in or someone who is trying to access it without logging in and failing an attempt first.

I've decided to skip the forgot password stuff cuz the mailtrap is not working rn so no point but it is still possible 

### 07/10/25

the environment had to be set to production so that the frontend production files could be served on the same localhost address.
