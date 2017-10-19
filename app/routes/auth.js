var express = require('express');
var router = express.Router();

// API credentials
var creds = require('../config/creds');


// initialize MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/expressauth');
var User = require('../models/user');

// initialize PassportJS for Google Auth
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
		clientID: creds.googleAuth.clientID,
		clientSecret: creds.googleAuth.clientSecret,
		callbackURL: creds.googleAuth.callbackUrl
	},
	function(accessToken, refreshToken, profile, cb) {
		User.findOrCreate({ googleId: profile.id }, function (err, user, created) {

			if(err) {
				console.log('err', err);
			}

			if(created) {
				console.log('created!');
			}
			else {
				console.log('found!');
			}

			// get current metadata from Google profile
			user.displayName = profile.displayName;
			user.domain = profile._json.domain;
			user.save();

			console.log('user', user);

			return cb(null, user);
		});
	}
));

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

router.get('/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/');
	}
);

// login screen
router.get('/login', function(req, res, next) {
	res.render('login');
});

// logout screen
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;


/*
 req.user output
 nodeapi_1  | user { id: '110901506008463042994',
 nodeapi_1  |   displayName: 'Ray Dollete',
 nodeapi_1  |   name: { familyName: 'Dollete', givenName: 'Ray' },
 nodeapi_1  |   emails: [ { value: 'rdollete@phenomenon.com', type: 'account' } ],
 nodeapi_1  |   photos: [ { value: 'https://lh4.googleusercontent.com/-nVdUvudiigQ/AAAAAAAAAAI/AAAAAAAAAAw/12fGTbq7wQg/photo.jpg?sz=50' } ],
 nodeapi_1  |   provider: 'google',
 nodeapi_1  |   _raw: '{\n "kind": "plus#person",\n "etag": "\\"Sh4n9u6EtD24TM0RmWv7jTXojqc/rmBt9lTBjYulL8wNc2_Sm9umgwU\\"",\n "emails": [\n  {\n   "value": "rdollete@phenomenon.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "110901506008463042994",\n "displayName": "Ray Dollete",\n "name": {\n  "familyName": "Dollete",\n  "givenName": "Ray"\n },\n "image": {\n  "url": "https://lh4.googleusercontent.com/-nVdUvudiigQ/AAAAAAAAAAI/AAAAAAAAAAw/12fGTbq7wQg/photo.jpg?sz=50",\n  "isDefault": false\n },\n "isPlusUser": false,\n "language": "en",\n "verified": false,\n "domain": "phenomenon.com"\n}\n',
 nodeapi_1  |   _json:
 nodeapi_1  |    { kind: 'plus#person',
 nodeapi_1  |      etag: '"Sh4n9u6EtD24TM0RmWv7jTXojqc/rmBt9lTBjYulL8wNc2_Sm9umgwU"',
 nodeapi_1  |      emails: [ [Object] ],
 nodeapi_1  |      objectType: 'person',
 nodeapi_1  |      id: '110901506008463042994',
 nodeapi_1  |      displayName: 'Ray Dollete',
 nodeapi_1  |      name: { familyName: 'Dollete', givenName: 'Ray' },
 nodeapi_1  |      image:
 nodeapi_1  |       { url: 'https://lh4.googleusercontent.com/-nVdUvudiigQ/AAAAAAAAAAI/AAAAAAAAAAw/12fGTbq7wQg/photo.jpg?sz=50',
 nodeapi_1  |         isDefault: false },
 nodeapi_1  |      isPlusUser: false,
 nodeapi_1  |      language: 'en',
 nodeapi_1  |      verified: false,
 nodeapi_1  |      domain: 'phenomenon.com' } }
 */