const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const path = require('path')
const mailClient=require('node-mail-client')
const UsRouter = require('./routes/api.js')
const cron = require('node-cron')
const puppeteer = require('puppeteer');
const UsRaw = require('./models/usRaw.js')
const scrap = require('./backend/scrap.js')
const update = require('./backend/update.js')


const server = express()
const MONGO_URI = process.env.MONGODB_URI 


let mail=new mailClient({
  user:`chen.yiheng99@gmail.com`, // your address
  pass:`fchdvuvqpdtvtpyd`, // your password
  imap:['imap.gmail.com',993], // [host,port,tls]
  smtp:['smtp.gmail.com',587], // [host,port,secure]
  name:'Jack from IT' // your name when send
})
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const task = async()=>{
  await scrap()
  await update()
}
console.log('pre task')
task()

cron.schedule(' 0,30 12-22/2 * * *',  async () => {
  mail.check=1 
   mail.send({ to:'yihechen@seas.upenn.edu', subject:'COVID-Vac-Tracker scrap started', text:'yup',html:"<b>Hello world?</b>"}).then(info=>{})
  .catch(console.error)
  console.log('email sent')
  await scrap()

  ////mail//////
  mail.check=1 
   mail.send({ to:'yihechen@seas.upenn.edu', subject:'COVID-Vac-Tracker CDC fetched', text:'yup',html:"<b>Hello world?</b>"}).then(info=>{})
  .catch(console.error)
  console.log('email sent')
},{
  scheduled: true,
  timezone: "America/New_York"
});

cron.schedule(' 0,30 13-23/2 * * *',  async () => {
  //15,19
  
  await update()
  
},{
  scheduled: true,
  timezone: "America/New_York"
});

server.use(express.json())
server.use(express.urlencoded({ extended: false }));

server.use('/api',UsRouter);

server.use(express.static(path.join(__dirname, '/build')))
server.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build'))
})
server.use('/cn',express.static(path.join(__dirname, '/build')))
server.use('/cn', (req, res) => {
  res.sendFile(path.join(__dirname, '/build'))
})






const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));