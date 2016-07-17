//recommended to be put in seperate file from nodejs_lastfm.js

/* Code by edwin0258 */

/*

Even though we are not using simple-lastfm for main lastfm api functions it really
makes retrieving a session key extremly simple.
Put in your password and username and run the script, the session key it gives you can be
used in nodejs_lastfm.js for life
(and if it does happen to stop working you can always generate a new one).

Cheers!

*/

var Lastfm = require('simple-lastfm');

var lastfm = new Lastfm({
    api_key: 'c08ab1c114238628220faeb531fa1f28',
    api_secret: '61df03ba05687fd1790d232303caf90f',
    username: '',
    password: ''
});

lastfm.getSessionKey(function(result) {
    console.log("session key = " + result.session_key);
    if(result.error) {
      console.log('Error: ' + result.error);
    }
});