const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const OrderSchema = new Schema({
  userOrdering: {
    type: String,
  },
  beersOrdered: {
    type: Array
  },
  deliveryDetails: {
    firstName: { type: String},
    lastName: { type: String},
    address: { type: String },
    postCode: { type: String },
    telephoneNumber: { type: String },
    email: { type: String }
  },
  isShipped: {
    type: Boolean,
  }}, 
  { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);