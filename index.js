const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')


//middlewares
app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api', (req, res)=>{
    console.log('gottem');
    console.log(req.body)
    res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})