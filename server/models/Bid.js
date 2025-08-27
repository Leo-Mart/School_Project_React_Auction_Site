import mongoose from 'mongoose';

const bidSchema = mongoose.Schema({
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  price: Number,
  date: new Date(),
});

const Bid = mongoose.model('bids', bidSchema);

export default Bid;
