var LastFmNode = require('lastfm').LastFmNode;
var lastfm = new LastFmNode({
  api_key: 'c08ab1c114238628220faeb531fa1f28',
  secret : '61df03ba05687fd1790d232303caf90f'
});
//video title to artist/title
var getArtistTitle = require('get-artist-title');

var song_scrobbled = true;
function checkVideo(){
  if(bot.getMedia() !== undefined){
    //if the song has been playing for at-least 40 seconds scrobble it to last.fm
    if(song_scrobbled === false && Math.floor((bot.getTimeElapsed() / 1000)) > 40){
      //to ensure each song is only scrobbled once.
      song_scrobbled = true;
      
      //get correct meta-data
      video = bot.getMedia().name;
      video_meta = getArtistTitle(video);
      
      // only scrobble track if artist and track name can be extracted correctly.
      if(video_meta !== undefined && video_meta[0] !== '' && video_meta[1] !== ''){
        lastfm.request("track.scrobble", {
          artist: video_meta[0],
          track: video_meta[1],
          api_key: lastfm.api_key,
          // add session key in '' from session.js
          // a session key lasts a lifetime so once you have it no need to get another one
          sk: '',
          timestamp: Math.floor(Date.now() / 1000),
          handlers: {
            //will give you json response from last.fm server
            success: function(data) {
                console.log("Success: " + JSON.stringify(data));
            },
            error: function(error) {
                console.log("Error: " + error.message);
            }
          }
        });
      }
      //lets you know if meta-data for video failed to be extracted.
      else{
          console.log('!!!Video meta data could not be extracted!!!');
      }
      
  }
  //runs when detecting a new song being played
  if(bot.getMedia() !== undefined && bot.getMedia().name != video){
      //set scrobbled to false so song can be scrobbled eventually.
      song_scrobbled = false;
      video = bot.getMedia().name
      video_meta = getArtistTitle(video);
      //bot.sendChat("Now Playing: " + video);
      
      
      if(video_meta !== undefined && video_meta[0] !== '' && video_meta[1] !== ''){
          lastfm.request("track.updateNowPlaying", {
              artist: video_meta[0],
              track: video_meta[1],
              api_key: lastfm.api_key,
              //add same session key again.
              sk: '',
              timestamp: Math.floor(Date.now() / 1000),
              handlers: {
                  success: function(data) {
                      console.log("Success: " + JSON.stringify(data));
                  },
                  error: function(error) {
                      console.log("Error: " + error.message);
                  }
              }
          });
      }
      else{
          console.log('!!!Video meta data could not be extracted!!!');
      }
    }
  }
}
//checkvideo every 2 seconds
setInterval(checkVideo, 2000);