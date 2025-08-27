import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  activeBids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auctions' }],
  favoriteAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auctions' }],
  createdAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auctions' }],
  wonAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auctions' }],
});

const User = mongoose.model('users', userSchema);

export default User;
