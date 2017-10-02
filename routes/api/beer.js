const express = require('express');
const router = express.Router();
const Beer = require('../../models/beer');
const response = require('../../helpers/response');

//GET ALL BEERS
router.get('/', function(req, res, next) {

  Beer.find({}, (err, data) => {
    if(err){
      response.unexpectedError(res);
      return;
    }
    res.json(data);
  });
});

// GET ONE BEER
router.get('/:id', function(req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    response.notFound(res);
    return;
  }
  Beer.findById(req.params.id, (err, data) => {

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

// ADD NEW BEER 
router.post('/', function(req, res, next) {

  const newBeer = new Beer({
    name: req.body.name,
    description: req.body.description,
    beerDetails: req.body.beerDetails,
    creatorId: req.body.creatorId,
    label: {
      imageURL: req.body.imageURL,
    },
    cap: {
      color: req.body.capColor
    },
    isDraft: req.body.isDraft
  });
  
  newBeer.save( (err) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }

    return res.status(200).json(newBeer);
  });
});

// UPDATE ONE BEER
router.post('/:id', function(req, res, next) {
  const updatedBeer = new Beer({
    name: req.body.name,
    description: req.body.description,
    beerDetails: {
      style: req.body.style,
      extraColorants: req.body.colorants,
      extraFlavors: req.body.flavors,
      timeToAge: req.body.aging
    },
    creatorId: req.body.creatorId,
    label: {
      imageURL: req.body.imageURL,
    },
    cap: {
      color: req.body.capColor
    },
    isDraft: req.body.isDraft
  });

  Beer.findByIdAndUpdate(req.params.id, updatedBeer, (err, beer) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }
    
    return res.status(200).json(updatedBeer);
  });
});

// DELETE ONE BEER
router.post('/delete/:id', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.id, (err, beer) => {
    if (err) {
      response.unexpectedError(req, res, err);
      return;
      }

    return res.status(200).json(beer);
  });
});


module.exports = router;