const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    const concerts = await Concert.find();
    let updatedConcerts = []; 
  
    for(let concert of concerts){
      let seatsByDay = [];
      for(let seat of seats){
        if(concert.day === seat.day){
          seatsByDay.push(seat);
        }
      }
      concert = {
        _id: concert._id,
        performer: concert.performer,
        genre: concert.genre,
        price: concert.price,
        day: concert.day,
        image: concert.image,
        tickets: 50 - seatsByDay.length
      }
      updatedConcerts.push(concert);
    }
    
    res.json(updatedConcerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {

  try {
  
    const {performer, genre, price, day, image} = req.body;
    const newConcert = new Concert({ 
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image 
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, 
        { $set: { 
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image }
        });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};