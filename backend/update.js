/* eslint-disable no-loop-func */




const update = async()=>{
  // const mongoose = require('mongoose')
  const fetchGlobal = require('./fetchGlobal.js')
const UsRaw = require('../models/usRaw.js')
const Display = require('../models/display.js')

const fetchChina = require('./fetchChina.js')
const fetchEG = require('./fetchEG.js')
const fetchEU = require('./fetchEU.js')
const fetchIndia = require('./fetchIndia.js')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
  try{
      
      let today = new Date()
      
      
      //FIND TOTAL ADMINISTERED
        
      
      let date = 0
      let total = 0
      let singlePercent = 0
      let fullyPercent = 0
      // Must have updated data
      await UsRaw.find().sort({date:-1})
                .then(function (data) {
                  console.log(data)
                  date=data[0]['date']
                  //today=data[0]['date']
                  total=data[0]['vaccinated']
                  singlePercent=data[0]['once']
                  fullyPercent=data[0]['fully']
                })
      
      console.log(`Today is: ${date.getMonth()+1}.${date.getDate()}\n
                    Administered: ${total}\n
                    singlePercent: ${singlePercent}\n
                    fullyPercent: ${fullyPercent}\n
                    `)
      
      //FIND seven day avg, shots today          
      const hourZero = (date,moveBy)=>{
        var newDate
        if(moveBy===0){
          newDate= new Date(new Date(date).setHours(0))
        }else{
          //newDate = new Date(new Date().setDate(date.getDate()+moveBy))
          //newDate = new Date(new Date().setHours(date.getHours()-12))
          newDate =new Date(new Date(new Date().setDate(date.getDate()+moveBy)).setHours(0))
        }
        console.log(newDate)
        return newDate
        
      }
      const daysAgo = (date,moveBy)=>{
        var newDate
        if(moveBy===0){
          newDate= new Date(new Date(date).setHours(23))
        }else{
          newDate =new Date(new Date(new Date().setDate(date.getDate()+moveBy)).setHours(23))
          //newDate =new Date(new Date().setDate(date.getDate()+moveBy))
        }
        console.log(newDate)
        return newDate
      }
      

    const sevenDayAvgFunc = async ()=>{
        var zero;
        var six;
        var avg=0
        const dataOnDay= async (displacement)=>{
          var data1
          try{
             await UsRaw.find({date:{$gte:hourZero(date,displacement),$lt:daysAgo(date,displacement)}}).sort({date:-1})
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
      var one;
      const dataOnDay= async (displacement)=>{
        var data1
        try{
           await UsRaw.find().sort({date:-1})
              .limit(2).then(function (data) {
                //console.log(`this is ${data}end`)
            data1 = data[displacement]['vaccinated']
          })
        }catch(e){
          console.log(e)
        }
        return data1
      }
      zero = await dataOnDay(0)
      one = await dataOnDay(1)
      
      const avg = (zero-one)
      return avg
  }
  const shotsToday = await increase()
 
  console.log(`Today we see an increase of: ${shotsToday}`)
  if(shotsToday===0){
    console.log('returned')
    return
  }
  ///////OTHER COUNTRIES
  let chinaFlag =false
  let chinaLoop=0
  let chinaTotal
  while(chinaFlag===false && chinaLoop<10){
    chinaTotal= await fetchChina()
    if ( chinaTotal==='undefined' || !(chinaTotal>10)){
      chinaLoop++
      console.log(typeof(ChinaTotal))
      console.log('failed')
    }else{
      chinaFlag=true
    }
  }
  console.log(`Today china: ${chinaTotal}`)
  let EUFlag=false
  let EULoop=0
  let euTotal, euPercent
  while(EUFlag===false && EULoop<3){
    ({euTotal,euPercent} = await fetchEU())
    if (euTotal===0 || euPercent===0){
      EULoop++
    }else{
      EUFlag=true
    }
  }
  console.log(`Today EU: ${euTotal},${euPercent}`)

  let EGFlag=false
  let EGLoop=0
  let englandTotal, englandPercent
  while(EGFlag===false && EGLoop<5){
    ({englandTotal,englandPercent} = await fetchEG())
    if (englandTotal===0 || englandPercent===0){
      EGLoop++
    }else{
      EGFlag=true
    }
  }
  console.log(`Today England: ${englandTotal}, ${englandPercent}`)

  let IndiaFlag=false
  let IndiaLoop=0
  let indiaTotal
  while(IndiaFlag===false && IndiaLoop<5){
    ({indiaTotal} = await fetchIndia())
    if (indiaTotal===0 ){
      IndiaLoop++
    }else{
      IndiaFlag=true
    }
  }
  console.log(`Today India: ${indiaTotal}`)


  var globalTotal
  globalTotal= await fetchGlobal()

  /////
  // mongoose.connect(MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  console.log(`Today's date:${today}`)
  try{await Display.create({date:today,total,singlePercent,fullyPercent,sevenDayAvg,shotsToday,chinaTotal,
  euTotal,euPercent,englandTotal,englandPercent,indiaTotal,globalTotal})
  }catch(e){console.log(e)}

     
   
      
     
      
    //  await mongoose.connection.close()
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
    // await mongoose.connection.close()
  }
  console.log('done')
}

//update()
module.exports = update
