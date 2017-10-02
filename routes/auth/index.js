const express  = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt   = require('bcrypt');
const User     = require('../../models/user');
const response = require('../../helpers/response');
const salt     = bcrypt.genSaltSync(10);

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    response.emptyFields(req, res, err);
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      response.nonUniqueUsername(req, res, err);
      return;
    }
  
    const theUser = new User({
      username,
      password: bcrypt.hashSync(password, salt)
    });

    theUser.save((err) => {
      if (err) {
        response.saveError(req, res, err);
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          response.unexpectedError(req, res, err);
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      response.unexpectedError(req, res, err);
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        response.unexpectedError(req, res, err);
        return;
      }

      res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  response.unauthorised(req, res, err);
});

router.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }
  response.unauthorised(req, res, err);
});

module.exports = router;