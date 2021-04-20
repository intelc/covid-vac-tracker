








const fetchEG = async()=>{
    // const mongoose = require('mongoose')
  //const puppeteer = require('puppeteer');
  const puppeteer = require('puppeteer-extra')
  const StealthPlugin = require('puppeteer-extra-plugin-stealth')
  puppeteer.use(StealthPlugin())
  //const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')()
  //puppeteer.use(blockResourcesPlugin)
  const Display = require('../models/usRaw.js')

  const browser = await puppeteer.launch({headless:true,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: ['--window-size=1400,900',
    '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
    ]
    });

  // const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  // mongoose.connect(MONGO_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })

  try{

      const page = await browser.newPage();
      page.setDefaultTimeout (60000)
      // blockResourcesPlugin.blockedTypes.add('image')
      // blockResourcesPlugin.blockedTypes.add('stylesheet')
      // blockResourcesPlugin.blockedTypes.add('other')
      // blockResourcesPlugin.blockedTypes.add('media')
      await page.goto('https://coronavirus.data.gov.uk/details/vaccinations');
     // await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html');
      //await page.setRequestInterception(true);
      //await page.goto('http://espn.com');
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      await page.waitForSelector('#value-item-people_vaccinated-first_dose_total-cumpeoplevaccinatedfirstdosebypublishdate-0_description')
      //await page.waitForNavigation()
     
      console.log('selector loaded')

      const link = await page.evaluate(() => {  
          var englandTotal
          var englandPercent
          try {           

            englandTotal = $('#value-item-people_vaccinated-first_dose_total-cumpeoplevaccinatedfirstdosebypublishdate-0_description').text().match(/(?!\s)(\d{5,})/g)//[0]
          } catch(err) {
             console.log('error')
          }
          try {           
            englandPercent = $('#value-item-people_vaccinated-second_dose_total-cumpeoplevaccinatedseconddosebypublishdate-1_description').text().match(/(?!\s)(\d{5,})/g)//[0]
        } catch(err) {
           console.log('error')
        }
          console.log(englandTotal,englandPercent)
          return({englandTotal:(Number(englandTotal)+Number(englandPercent)),englandPercent:((Number(englandTotal)/55980000*100))})
          //return(link1)
      })
     
     
      const today = new Date()
      console.log(link)
      await browser.close();
      // await mongoose.connection.close()
      return(link)

      
      // console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}`)
      // console.log(`Administered: ${administeredCount}`)
      // console.log(`Percent of Total Population Single: ${percentOfPopSingle}%`)
      // console.log(`Percent of Total Population Fully: ${percentOfPopFully}%`)
      
     
      
      
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
      // mongoose.connection.close()
  }
  console.log('scrap done')
}
//fetchEG()


module.exports = fetchEG
