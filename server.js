
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const path = require('path')

const ChinaRouter = require('./routes/api.js')


const server = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://node:1234@cluster0.nrfo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

server.use(express.json())
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use(express.static(path.join(__dirname, '../build')))
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

server.use('/api', ChinaRouter);
server.use('/', (req,res,next)=>res.send('Hello World'));
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
