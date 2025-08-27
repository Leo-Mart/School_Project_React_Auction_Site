import { populate } from 'dotenv';
import User from '../models/User.js';
import crypto from 'crypto';
import Auction from '../models/Auction.js';

const salt = 'grupp4cool';
// function for encrypting passwords
export function getHash(password) {
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

export default function (server) {
  // get all users
  server.get('/api/users', async (req, res) => {
    const user = await User.find();
    res.json(user);
  });

  // get a specific user and populate their arrays
  server.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id, '-password')
      .populate({
        path: 'createdAuctions',
      })
      .populate({ path: 'activeBids' })
      .populate({ path: 'favoriteAuctions' })
      .populate({ path: 'wonAuctions' });
    res.json(user);
  });

  // update the user
  server.put('/api/users/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { $push: { createdAuctions: req.body } };

    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    req.session.user = updatedUser;
    await req.session.save();
    res.json(updatedUser);
  });

  // updates the users favorite auctions
  server.put('/api/updatefavorites/:id', async (req, res) => {
    console.log(req.body, 'rad 47');
    if (!req.session.user.favoriteAuctions.includes(req.body._id)) {
      const filter = { _id: req.params.id };
      const update = { $push: { favoriteAuctions: req.body } };
      console.log('denna lägger till i databasen');

      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });

      req.session.user = updatedUser;
      await req.session.save();
      res.json(updatedUser);
    } else {
      req.session.user.favoriteAuctions.splice(req.body, 1); // not really sure why this works, if I'm thinking right req.body in this case should be a ID sent from the frontend. Maybe it finds it in the array and splices from that index?
      console.log('denna tar bort från databasen');

      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { favoriteAuctions: req.body._id },
        },
        { new: true }
      );

      req.session.user = updateUser;
      await req.session.save();
      res.json(updateUser);
    }
  });

  // updates the user if/when they win an auction
  server.put('/api/wonbid/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { $push: { wonAuctions: req.body } };
    const updateExpired = { expired: true };

    const updateAuction = await Auction.findByIdAndUpdate(
      req.body._id,
      updateExpired,
      {
        new: true,
      }
    );
    await updateAuction.save();

    const user = await User.findById(req.params.id).lean();
    let exists = user.wonAuctions.some((auction) => {
      return auction.equals(req.body._id);
    });

    if (!exists) {
      const updateUser = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      req.session.user = updateUser;
      await req.session.save();
      res.json(updateUser);
    }
  });

  // update the user
  server.put('/api/users_create_auction/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { $set: { createdAuctions: req.body } };
    // console.log(req.body);

    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    req.session.user = updatedUser;
    await req.session.save();
    res.json(updatedUser);
  });

  // register new user
  server.post('/api/users', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log('användare finns redan');
      res.status(409).json({
        message: 'email används redan, använd någon annan email eller logga in',
      });
    } else {
      try {
        const newUser = new User({
          email: req.body.email,
          password: getHash(req.body.password),
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          activeBids: [],
          favoriteAuctions: [],
          createdAuctions: [],
          wonAuctions: [],
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Användare skapad' });
      } catch (err) {
        console.log(err);
        res.status(err).json({ message: 'Något gick fel i /api/users' });
      }
    }
  });
}
