require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
var inquirer = require("inquirer");
var moment = require('moment');
// concertArtist-this
var axios = require("axios");
var fs = require("fs");


var nodeArgs = process.argv;
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
if (nodeArgs[2] === "concert-this") {
  // Store all of the arguments in an array
// Create an empty variable for holding the movie name
  var concertArtist="";
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      concertArtist = concertArtist + "+" + nodeArgs[i];
    } else {
      concertArtist += nodeArgs[i];

    }
  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + concertArtist + "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  axios.get(queryUrl).then(
    function (response) {
      console.log(JSON.stringify(response.data, null, 2));
      console.log(response.data[0].venue.name)
      for (var i=0; i<response.data.length; i++){
        console.log( response.data[i].venue.city +", " +response.data[i].venue.country );
        
        console.log( response.data[i].venue.name);
        console.log( moment(response.data[i].datetime).format("dddd, MMMM Do YYYY"));
        console.log("_______________________________________");
      }
     
    }
  );
}
else if (nodeArgs[2] === "spotify-this-song") {

  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the name of the song that you are looking for?",
      name: "name"
    },
    // Here we give the user a list to choose from.
    // {
    //   type: "list",
    //   message: "Are you looking for an album, song or artist?",
    //   choices: ["Album", "Song", "Artist"],
    //   nameChoice: "select"
    // },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you ready to rock?",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms,
    if (inquirerResponse.confirm) {
      console.log("\nWe will search for " + inquirerResponse.name);

      spotify.search({ type: 'track', query: inquirerResponse.name }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items);
      for (var i=0; i<data.tracks.items.length; i++){
        console.log( data.tracks.items[i].name +", " +data.tracks.items[i].artists[0].name);
        
        console.log( data.tracks.items[i].preview_url);
        console.log( data.tracks.items[i].album.name);
        console.log("_______________________________________");
      }
      });
    }
    else {
      console.log("\nThat's okay, I'll fix it since it's most likely a coding error.\n");
    }
  });

}

else if (nodeArgs[2] === "movie-this") {

    
  
}

else if (nodeArgs[2] === "do-what-it-says") {
  // read text from the random.txt file
// This block of code will read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

  // maybe do an async await here.?
            spotify.search({ type: 'track', query:dataArr[1] }, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
            
            console.log(data.tracks.items);
            for (var i=0; i<data.tracks.items.length; i++){
              console.log( data.tracks.items[i].name +", " +data.tracks.items[i].artists[0].name);
              
              console.log( data.tracks.items[i].preview_url);
              console.log( data.tracks.items[i].album.name);
              console.log("_______________________________________");
            }
            });
            
});

  // require fs        extract value from string pass to 4th part of array
}

else {
  console.log("Sorry something went wrong.")
}
// Then run a request with axios to the OMDB API with the movie specified

// var inquirer = require("inquirer");


// spotify.search({
//   type: 'track',
//   query: 'The Sign'
// }, function (err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

//   console.log(data);
// });

