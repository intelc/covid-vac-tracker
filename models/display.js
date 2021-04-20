
const { Schema, model } = require('mongoose')

const displaySchema = new Schema({
  date:Date,
  total:Number,
  singlePercent:Number,
  fullyPercent:Number,
  sevenDayAvg:Number,
  shotsToday:Number,
  chinaTotal:Number,
  euTotal:Number,
  euPercent:Number,
  englandTotal:Number,
  englandPercent:Number,
  indiaTotal:Number,
  globalTotal:Number
})

module.exports = model('Display', displaySchema)