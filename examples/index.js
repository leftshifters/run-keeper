var express = require('express');
var http = require('http');
var runkeeper = require('../lib/runkeeper');

var app = express();
var port = 3456;

var run = new runkeeper();
run.options.client_id = "";
run.options.client_secret = "";
run.options.redirect_uri = "http://localhost:" + port;

app.get('/login', function(req, res) {
	res.redirect(run.getAuthorizationURL());
});
app.get('/runkeeper', function(req, res) {
	var authorization_code = req.query.code;
	run.getAccessToken(authorization_code, function(err, data) {
		if(err) console.log(err);
		else {
			run.getFitnessActivities(data, function(err, data) {
				if(err) console.log(err);
				else console.log(data);
			});
		}
	});
});


http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});