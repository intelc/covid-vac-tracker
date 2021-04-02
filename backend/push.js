const mongoose = require('mongoose')

const UsRaw = require('../models/usRaw.js')
const Display = require('../models/display.js')
//const cors = require('cors');
const path = require('path')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const pushData = async()=>{
    await UsRaw.deleteMany({})
      try{await UsRaw.create(
        { date:new Date('2021-04-01T19:00:00'),vaccinated:153000000,once:30.0,fully:17.0 },  
        { date:new Date('2021-03-31T19:00:00'),vaccinated:150273292,once:29.4,fully:16.4 },
        { date:new Date('2021-03-30T19:00:00'),vaccinated:147602345,once:0,fully:16.4 },
        { date:new Date('2021-03-29T19:00:00'),vaccinated:145812835,once:0,fully:16.4 },
        { date:new Date('2021-03-28T19:00:00'),vaccinated:143462691,once:0,fully:16.4 },
        { date:new Date('2021-03-27T19:00:00'),vaccinated:140180735,once:0,fully:16.4 },
        { date:new Date('2021-03-26T19:00:00'),vaccinated:136684688,once:0,fully:16.4 },
        { date:new Date('2021-03-25T19:00:00'),vaccinated:133305295,once:0,fully:16.4 },
        { date:new Date('2021-03-24T19:00:00'),vaccinated:130473853,once:0,fully:16.4 },
        { date:new Date('2021-03-23T19:00:00'),vaccinated:128217029,once:0,fully:16.4 },
        
        
        )}catch(e){console.log(e)}
        console.log('done')
        await mongoose.connection.close()
  }
  
  pushData()