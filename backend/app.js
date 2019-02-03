const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const User        = require('./models/users');
const Login       = require('./models/login');
const pm          = require('./models/pm');
const gm          = require('./models/gm');
const fnreq       = require('./models/fndReq');
const pmlist      = require('./models/pmList');

const app = express();

mongoose.connect("mongodb+srv://sadi:8DCdoYMQaOQXC87y@cluster-af195.mongodb.net/confab?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected To Database!!');
  }).catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Register New User
app.post('/confab/users/', (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio
  });
  user.save().then(createdUser => {
    res.status(201).json({
      message: "User Signup Successfully!"
    });
  });
});

// Login User
app.get('/confab/users/:email', (req, res, next) => {
  Login.findOne({email: req.params.email}).then(documents => {
    res.status(200).json({
      message: "Request For "+req.params.sid+" Is Goted",
      info: documents
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Send Private Message
app.post('/confab/privateChat/', (req, res, next) => {
  const msg = new pm({
    chatId: req.body.chatId,
    sender: req.body.sender,
    email: req.body.email,
    message: req.body.message
  });
  msg.save().then(sendMsg => {
    res.status(201).json({
      msg: "Message Send Successfully!"
    });
    console.log(sendMsg);
  });
});

// Get Private Message
app.get('/confab/privateChat/:chatId', (req, res, next) => {
  pm.find({chatId: req.params.chatId}).then(response => {
    res.status(200).json({
      message: "Request For "+req.params.chatId+" Is Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Send Group Message
app.post('/confab/groupChat/', (req, res, next) => {
  const msg = new gm({
    gid: req.body.gid,
    sender: req.body.sender,
    email: req.body.email,
    message: req.body.message
  });
  msg.save().then(sendMsg => {
    res.status(201).json({
      msg: "Message Send Successfully!"
    });
    console.log(sendMsg);
  });
});

// Get Group Message
app.get('/confab/groupChat/:gid', (req, res, next) => {
  gm.find({gid: req.params.gid}).then(response => {
    res.status(200).json({
      message: "Request For "+req.params.gid+" Is Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Get User Profile
app.get('/confab/profile/:email', (req, res, next) => {
  User.findOne({email: req.params.email}).then(response => {
    res.status(200).json({
      message: "Request For "+req.params.email+" Is Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Edit User Profile
app.get('/confab/upprofile/:email/:type/:value', (req, res, next) => {
  if(req.params.type == 'name') {
    var query = { name: req.params.value };
  } else if(req.params.type == 'bio') {
    var query = { bio: req.params.value };
  }
  
  User.findOneAndUpdate({email: req.params.email}, query).then(response => {
    res.status(200).json({
      message: "Update Request Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Add User Interest
app.get('/confab/upinterest/:email/:value', (req, res, next) => {
  User.findOneAndUpdate({email: req.params.email}, { $push: {interests: req.params.value}}).then(response => {
    res.status(200).json({
      message: "Interest Update Request Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Delete User Interest
app.get('/confab/delinterest/:email/:value', (req, res, next) => {
  User.findOneAndUpdate({email: req.params.email}, { $pull: {interests: req.params.value}}).then(response => {
    res.status(200).json({
      message: "Interest Delete Request Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Search People
app.get('/confab/search/:value', (req, res, next) => {
  User.find({name: {$regex: '/*' + req.params.value + '/*'}}).then(response => {
    res.status(200).json({
      message: "Search Request Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// Suggestion Profile
app.get('/confab/suggestion/:value', (req, res, next) => {
  User.find({interests: {$all: req.params.value}}).then(response => {
    res.status(200).json({
      message: req.params.value+" Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

//Send Friend Request
app.post('/confab/friendrequest/', (req, res, next) => {
  const send = new fnreq({
    sender: req.body.sender,
    senname: req.body.senname,
    senbio: req.body.senbio,
    reciver: req.body.reciver
  });
  send.save().then(sendMsg => {
    res.status(201).json({
      msg: "Friend Request Send Successfully!"
    });
    console.log(sendMsg);
  });
});

//Get Friend Requests
app.get('/confab/friendrequest/:email', (req, res, next) => {
  fnreq.find({reciver: req.params.email}).then(response => {
    res.status(200).json({
      message: "Request For "+req.params.email+" Is Goted",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

//Added Friends
app.get('/confab/addfriend/:sender/:reciver', (req, res, next) => {
  User.findOneAndUpdate({email: req.params.sender}, { $push: {friends: req.params.reciver}}).then(response => {
    res.status(200).json({
      message: "success",
      info: response
    });
  })
  .catch(err => {
    console.log(err);
  });
});

//Delete Add Request
app.delete('/confab/addfriend/:id', (req, res, next) => {
  fnreq.deleteOne({_id: req.params.id}).then(response => {
    res.status(200).json({ message: 'Request Deleted'});
  })
  .catch(err => {
    console.log(err);
  });
});

//Create Private Chat
app.post('/confab/createpm/', (req, res, next) => {
  const pc = new pmlist({
    user1: req.body.user1,
    user2: req.body.user2
  });
  pc.save().then(sendMsg => {
    res.status(201).json({
      msg: "New Private Chat Created"
    });
  });
});

module.exports = app;