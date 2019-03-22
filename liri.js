require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');

// var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var processArgv = process.argv;
var unique = "";

for (var i = 3; i < processArgv.length - 1; i++) {
  unique += (processArgv[i] + "+"); 
}

unique += processArgv[processArgv.length - 1];

console.log(unique);

switch(command) {
    case "concert-this":
    concertThis();
    break;

    case "spotify-this-song":
    spotifyFunction();
    break;

    case "movie-this":
    break;

    case "do-what-it-says":
    break;
}

function concertThis() {
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
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: unique, limit: 1})
    .then(function(response) {

        console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Song Preview: " + response.tracks.items[0].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);
    })
}
