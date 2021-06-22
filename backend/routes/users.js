const router = require('express').Router();
const User = require('../model/userModel');

// package for encrypting user passwords
const bcrypt = require('bcryptjs');

// package for jwt
const jwt = require('jsonwebtoken');

// authentication middleware
const auth = require('../middleware/auth');



// route to get list of all registered users
router.get('/register', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});



// route function for user registration
router.post('/register', async (req, res) => {
  // form validation for registration
  if (!req.body.name || !req.body.password || !req.body.email) {
    res.status(400).json({ message: 'Please completely fill all fields' });
  }

  if (req.body.name.length > 50) {
    res
      .status(400)
      .json({ message: 'The name length is maximum 50 characters long' });
  }

  const user = await User.findOne({ name: req.body.name });

  if (user) {
    res.status(400).json({ message: 'User account already exist' });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error ' + err));
    });
  });
});



// route function for getting user profile 
router.get('/profile', auth, async(req, res) => {
  const user = await User.findById(req.user._id)
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    date: user.date
  })
})



// route function for deleting user account from themselves
router.delete('/profile', auth, (req, res) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.json('User account deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});



// route function for deleting user account
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Account Deleted'))
    .catch((err) => res.status(400).json('Error ' + err));
});


// route function for user authentication
router.post('/login', async (req, res) => {
  //validation
  if (!req.body.name || !req.body.password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    return res.status(400).send({ message: 'User does not exist' });
  }

  // Load hash from your password DB and compare.
  bcrypt.compare(req.body.password, user.password, function (err, response) {
    if (!response) {
      return res.status(400).send({ message: 'Authentication Error' });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.json({
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          date: user.date,
        },
      });
    }
  });
});


router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('auth-token');
    // if there is no token passed in the request
    if (!token) {
      return res.json('false');
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if no jwt secret key can be found
    if (!verified) {
      return res.json('false');
    }

    const user = await User.findById(verified._id);
    // if user cannot be found
    if (!user) {
      return res.json('false');
    }

    // else return true and allow access
    return res.json(true);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
