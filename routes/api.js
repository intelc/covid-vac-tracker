const express = require('express')
const router = express.Router();
const Us = require('../models/us.js')
const { v4 } = require('uuid')
const puppeteer = require('puppeteer');



// Gets All Questions
//router.get('/', (req, res) => res.json(Question));

// Create Questionwqe
router.get('/US/latest', (req, res) => {
    console.log('I AM HERE')
    Us.find({}).sort({date: -1}).then(function (data) {
        res.send(data[0])
        console.log(data[0])
        });
        
})

router.get('/US', (req, res) => {
    Us.find({}).then(function (data) {
        res.send(data);
        });
       
})


router.post('/US/add', async(req, res) => {
    const { date,vaccinated } = req.body

    try {
        await Us.create({ date,vaccinated })
        res.send(`US vaccinated ${vaccinated} as of ${date} updated`)
      } catch {
        res.send('failure occurs when creating the entry for US')
      }
});

router.get('/US/update', async(req, res) => {
    const browser = await puppeteer.launch();
    try{
        const page = await browser.newPage();

        await page.goto('https://covid.cdc.gov/covid-data-tracker/#vaccinations');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
        
        const data = await page.evaluate(() => {  
            var data
            try {           
                data = $('#vaccinations-banner-wrapper > div:nth-child(1) > div > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > div').text()  
            } catch(err) {
               console.log('error')
            }
            
            return(data)
        })
        console.log(data)
        const vaccinated = parseFloat(data.replace(',','').replace(',', ''))
        console.log(vaccinated)
        const date = new Date()
       
     
        try{await Us.create({date,vaccinated})
    }catch(e){
        console.log(e)
    }
        
        res.send(`Us vaccinated ${vaccinated} as of ${date} updated`)
        
        await browser.close();
    }catch{
        res.send('error2')
    }finally{
        await browser.close();
    }
    

    })




module.exports = router;
