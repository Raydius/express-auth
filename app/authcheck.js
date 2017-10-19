
var creds = require('./config/creds');

exports.ensureLogin = function(req, res, next) {

	// if there is already a valid session...
	if(typeof req.user !== 'undefined') {

		// check proper domain if one was specified
		if(typeof creds.domainCheck !== 'undefined') {

			console.log('Required domain: '+creds.domainCheck);

			if (req.user.domain !== creds.domainCheck) {
				req.logout();
				res.render('error-domain', { domain: creds.domainCheck });
			}

			// all is ok, proceed...
			else {
				next();
			}
		}

	}
	// otherwise, redirect to the login screen
	else {
		res.redirect('/auth/login');
	}
};