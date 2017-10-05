const express  = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt   = require('bcrypt');
const User     = require('../../models/user').User;
const response = require('../../helpers/response');
const salt     = bcrypt.genSaltSync(10);

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    console.log("no username")
    return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  }
  if (!password) {
    console.log("no password")
    return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  }

  User.findOne({
    username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      console.log("user exists")
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          console.log("not logged in")
          return next(err);
        }
        console.log(newUser + "signed up +");
        return response.data(req, res, newUser.asData());
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.notFound(req, res);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return response.data(req, res, req.user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  console.log("Logged out" + req.user);
  return response.ok(req, res);
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user + "Logged In");
    let user = req.user;
    return response.data(req, res, user.asData());
  }
  console.log("not logged in");
  return response.notFound(req, res);
});

router.get('/userInfo/:id', (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    response.notFound(res);
    return;
  }
  User.findById(req.params.id, (err, data) => {

    if(err){
      response.unexpectedError(req, res, err);
      return;
    }

    if(!data){
      response.notFound(res);
      return;
    }

    res.json(data);
  });
});

module.exports = router;