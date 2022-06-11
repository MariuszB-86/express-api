const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testOne = new Concert({ _id: '5d9f1140f10a81216cfd4400', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
    await testOne.save();
  
    const testTwo = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Rebekah Parker', genre: 'Pop', price: 40, day: 2, image: '/img/uploads/1fsd324fsdg.jpg'});
    await testTwo.save();

    const testSeatOne = new Seat({_id: '6299ec72b2dcdbbdca195917', day: 1, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com'});
    await testSeatOne.save();  

    const testSeatTwo = new Seat({_id: '6299ec72b2dcdbbdca195915', day: 2, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com'});
      await testSeatTwo.save();  

    const testSeatThree = new Seat({_id: '6299ec72b2dcdbbdca195919', day: 1, seat: 4, client: 'Amanda Doe', email: 'amandadoe@example.com'});
    await testSeatThree.save();  
  });


  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });
  
  it('should return concert assigned to day ', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].tickets).to.be.equal(48);
    expect(res.body[1].tickets).to.be.equal(49);
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });
  
});