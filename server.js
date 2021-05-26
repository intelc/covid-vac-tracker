const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv');
const path = require('path')

const UsRouter = require('./routes/api.js')
dotenv.config();


const server = express()
const MONGO_URI = process.env.MONGODB_URI 



mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


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