// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 8000;
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
// GET route setup
app.get("/get-weather", (req, res) => {
    res.send(projectData);
})
// POST route setup
app.post("/post-weather", (req, res) => {
    projectData["temperature"] = req.body.temperature, 
    projectData['date'] =  req.body.date, 
    projectData["userResponse"] = req.body.feeling 
    console.log("Post successful!")
    res.send(projectData)
    console.log(projectData)
})

// Setup Server
app.listen(port, () => {
    console.log(`Your app is running on localhost:${port}`);
});