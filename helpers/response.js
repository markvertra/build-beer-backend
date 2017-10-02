module.exports = {

  notFound: function(res) {
    res.status(404).json({error: 'Not found!'});
  },

  unexpectedError: function(req, res, err) {
    console.log(req.method, req.path, err);

    res.status(500).json({error: 'Unexpected error!'});
  },

  emptyFields: function(req, res, err) {
    res.status(400).json({error: 'Please complete all fields'});
  },

  nonUniqueUsername: function(req, res, err) {
    res.status(400).json({error: 'That username already exists'});
  },

  saveError: function(req, res, err) {
    console.log(req.method, req.path, err);
  
    res.status(400).json({error: '400: Unexpected Error'});
  },

  unauthorised: function(req, res, err) {
    res.status(403).json({error: '403: Unauthorised'});
  },

};