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
    //await UsRaw.deleteMany({})
      try{await UsRaw.create(
        
        { date:new Date('2021-05-19T20:00:00'),vaccinated:277290173,once:43.6,fully:30.5 },
        { date:new Date('2021-05-20T20:00:00'),vaccinated:279397250,once:43.6,fully:30.5 },
        { date:new Date('2021-05-21T20:00:00'),vaccinated:281595351,once:43.6,fully:30.5 },
        { date:new Date('2021-05-22T20:00:00'),vaccinated:283941223,once:43.6,fully:30.5 },
        { date:new Date('2021-05-23T20:00:00'),vaccinated:285720586,once:43.6,fully:30.5 },
        { date:new Date('2021-05-24T20:00:00'),vaccinated:286890900,once:43.6,fully:30.5 },

       
        
        
        )}catch(e){console.log(e)}
        console.log('done')
        await mongoose.connection.close()
  }
  
  pushData()