const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});
  
router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(i => i.id === parseInt(req.params.id)));
});
  
router.route('/concerts').post((req, res) => {
  const id = uuidv4();
  const {performer, genre, price, day, image} = req.body;
  
  db.concerts.push({id: id, performer: performer, genre: genre, price: price, day: day, image: image});
  res.json({message: 'OK'});
});
  
router.route('/concerts/:id').delete((req, res) => {
  const item = db.concerts.find(i => (i.id === parseInt(req.params.id)));
  const itemIndex = db.concerts.indexOf(item);
  
  db.concerts.splice(itemIndex, 1);
  res.json({message: 'OK'});
});
  
router.route('/concerts/:id').put((req, res) => {
  const item = db.concerts.find(i => (i.id === parseInt(req.params.id)));
  const { performer, genre, price, day, image } = req.body;
  
  item.performer = performer;
  item.genre = genre;
  item.price = price;
  item.day = day;
  item.image = image;
  
  res.json({message: 'OK'});
});

module.exports = router;