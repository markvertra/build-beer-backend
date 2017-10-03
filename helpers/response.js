module.exports = {

  data: function(req, res, data) {
    res.status(200).json(data);
  },

  ok: function(req, res) {
    res.status(200).json({});
  },

  notFound: function(res) {
    res.status(404).json({error: 'Not found!'});
  },

  unexpectedError: function(req, res, err) {
    console.log(req.method, req.path, err);

    res.status(500).json({error: 'Unexpected error!'});
  },

  emptyFields: function(res) {
    res.status(400).json({error: 'Please complete all fields'});
  },

  nonUniqueUsername: function(res) {
    res.status(400).json({error: 'That username already exists'});
  },

  saveError: function(req, res, err) {
    console.log(req.method, req.path, err);
  
    res.status(400).json({error: '400: Unexpected Error'});
  },

  unauthorised: function(res) {
    res.status(403).json({error: '403: Unauthorised'});
  },


  unprocessable: function(req, res, err) {
    res.status(422).json({
      error: err || 'Unprocessable'
    });
  },

};