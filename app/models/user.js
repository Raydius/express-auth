var mongoose = require('mongoose'),
	findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	googleId: Number,
	displayName: String,
	domain: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);