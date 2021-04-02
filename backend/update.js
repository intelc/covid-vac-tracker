/* eslint-disable no-loop-func */

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
const fetchData = async()=>{
  
  try{
      
      const today = new Date()
      const prior =new Date('2021-03-30T00:00:00')
      const posterior = new Date('2021-03-30T23:59:59')
      
      //FIND TOTAL ADMINISTERED
        
      
      var date = 0
      var total = 0
      var singlePercent = 0
      var fullyPercent = 0
      
      await UsRaw.find({date:{$gte:new Date(new Date().setHours(0)),$lt:today}})
                .limit(1).then(function (data) {
                  date=data[0]['date']
                  total=data[0]['vaccinated']
                  singlePercent=data[0]['once']
                  fullyPercent=data[0]['fully']
                })
      
      console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}\n
                    Administered: ${total}\n
                    singlePercent: ${singlePercent}\n
                    fullyPercent: ${fullyPercent}\n
                    `)
      
      //FIND seven day avg, shots today          
      const hourZero = (moveBy)=>{
        var newDate
        if(moveBy===0){
          newDate= new Date(new Date().setHours(0))
        }else{
          newDate = new Date(new Date(new Date().setDate(today.getDate()+moveBy)).setHours(0))
          
        }
        //console.log(newDate)
        return newDate
        
      }
      const daysAgo = (moveBy)=>{
        var newDate
        if(moveBy===0){
          newDate= new Date(new Date().setHours(23))
        }else{
          newDate =new Date(new Date(new Date().setDate(today.getDate()+moveBy)).setHours(23))
        }
        //console.log(newDate)
        return newDate
      }
      

    const sevenDayAvgFunc = async ()=>{
        var zero;
        var six;
        var avg=0
        const dataOnDay= async (displacement)=>{
          var data1
          try{
             await UsRaw.find({date:{$gte:hourZero(displacement),$lt:daysAgo(displacement)}})
                .limit(1).then(function (data) {
                  //console.log(`this is ${data}end`)
              data1 = data[0]['vaccinated']
            })
          }catch(e){
            console.log(e)
          }
          return data1
        }
        
        zero =  await dataOnDay(0)
        six =  await dataOnDay(-6)
        console.log(`zero is ${ zero}, six is ${ six}`)
        avg =  (zero-six)/7
        return avg
    }
    const sevenDayAvg = await sevenDayAvgFunc()
    console.log(`7 day avg is: ${sevenDayAvg}`)

    const increase = async ()=>{
      var zero;
      var six;
      const dataOnDay= async (displacement)=>{
        var data1
        try{
           await UsRaw.find({date:{$gte:hourZero(displacement),$lt:daysAgo(displacement)}})
              .limit(1).then(function (data) {
                //console.log(`this is ${data}end`)
            data1 = data[0]['vaccinated']
          })
        }catch(e){
          console.log(e)
        }
        return data1
      }
      zero = await dataOnDay(0)
      six = await dataOnDay(-1)
      
      const avg = (zero-six)/7
      return avg
  }
  const shotsToday = await increase()
  console.log(`Today we see an increase of: ${shotsToday}`)
      
  try{await Display.create({date,total,singlePercent,fullyPercent,sevenDayAvg,shotsToday})
  }catch(e){console.log(e)}

     
   
      
     
      
      
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
    await mongoose.connection.close()
  }
  console.log('done')
}

fetchData()
