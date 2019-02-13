var SpotifyWebApi = require('spotify-web-api-node');
var config = require('./config');

//credentials
var spotifyApi = new SpotifyWebApi({
  clientId: config.spotKey.client_id,
  clientSecret: config.spotKey.client_secret,
  redirectUri: config.spotKey.redirect_uri
});


spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  })
  .then(function(data) {
    // Get Elvis' albums
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function(data) {
        console.log('Artist albums', data.body);
      },
      function(err) {
        console.error(err);
      }
    );
    }, function(err) {
      console.log('Something went wrong getting Elvis...', err.message);
    });
