require('./connect');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: Boolean, default: true }
}, {
    versionKey: false
});

var MyUser = mongoose.model('User', User);
exports.MyUser = MyUser;
