const mongoose = require('mongoose');

const request = mongoose.Schema({
  sender: { type: String, require: true },
  senname: { type: String, require: true },
  senbio: { type: String, require: true },
  reciver: { type: String, require: true }
});

module.exports = mongoose.model('Request', request, 'friendReq');