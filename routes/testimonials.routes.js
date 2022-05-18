const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});
  
router.route('/testimonials/random').get((req, res) => {
  const randomNumber = Math.floor(Math.random() * db.testimonials.length);
  const item = db.testimonials[randomNumber];
  res.json(item);
});
  
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(i => i.id === parseInt(req.params.id)));
});
  
router.route('/testimonials').post((req, res) => {
  const id = uuidv4();
  const { author, text } = req.body;
  
  db.testimonials.push({id: id, author: author, text: text});
  res.json({message: 'OK'});
});
  
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  
  const item = db.testimonials.find(i => i.id === parseInt(req.params.id));
  item.author = author;
  item.text = text;
  
  res.json({message: 'OK'});
});
  
router.route('/testimonials/:id').delete((req, res) => {
  const item = db.testimonials.find(i => i.id === parseInt(req.params.id));
  const itemIndex = db.testimonials.indexOf(item);
  
  db.testimonials.splice(itemIndex, 1);
  res.json({message: 'OK'});
});

module.exports = router;