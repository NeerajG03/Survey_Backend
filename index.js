const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./Models/user')

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 8000
const uri = "mongodb+srv://xdneeraj:<password>@clusterstore.16q3u8s.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(()=>{console.log('Connected to DB')}).catch((err)=>{console.log(err)})

//middlewares
app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req,res)=>{
  const user = new User(req.body)
  user.save().then(()=>{
    res.sendStatus(200);
  }).catch((err)=>{
    res.status(401).json({Message :  'Error Storing User In Database', err})
  })
})
app.post('/createform', (req,res)=>{})
app.get('/getforms', (req,res)=>{})

app.post('/api', (req, res)=>{
    console.log('gottem');
    console.log(req.body)
    res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})