require('dotenv').config()
var inquirer = require("inquirer");

var Spotify = require('Node-Spotify-API');
console.log(Spotify);
var keys = require("./keys.js");
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
// const axios = require("axios");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// var songName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {
//     songName = songName + "+" + nodeArgs[i];
//   }
//   else {
//     songName += nodeArgs[i];

//   }
// }
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
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
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

