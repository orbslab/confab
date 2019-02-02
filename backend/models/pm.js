const mongoose = require('mongoose');

const privateSchema = mongoose.Schema({
  chatId: { type: String, require: true },
  sender: { type: String, require: true },
  email:  { type: String, require: true },
  message:{ type: String, require: true}
});

module.exports = mongoose.model('privateChat', privateSchema, 'privateChat');