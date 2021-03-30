
const { Schema, model } = require('mongoose')

const chinaSchema = new Schema({
  date: Date,
  vaccinated: Number
})

module.exports = model('China', chinaSchema)