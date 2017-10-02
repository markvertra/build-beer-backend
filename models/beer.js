const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listOfCapColours = ['blue', 'red', 'silver', 'gold'];
const listOfBeerTypes = ['IPA', 'Porter', 'Stout', 'Lager', 'Pale Ale',
                         'Saison', 'Hefe-weissen', 'Red Ale'];
const listOfBeerPrices = { IPA: 2.50, Porter: 2.50, Stout: 2.50, Lager: 2.50,
                          Pale: 2.50, Hefeweissen: 2.50, Red: 2.50 };

const BeerSchema = new Schema({
  name: {
    type: String
  },
  beerDetails: {
    style: { enum: listOfBeerTypes },
    extraColorants: { type: Array },
    extraFlavors: { type: Array },
    timeToAge: {type: Number }
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  label: {
    imageURL: { type: String }
  },
  cap: {
    color: { enum: listOfCapColours }
  },
  isDraft: {
    type: Boolean
  }
});

module.exports = mongoose.model('Beer', BeerSchema);