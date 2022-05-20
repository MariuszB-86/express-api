const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});
  
  router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(i => (i.id === parseInt(req.params.id))));
});
  
router.route('/seats').post((req, res) => {
  const id = uuidv4();
  const { day, seat, client, email } = req.body;

  if(db.seats.some(item => item.seat === seat && item.day === day)){
    res.status(404).json({ message: "The slot is already taken..." });
  } 
  else{
    db.seats.push({id: id, day: day, seat: seat, client: client, email: email});
    res.json({message: 'OK'});
  }
});
  
router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find(i => (i.id === parseInt(req.params.id)));
  const itemIndex = db.seats.indexOf(item);
  
  db.seats.splice(itemIndex, 1);
  res.json({message: 'OK'});
});
  
router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find(i => (i.id === parseInt(req.params.id)));
  const { day, seat, client, email } = req.body;
  
  item.day = day;
  item.seat = seat;
  item.client = client;
  item.email = email;
  
  res.json({message: 'OK'});
});

module.exports = router;