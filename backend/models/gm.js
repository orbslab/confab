const mongoose = require('mongoose');

const grpSchema = mongoose.Schema({
  gid: { type: String, require: true },
  sender: { type: String, require: true },
  email: { type: String, require: true },
  message: { type: String, require: true}
});

module.exports = mongoose.model('GroupChat', grpSchema, 'groupChat');