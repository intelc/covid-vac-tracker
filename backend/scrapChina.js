
const mongoose = require('mongoose')
const puppeteer = require('puppeteer');
const UsRaw = require('../models/usRaw.js')
//const cors = require('cors');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })


const fetchData = async()=>{
    const mongoose = require('mongoose')
const puppeteer = require('puppeteer');
const UsRaw = require('../models/usRaw.js')

  const browser = await puppeteer.launch({headless:false,
    ignoreHTTPSErrors: true,
    args: [
      
      '--enable-features=NetworkService'
    ]});

  const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try{
    
      const page = await browser.newPage();

      await page.goto('http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml');
      await page.setRequestInterception(true);
      //await page.goto('http://espn.com');
      //await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      await page.waitForSelector('body > div:nth-child(3) > div.fl.jkxdzcwj > ul > li:nth-child(1) > a')
      

      const administeredCount = await page.evaluate(() => {  
          var data
          try {           
              data = $('body > div:nth-child(3) > div.fl.jkxdzcwj > ul > li:nth-child(1) > a').text()
          } catch(err) {
             console.log('error')
          }
          console.log(data)
          return(data)
      })
     
      const today = new Date()
      //console.log(administeredCount)


      
      // console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}`)
      // console.log(`Administered: ${administeredCount}`)
      // console.log(`Percent of Total Population Single: ${percentOfPopSingle}%`)
      // console.log(`Percent of Total Population Fully: ${percentOfPopFully}%`)
      
     
      
      await browser.close();
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
      mongoose.connection.close()
  }
  console.log('scrap done')
}

fetchData()


//module.exports = fetchData