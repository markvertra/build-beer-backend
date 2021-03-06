const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BeerSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  beerDetails: {
    style: { type: String },
    color: { type: String},
    opacity: { type: String },
    extraFlavours: { type: Array, default: 'None' },
    timeToAge: {type: Number }
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  searchable: {
    type: String,
    default: ''
  },
  label: {
    color: { type: String },
    fontColor: { type: String },
    font: { type: String },
    image: { type: String },
    imageLink: { type: String},
    slogan: { type: String }

  },
  cap: {
    color: { type: String }
  },
  isPublic: {
    default: false,
    type: Boolean,
  },
  reviews: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Beer', BeerSchema);