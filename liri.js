require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

// var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var processArgv = process.argv;
var unique = "";

unique = processArgv[3];

for (var i = 4; i < processArgv.length; i++) {
  unique += ("+" + processArgv[i]); 
}



console.log(unique);

basic();

function basic() {
  
  switch(command) {
      case "concert-this":
      concertThis();
      break;

      case "spotify-this-song":
      spotifyFunction();
      break;

      case "movie-this":
      movieThis();
      break;

      case "do-what-it-says":
      checkRandom();
      break;
  }
}

function concertThis() {
  console.log(unique);
  var queryURL = "https://rest.bandsintown.com/artists/" + unique + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      // console.log(response);
      for (i = 0; i < response.data.length; i++) {
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city);
        console.log("Date of event: " + moment(response.data[i].datetime).format("L"));
        console.log("-------------------------------------------");

      }
    }
  );
}

function spotifyFunction() {
 console.log(unique);

    if (unique === undefined) {
      unique = "The+Sign+Ace+of+Base";
  }

    spotify.search({ type: 'track', query: unique, limit: 1})
    .then(function(response) {

        console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Song Preview: " + response.tracks.items[0].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);
    });
  
}

function movieThis() {
  if (unique === undefined) {
    unique = "Mr.+Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + unique + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      // console.log(response);
      console.log("* Title: " + response.data.Title);
      console.log("* Year: " + response.data.Year);
      console.log("* IMDB Rating: " + response.data.imdbRating);
      console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("* Countries: " + response.data.Country);
      console.log("* Languages: " + response.data.Language);
      console.log("* Plot: " + response.data.Plot);
      console.log("* Actors: " + response.data.Actors);
    }
  );

}


function checkRandom() {
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  unique = "";
  
  var dataArr = data.split(",");

  var dataArrInput = dataArr[1].split(" ")


  unique = dataArrInput[0];

  for (var j = 1; j < dataArrInput.length; j++) {
    unique += ("+" + dataArrInput[j]); 
  }


  command = dataArr[0];

  console.log(command);
  console.log(unique);
  basic();

  });
}