



const fetchIndia = async()=>{
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

  try{

      const page = await browser.newPage();
      page.setDefaultTimeout (60000)
     
      await page.goto('https://www.mohfw.gov.in/');
     
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      await page.waitForSelector('#site-dashboard > div > div > div:nth-child(2) > div.col-xs-8.site-stats-count.sitetotal > div > span.coviddata')
      
     
      console.log('selector loaded')

      const link = await page.evaluate(() => {  
          var englandTotal
          
          try {           

            englandTotal = $('#site-dashboard > div > div > div:nth-child(2) > div.col-xs-8.site-stats-count.sitetotal > div > span.coviddata').text().replaceAll(',','').replace(' ','')//[0]
          } catch(err) {
             console.log('error')
          }
          
          console.log(englandTotal)
          return({indiaTotal:(Number(englandTotal))})
          //return(englandTotal)
          //return(link1)
      })
     
     
      console.log(link)
      await browser.close();
      // await mongoose.connection.close()
      return(link)

      
      // console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}`)
      // console.log(`Administered: ${administeredCount}`)
      // console.log(`Percent of Total Population Single: ${percentOfPopSingle}%`)
      // console.log(`Percent of Total Population Fully: ${percentOfPopFully}%`)
      
     
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
      // mongoose.connection.close()
  }
  console.log('scrap done')
}
//fetchIndia()


module.exports = fetchIndia
