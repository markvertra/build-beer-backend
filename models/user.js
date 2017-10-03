const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt = require('bcrypt');

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

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.asData = function() {
  return {
    id: this._id,
    username: this.username,
    password: this.password,
    userDetails: this.userDetails,
    beersBuilt: this.beersBuilt,
    ordersMade: this.ordersMade
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};