const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listOfCapColours = ['blue', 'red', 'silver', 'gold'];
const listOfBeerTypes = ['IPA', 'Porter', 'Stout', 'Lager', 'Pale Ale',
                         'Wheat Beer', 'Red Ale'];
const listOfBeerPrices = { IPA: 2.50, Porter: 2.50, Stout: 2.50, Lager: 2.50,
                          Pale: 2.50, Hefeweissen: 2.50, Red: 2.50 };

const BeerSchema = new Schema({
  name: {
    type: String
  },
  beerDetails: {
    style: { type: String },
    opacity: { type: String },
    extraFlavours: { type: Array },
    timeToAge: {type: Number }
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  label: {
    color: { type: String }
  },
  cap: {
    color: { type: String }
  },
  isDraft: {
    type: Boolean
  }
});

module.exports = mongoose.model('Beer', BeerSchema);