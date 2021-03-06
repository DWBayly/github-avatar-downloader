var request = require('request');
var token = require('./secret.js');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}
var owner = process.argv[2];
var repo =  process.argv[3];
if(owner === undefined || repo === undefined){
  console.log("Invalid values");
}else{
  getRepoContributors(owner, repo, function(err, result) {
    console.log("Errors:", err);
    var val = JSON.parse(result);
    console.log(val);
    for(var x of val){
      downloadImageByURL(x['avatar_url'], "avatars/" + x['login'] + ".jpg");
    }
  });
}