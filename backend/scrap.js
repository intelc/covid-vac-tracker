
const mongoose = require('mongoose')
const puppeteer = require('puppeteer');
const UsRaw = require('../models/usRaw.js')
//const cors = require('cors');


// const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })


const fetchData = async()=>{
    // const mongoose = require('mongoose')
const puppeteer = require('puppeteer');
const UsRaw = require('../models/usRaw.js')
  const browser = await puppeteer.launch();

//   const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
    const scrap = async ()=>{
        try{
            const page = await browser.newPage();

      await page.goto('https://covid.cdc.gov/covid-data-tracker/#vaccinations');
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      
      const administeredCount = await page.evaluate(() => {  
          var data
          try {           
              data = $('#vaccinations-banner-wrapper > div:nth-child(1) > div > div:nth-child(1) > div > div > div.row.w-100.pt-3.IEPadding > div:nth-child(2) > div').text().replaceAll(',', '') 
          } catch(err) {
             console.log('error')
          }
          
          return(data)
      })
      const percentOfPopSingle = await page.evaluate(() => {  
        var data
        try {           
            data = $('#vaccinations-banner-wrapper > div:nth-child(1) > div > div.column.pgdata-child.center.aligned.newWidth.vax-height > div > div > div:nth-child(3) > div:nth-child(2) > div').text().replace('%', '')
        } catch(err) {
           console.log('error')
        }
        
        return(data)
    })
    const percentOfPopFully = await page.evaluate(() => {  
        var data
        try {           
            data = $('#vaccinations-banner-wrapper > div:nth-child(1) > div > div.column.pgdata-child.center.aligned.newWidth.vax-height > div > div > div:nth-child(3) > div:nth-child(3) > div').text().replace('%', '')
        } catch(err) {
           console.log('error')
        }
        
        return(data)
    })
        return({total:administeredCount,singlePercent:percentOfPopSingle,fullyPercent:percentOfPopFully})
        }catch(e){
            console.log(e)
        }
    }
  try{
      
      const today = new Date()
    
      let USFlag=false
        let USLoop=0
        let total, singlePercent,fullyPercent
        while(USFlag===false && USLoop<5){
            ({total,singlePercent,fullyPercent} = await scrap())
            if (total=='null' || !total || total<0){
            USLoop++
            }else{
            USFlag=true
            }
        }
       
       
      console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}`)
      console.log(`Administered: ${total}`)
      console.log(`Percent of Total Population Single: ${singlePercent}%`)
      console.log(`Percent of Total Population Fully: ${fullyPercent}%`)


     


      try{await UsRaw.create(
        { date:today,vaccinated:total,once:singlePercent,fully:fullyPercent },  
        
        
        
        )}catch(e){console.log(e)}
      
     
      
      await browser.close();
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
    // await mongoose.connection.close()
  }
  console.log('scrap done')
}


module.exports = fetchData