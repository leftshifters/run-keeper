var request = require('request');
var util = require('util');
var Emitter = require('events').EventEmitter;

module.exports = RunKeeper;

function RunKeeper() {
	var self = this;

	this.options = {
		client_id: "",
		client_secret: "",
		authorization_url: "https://runkeeper.com/apps/authorize",
		access_token_url: "https://runkeeper.com/apps/token",
		redirect_uri: ""
	};
}

util.inherits(RunKeeper, Emitter);

RunKeeper.prototype.getAuthorizationURL = function() {
	var return_url = RunKeeper.options.authorization_url + '?' + 'client_id=' + RunKeeper.options.client_id + '&response_type=code' + '&redirect_uri=' + RunKeeper.options.redirect_uri;
	return return_url;
};

RunKeeper.prototype.getAccessToken = function(authorization_code, callback) {
	var params = 'grant_type=authorization_code' + '&code=' + authorization_code + '&client_id=' + RunKeeper.options.client_id + '&client_secret=' + RunKeeper.options.client_secret + '&redirect_uri=' + RunKeeper.options.redirect_uri;
	request({
		method: "POST",
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		uri: RunKeeper.options.access_token_url,
		body: params
	}, function(err, response, body) {
		if(err) console.log(err);
		var data = JSON.parse(body);
		callback(err, data.access_token);
	})
};

RunKeeper.prototype.getAccessToken = function(authorization_code, callback) {
	var params = 'grant_type=authorization_code' + '&code=' + authorization_code + '&client_id=' + RunKeeper.options.client_id + '&client_secret=' + RunKeeper.options.client_secret + '&redirect_uri=' + RunKeeper.options.redirect_uri;
	request({
		method: "POST",
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		uri: RunKeeper.options.access_token_url,
		body: params
	}, function(err, response, body) {
		if(err) console.log(err);
		var data = JSON.parse(body);
		callback(err, data.access_token);
	})
};

RunKeeper.prototype.getData = function(type, accept, access_token, callback) {
	request({
		method: "GET",
		headers: {
			'authorization': 'Bearer ' + access_token,
			'accept': 'application/vnd.com.runkeeper.' + accept + '+json'
		},
		uri: 'http://api.runkeeper.com/' + type
	}, function(err, response, body) {
		if(err) console.log(err);
		var data = JSON.parse(body);
		callback(err, data);
	});
};

RunKeeper.prototype.getFitnessActivities = function(access_token, callback) {
	RunKeeper.getData('fitnessActivities', 'FitnessActivityFeed', access_token, callback);
};