var request = require('request');
var token = require('./secret.js');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':'token '+token.GITHUB_TOKEN
      
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}
/*downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")*/

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var val = JSON.parse(result);
  console.log(val);
  for(var x of val){
    downloadImageByURL(x['avatar_url'],"avatars/"+x['login']+".jpg")
    //console.log(x['avatar_url']);
  }
});