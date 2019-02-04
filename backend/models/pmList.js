const mongoose = require('mongoose');

const privateChatList = mongoose.Schema({
  user1: { type: String, require: true },
  username1: { type: String, require: true },
  user2:  { type: String, require: true },
  username2: { type: String, require: true }
});

module.exports = mongoose.model('PrivateChatList', privateChatList, 'pmList');