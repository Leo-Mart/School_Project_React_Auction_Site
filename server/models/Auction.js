import mongoose from 'mongoose';

const auctionSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  buyout_price: Number,
  startdate: Date,
  expiration: String,
  expired: { type: Boolean, default: false },
  category: String,
  subcategory: String,
  image_urls: String,
  bids: Number,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Kopplar till User-collection
  auctionEndTime: Date,
  sold: Boolean,
  shipping: Number,
  bidders: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      current_bid: Number,
    },
  ],
});

const Auction = mongoose.model('auctions', auctionSchema);

export default Auction;
