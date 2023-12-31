const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
  'Pet',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    weight: {
      type: Number,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    subspecies: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true,
    },
    obs: {
      type: String,
    },
    available: {
      type: Boolean,
    },
    user: Object,
    adopter: Object,
  }, { timestamps: true }),
)

module.exports = Pet
