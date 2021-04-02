
const { Schema, model } = require('mongoose')

const displaySchema = new Schema({
  date:Date,
  total:Number,
  singlePercent:Number,
  fullyPercent:Number,
  sevenDayAvg:Number,
  shotsToday:Number
})

module.exports = model('Display', displaySchema)