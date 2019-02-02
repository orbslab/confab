const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true},
  bio: { type: String, require: true},
  pic: { type: String},
  interests: [{type: String}],
  friends: [{type: String}]
});

module.exports = mongoose.model('User', userSchema, 'users');