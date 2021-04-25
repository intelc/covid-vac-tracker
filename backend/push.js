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
        
        { date:new Date('2021-04-19T19:00:00'),vaccinated:211581309,once:39.9,fully:25.7 },
        { date:new Date('2021-04-20T19:00:00'),vaccinated:213388238,once:39.9,fully:25.7 },
        { date:new Date('2021-04-21T19:00:00'),vaccinated:215951909,once:39.9,fully:25.7 },
        { date:new Date('2021-04-22T19:00:00'),vaccinated:218947643,once:39.9,fully:25.7 },
        { date:new Date('2021-04-23T19:00:00'),vaccinated:222322230,once:39.9,fully:25.7 },
        { date:new Date('2021-04-24T19:00:00'),vaccinated:225640460,once:39.9,fully:25.7 },

       
        
        
        )}catch(e){console.log(e)}
        console.log('done')
        await mongoose.connection.close()
  }
  
  pushData()