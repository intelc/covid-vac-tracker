
const { Schema, model } = require('mongoose')

const usRawSchema = new Schema({
  date: Date,
  vaccinated: Number,
  once: Number,
  fully: Number
})

module.exports = model('UsRaw', usRawSchema)