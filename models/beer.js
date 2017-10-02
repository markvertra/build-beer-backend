const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const listOfCapColours = ['blue', 'red', 'silver', 'gold'];
const listOfBeerTypes = ['IPA', 'Porter', 'Stout', 'Lager', 'Pale Ale',
                         'Saison', 'Hefe-weissen', 'Red Ale'];

const BeerSchema = new Schema({
  name: {
    type: String
  },
  beerDetails: {
    type: { enum: listOfBeerTypes },
    extraColorants: { type: String },
    extraFlavors: { type: String},
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
    type: { enum: listOfCapColours }
  }
});

module.exports = mongoose.model('Beer', BeerSchema);