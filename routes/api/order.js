var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var response = require('../../helpers/response');

//GET ALL ORDERS
router.get('/', function(req, res, next) {

  Order.find({}, (err, data) => {
    if(err){
      response.unexpectedError(res);
      return;
    }
    res.json(data);
  });
});
  
// GET ONE ORDER
router.get('/:id', function(req, res, next) {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    response.notFound(res);
    return;
  }
  Order.findById(req.params.id, (err, data) => {

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

// ADD NEW ORDER
router.post('/', function(req, res, next) {
  const newOrder = new Order({
    userOrdering: req.body.userOrdering,
    beersOrdered: req.body.beersOrdered,
    deliverydetails: req.body.deliveryDetails,
    isShipped: req.body.isShipped
  });
  
  newOrder.save( (err) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }

    return res.status(200).json(newOrder);
  });
});

// UPDATE ONE Order
router.post('/:id', function(req, res, next) {
  const updatedOrder = new Order({
    userOrdering: req.body.userOrdering,
    beersOrdered: req.body.beersOrdered,
    deliverydetails: req.body.deliveryDetails,
    isShipped: req.body.isShipped
  });

  Order.findByIdAndUpdate(req.params.id, updatedOrder, (err, order) => {
    if (err) { 
      response.unexpectedError(req, res, err);
      return;
    }
    
    return res.status(200).json(updatedOrder);
  });
});

// DELETE ONE Order
router.post('/delete/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, (err, order) => {
    if (err) {
      response.unexpectedError(req, res, err);
      return;
      }

    return res.status(200).json(order);
  });
});

module.exports = router;