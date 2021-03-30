
const { Schema, model } = require('mongoose')

const usSchema = new Schema({
  date: Date,
  vaccinated: Number
})

module.exports = model('Us', usSchema)