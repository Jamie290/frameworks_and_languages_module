const express = require('express')
const app = express()
const port = 8000

app.use(express.json());

ITEMS = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/thing', (req, res) => {
  res.json({ user: 'jamie' })
}) 

app.get('/items/', (req, res) => {
  res.json(ITEMS)
}) 

app.post('/item/', (req, res) => {
  //console.log('POST POST POST!!!')
  //console.log(req.body)
  ITEMS.push(req.body)
  res.json({})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

