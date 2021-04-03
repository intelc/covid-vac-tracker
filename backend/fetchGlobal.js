







const fetchGlobal = async()=>{
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
      await page.goto('https://www.pharmaceutical-technology.com/covid-19-vaccination-tracker/');
     // await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html');
      //await page.setRequestInterception(true);
      //await page.goto('http://espn.com');
      //await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      await page.waitForSelector('#page-container > div:nth-child(1) > section:nth-child(2) > div > div > div > div > div:nth-child(1) > article > p.c-post-single__standfirst.c-post-content__stats.u-mb-1')
     
      console.log('selector loaded')

      const link = await page.evaluate(() => {  
          var globalTotal
          
          try {           
            globalTotal = $('#page-container > div:nth-child(1) > section:nth-child(2) > div > div > div > div > div:nth-child(1) > article > p.c-post-single__standfirst.c-post-content__stats.u-mb-1').text().replaceAll(',', '')
          } catch(err) {
             console.log('error')
          }
        //   try {           
        //     euPercent = $('#widgetEgfRX > table:nth-child(3) > tbody > tr:nth-child(4) > td:nth-child(2)').text().match(/(\d+\.?\d{0,2})/g)[0]
        // } catch(err) {
        //    console.log('error')
        // }
          console.log(globalTotal)
          return(Number(globalTotal))
      })
      //blockResourcesPlugin.blockedTypes.delete('stylesheet')
      // blockResourcesPlugin.blockedTypes.delete('other') 
      // //blockResourcesPlugin.blockedTypes.delete('image')
      // blockResourcesPlugin.blockedTypes.delete('media') 
    //   const page2 = await browser.newPage();
    //   await page2.goto(`http://www.nhc.gov.cn${link1}`);
    //   await page2.waitForSelector('#xw_box > p')
    //   //await page2.waitForNavigation()
    //   console.log('selector2 loaded')
    //   const administeredCount = await page2.evaluate(() => {  
    //     var link
    //     try {           
    //         link = $('#xw_box > p').text()
    //     } catch(err) {
    //        console.log('error')
    //     }
    //     console.log(`hi${link}`)
    //     return(Number(link.match(/(?!疫苗)(\d+\.?\d{0,2})(?=万)/g)[0])*10000)
    // })
     
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
      
  }
  console.log('scrap done')
}
//fetchEU()


module.exports = fetchGlobal
