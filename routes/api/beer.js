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

//GET ALL PUBLIC BEERS
router.get('/public', function(req, res, next) {
  
    Beer.find({isPublic: true}, (err, data) => {
      if(err){
        response.unexpectedError(res);
        return;
      }
      res.json(data);
    });
  });

//GET ALL PRIVATE BEERS
router.get('/private', function(req, res, next) {
  
    Beer.find({isPublic: false}, (err, data) => {
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

// GET ALL BEERS BY USER
router.get('/byuser/:id', function(req, res, next) {

  Beer.find({creatorId: req.params.id}, (err, data) => {

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

// GET ALL PUBLIC BEERS BY USER
router.get('/byuser/:id/public', function(req, res, next) {
  
    Beer.find({creatorId: req.params.id, isPublic: true}, (err, data) => {
  
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

// GET ALL PRIVATE BEERS BY USER
router.get('/byuser/:id/private', function(req, res, next) {
  
    Beer.find({creatorId: req.params.id, isPublic: false}, (err, data) => {
  
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
    searchable: req.body.name + " " + req.body.beerDetails.style + " " + req.body.beerDetails.extraFlavours + " " + req.body.labelSlogan,
    beerDetails: req.body.beerDetails,
    creatorId: req.body.creatorId,
    label: {
      color: req.body.labelColor,
      fontColor: req.body.labelFontColor,
      font: req.body.labelFont,
      image: req.body.labelImage,
      imageLink: req.body.labelImageLink,
      slogan: req.body.labelSlogan
    },
    cap: {
      color: req.body.capColor
    },
    isPublic: req.body.isPublic,
    reviews: {}
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
  const updatedBeer = {
    name: req.body.name,
    description: req.body.description,
    beerDetails: {
      style: req.body.style,
      color: req.body.color,
      opacity: req.body.opacity,
      extraFlavours: [req.body.flavors],
    },
    searchable: req.body.name + " " + req.body.style + " " + req.body.flavors + " " + req.body.labelSlogan,
    creatorId: req.body.creatorId,
    label: {
      color: req.body.labelColor,
      fontColor: req.body.labelFontColor,
      font: req.body.labelFont,
      image: req.body.labelImage,
      slogan: req.body.labelSlogan
    },
    cap: {
      color: req.body.capColor
    },
    isPublic: req.body.isPublic,
    reviews: {}
  };

  Beer.findByIdAndUpdate(req.params.id, updatedBeer, (err, beer) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }
    return res.status(200).json(updatedBeer);
  });
});

//ADD A REVIEW
router.post('/review/:id', function(req, res, next) {
  console.log(req.body)
  const id = req.params.id;
  const updatedBeer = {
    reviews: req.body
  };

  Beer.findByIdAndUpdate(id, updatedBeer, (err, beer) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }
    
    return res.status(200).json(beer);
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