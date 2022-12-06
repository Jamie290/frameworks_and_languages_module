const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) //installing body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })) //allows specific access to nested property of req.body
app.use(cors())
app.use(express.json());

ITEMS = {
  1: {
      "id": 1,
      "user_id": "user1234",
      "keywords": ["hammer", "nails", "tools"],
      "description": "A hammer and nails set",
      "lat": 1,
      "lon": 1,
      "date_from": "2021-11-22T08:22:39.067408",
  }
}


app.post('/item', (req,res) => {
  var id = Object.keys(ITEMS).length  + 1
  var date = new Date().toJSON().slice(0,10)
  if(ITEMS.hasOwnProperty(id)){
    id = id + 1
  }
  if(req.body.user_id && req.body.keywords && req.body.description 
    && req.body.lat && req.body.lon !== ""){
    ITEMS[id] = {
      id: id,
      user_id: req.body.user_id,
      keywords: req.body.keywords,
      description: req.body.description,
      image: req.body.image,
      lat: req.body.lat,
      lon: req.body.lon,
      date_from: date ,
      date_to: date }

      res.status(201).json(ITEMS[id]) 
  }
      else {
        res.status(405).json('Missing field')
      }
    })




app.get('/', (req, res) => {
  return res.status(200).send('<html><body>Your HTML text</body></html>')
})



app.get('/items', (req, res) => {
  res.send(ITEMS)
}) 

app.post('/item', (req, res) => {
  console.log(req.body)
  ITEMS.push(req.body)
  res.status(201).json(req.body)
})

app.use(cors({
  origin: "http://localhost:8000/",
  methods: ['POST','GET','OPTIONS','DELETE'],
}));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

