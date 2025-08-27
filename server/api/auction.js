import Auction from '../models/Auction.js';
import User from '../models/User.js';

export default function (server) {
  // get all the auctions in the database
  server.get('/api/auctions', async (req, res) => {
    const auction = await Auction.find();
    res.json(auction);
  });

  // get an individual auction
  server.get('/api/auctions/:id', async (req, res) => {
    const auction = await Auction.findById(req.params.id).populate('seller');
    res.json(auction);
  });

  // creates a new auction
  server.post('/api/auctions', async (req, res) => {
    const newAuction = new Auction(req.body);
    const savedAuction = await newAuction.save();

    res.json(savedAuction);
  });

  // update existing auctions
  server.put('/api/auctions/:id', async (req, res) => {
    console.log(req.body);
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAuction) {
      return res.status(404).json({ message: 'Kunde inte hitta auktionen' });
    }

    res.json(updatedAuction);
  });

  server.patch('/api/updatebid/:id', async (req, res) => {
    // updates the auction in the auctions collection
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // convert the mongodb id to a string
    const auctionId = updatedAuction._id;
    const auctionIdString = auctionId.toString();

    //adds the id of the auction to the activeBids array of the user, so it will show up on the users page
    if (!req.session.user.activeBids.includes(auctionIdString)) {
      const updateUser = await User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { activeBids: updatedAuction._id } },
        { new: true }
      );

      req.session.user.activeBids.push(updatedAuction._id);
    }

    // adds the id of the auction to the sessions user object

    await req.session.save();

    res.json(updatedAuction);
  });

  // deletes an auction from the database
  server.delete('/api/auctions/:id', async (req, res) => {
    const deleteAuction = await Auction.findByIdAndDelete(req.params.id);

    if (!deleteAuction) {
      return res.status(404).json({ message: 'Kunde inte hitta auktionen' });
    }

    res.json({ message: 'Auktionen har blivit borttagen.' });
  });
}
