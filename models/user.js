const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'name is required']
  },
  password: {
    type: String,
    required: [true, 'description is required']
  },
  userDetails: {
    firstName: { type: String},
    lastName: { type: String},
    address: { type: String },
    postCode: { type: String },
    telephoneNumber: { type: String },
    email: { type: String }
  },
  beersBuilt: {
    type: Schema.Types.ObjectId,
    ref: 'Beer'
  },
  ordersMade: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
});

module.exports = mongoose.model('User', UserSchema);