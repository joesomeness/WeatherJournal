/* Global Variables */
let container = {}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let zipCode = 10007

// Assign personal API key to a variable
const APIKey = "4ee5e34fd217311319874e6977c6b21c";

// assign the "generate" button to a variable
const button = document.getElementById("generate");

button.addEventListener("click", () => {
    gatherData()
    .then(() =>
        postData()
    )
    .then(() =>
        getData()
    )
})

// Define the gatherData function which will be used in the eventlistener
async function gatherData() {
    let zipCode = document.getElementById("zip").value;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${APIKey}&units=metric`;
    console.log(url)
    let response = await fetch(url)
    try{
        
        // if condition to ensure user entered a valid zip code
        if (zipCode == "") {
            alert("Please enter a valid zip code!");
            return;
        }
        //assign dynamic URL to a variable
        let dataJSON = await response.json();
        console.log(dataJSON.main.temp)
        container.temp = dataJSON.main.temp;
        console.log(container.temp)
        return container.temp
    } catch(err) {
        console.log(err);
        alert("Please try a different zip code")
    }
}

async function postData() {
    let feelings = document.getElementById("feelings").value;
    await fetch('/post-weather', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": 'application/json'
            }, 
            body: JSON.stringify({
                temperature: container.temp, 
                date: newDate, 
                feeling: feelings
            })
        })
}

async function getData() {
    const res = await fetch("/get-weather", {
    method: "GET",
    credentials: "same-origin"
    })
    try{
        let userData = await res.json()
        document.getElementById("date").innerHTML = userData.date
        document.getElementById("temp").innerHTML = userData.temperature
        document.getElementById("content").innerHTML = userData.userResponse
        console.log(userData)
        return userData
    } catch (error) {
        console.log("ERROOOORRR"+error)
    }
}


// gatherData()
// // initiating POST request
// .then(function () {
//     let feelings = document.getElementById("feelings").value;
//     fetch('/post-weather', {
//             method: "POST",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": 'application/json'
//             }, 
//             body: JSON.stringify({
//                 temperature: container.temp, 
//                 date: newDate, 
//                 feeling: feelings
//             })
//         })
//     }
// )
// // initiating GET request
// .then(async () => {
//     const res = await fetch("/get-weather", {
//         method: "GET",
//         credentials: "same-origin"
//     })
//     console.log(res)
// })