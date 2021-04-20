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
        { date:new Date('2021-04-12T19:00:00'),vaccinated:189692045,once:0,fully:0 },  
        { date:new Date('2021-04-13T19:00:00'),vaccinated:192282781,once:0,fully:0 },
        { date:new Date('2021-04-14T19:00:00'),vaccinated:194791836	,once:0,fully:0 },
        { date:new Date('2021-04-15T19:00:00'),vaccinated:198317040,once:0,fully:0 },
        { date:new Date('2021-04-16T19:00:00'),vaccinated:202282923,once:0,fully:0 },
        { date:new Date('2021-04-17T19:00:00'),vaccinated:205871913,once:0,fully:0 },
        { date:new Date('2021-04-18T19:00:00'),vaccinated:209406814,once:0,fully:0 },
        { date:new Date('2021-04-19T19:00:00'),vaccinated:211581309,once:39.9,fully:25.7 }
       
        
        
        )}catch(e){console.log(e)}
        console.log('done')
        await mongoose.connection.close()
  }
  
  pushData()