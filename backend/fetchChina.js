







const fetchChina = async()=>{
    // const mongoose = require('mongoose')
  //const puppeteer = require('puppeteer');
  const puppeteer = require('puppeteer-extra')
  const StealthPlugin = require('puppeteer-extra-plugin-stealth')
  puppeteer.use(StealthPlugin())
 // const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')()
 // puppeteer.use(blockResourcesPlugin)
  const Display = require('../models/usRaw.js')

  const browser = await puppeteer.launch({headless:false,
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
      page.setDefaultNavigationTimeout(60000)
      // blockResourcesPlugin.blockedTypes.add('image')
      // blockResourcesPlugin.blockedTypes.add('stylesheet')
        //blockResourcesPlugin.blockedTypes.add('other')
      //blockResourcesPlugin.blockedTypes.add('media')
      await page.goto('http://www.nhc.gov.cn/xcs/xxgzbd/gzbd_index.shtml');
     // await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html');
      //await page.setRequestInterception(true);
      //await page.goto('http://espn.com');
      await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      await page.waitForSelector('body > div:nth-child(3) > div.fl.jkxdzcwj > ul > li:nth-child(1) > a')
     
      console.log('selector loaded')

      const link1 = await page.evaluate(() => {  
          var link
          try {           
              link = $('body > div:nth-child(3) > div.fl.jkxdzcwj > ul > li:nth-child(1) > a').attr('href')
          } catch(err) {
             console.log('error')
          }
          console.log(link)
          return(link)
      })
      //blockResourcesPlugin.blockedTypes.delete('stylesheet')
      // blockResourcesPlugin.blockedTypes.delete('other') 
      // //blockResourcesPlugin.blockedTypes.delete('image')
      // blockResourcesPlugin.blockedTypes.delete('media') 
      const page2 = await browser.newPage();
      page2.setDefaultTimeout (60000)
      page2.setDefaultNavigationTimeout(60000)
      console.log('pregoto')
      await page2.goto(`http://www.nhc.gov.cn${link1}`,{waitUntil:'load'});
      console.log('scripttag')
      await page2.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      //await page2.waitForSelector('body > div.w1024.mb50 > div.list')
      console.log('waiting')
      await page2.waitForFunction("document.querySelector('#xw_box')!= 0",);
      console.log('selector2 loaded')
      const administeredCount = await page2.evaluate(() => {  
        var link
        try {           
            link = $('body > div.w1024.mb50 > div.list > div.con > p').text()
        } catch(err) {
           console.log('error')
        }
        console.log(`hi${link}`)
        return(Number(link.match(/(?!疫苗)(\d+\.?\d{0,2})(?=万)/g)[0])*10000)
    })
     
      const today = new Date()
      console.log(administeredCount)
      await browser.close();
      // await mongoose.connection.close()
      return(administeredCount)

      
      // console.log(`Today is: ${today.getMonth()+1}.${today.getDate()}`)
      // console.log(`Administered: ${administeredCount}`)
      // console.log(`Percent of Total Population Single: ${percentOfPopSingle}%`)
      // console.log(`Percent of Total Population Fully: ${percentOfPopFully}%`)
      
     
      
      
      console.log('innerloop end')
  }catch(e){
      //res.send('error2')
      console.log(e)
  }finally{
      // await mongoose.connection.close()
  }
  console.log('scrap done')
}
//fetchChina()


module.exports = fetchChina