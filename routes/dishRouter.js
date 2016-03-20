// This helped clear up things
// http://start.jcolemorrison.com/quick-tip-organizing-routes-in-large-express-4-x-apps/

var express = require('express'),
    bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
// Use the body-parser module to parse data sent
dishRouter.use(bodyParser.json());

//Routes for the root path of the application
dishRouter.route('/')
.get(function(req, res, next) {
  Dishes.find({}, function(err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})
.post(function(req, res, next) {
  Dishes.create(req.body, function(err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    var id = dish._id;

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the dish with id: ' + id);
  });
})
.delete(function(req, res, next) {
  Dishes.remove({}, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

// Routes for specific dish
dishRouter.route('/:dishId')
.get(function(req, res, next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})
.put(function(req, res, next) {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  },{
      new: true
  }, function(err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})
.delete(function(req, res, next) {
  Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = dishRouter;
