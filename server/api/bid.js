//import Auction from '../models/Auction.js';
//import User from '../models/User.js';
import Bid from '../models/Bid.js';

export default function (server) {
  // Gets all bids in the database
  server.get('/api/bids', async (req, res) => {
    const bid = await Bid.find();
    res.json(bid);
  });

  // get an individual auction
  server.get('/api/bids/:id', async (req, res) => {
    const bid = await Bid.findById(req.params.id);
    res.json(bid);
  });

  // Create a new bid
  server.post('/api/bids', async (req, res) => {
    const newBid = new Bid(req.body);
    const savedBid = await newBid.save();

    res.json(savedBid);
  });

  // update existing bids
  server.put('/api/bids/:id', async (req, res) => {
    console.log(req.body);
    const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBid) {
      return res.status(404).json({ message: 'Kunde inte hitta budet' });
    }
    res.json(updatedBid);
  });

  // deletes an auction from the database
  server.delete('/api/bids/:id', async (req, res) => {
    const deleteBid = await Bid.findByIdAndDelete(req.params.id);
    if (!deleteBid) {
      return res.status(404).json({ message: 'Kunde inte hitta budet' });
    }
    res.json({ message: 'Budet har blivit borttagen.' });
  });
}
