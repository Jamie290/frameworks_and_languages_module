const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(bodyParser.json()) //installing body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })) //allows specific access to nested property of req.body
app.use(cors()) //https://expressjs.com/en/resources/middleware/cors.html
app.use(express.json()); // Enable json input from incoming requests. 

//app.use((req, res, next) => { //ensures we prevent cors errors
//res.header('Access-Control-Allow-Origin', '*'); // allows the response from one website to a request originating from another website, and identifies the permitted origin of the request
//res.header('Access-Control-Allow-Headers', '*'); //defines which type headers we want to accept along with request
//if(req.method == 'OPTIONS') {
 // res.header('Access-Control-Allow-Methods', 'POST','GET','OPTIONS','DELETE'); //Make sure my methods are all the HTTP requests i want to run with the API
  //return res.status(204).json({});
//}
//})
function logErrors (err, req, res, next) { //https://expressjs.com/en/guide/error-handling.html
  console.error(err.stack) //catch errors
  next(err)
}
app.use(logErrors)

// Routes 
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname})
  console.log("FreeCycle")
  
})//modify server.js to render index.html  

var ITEMS = {
  1: {
      "id": 1,
      "user_id": "user1234",
      "keywords": ["hammer", "nails", "tools"],
      "description": "A hammer and nails set",
      "lat": 1,
      "lon": 1,
      "date_from": "2021-11-22T08:22:39.067408",
      "date_to": "2021-11-22T08:22:39.067408"
  },
  2: {
    "id": 2,
    "user_id": "user1234",
    "keywords": ["hammer", "nails", "tools"],
    "description": "A hammer and nails set",
    "lat": 1,
    "lon": 1,
    "date_from": "2021-11-22T08:22:39.067408",
    "date_to": "2021-11-22T08:22:39.067408"
}
}


app.post('/item', (req,res) => {
 /* console.log(request.body)
  var idNew = Object.keys(ITEMS).length  + 1 // gets length of items and increments it
  if(ITEMS.hasOwnProperty(idNew)){ 
    idNew = idNew + 1
  }
  if(req.body.user_id && req.body.keywords && req.body.description 
    && req.body.lat && req.body.lon !== ""){ //checks if fields are not empty
    ITEMS[idNew] = {
      id: idNew,
      user_id: req.body.user_id,
      keywords: req.body.keywords,
      description: req.body.description,
      image: req.body.image,
      lat: req.body.lat,
      lon: req.body.lon,
      date_from: new Date().toISOString().slice(0, 10) ,
      date_to: new Date().toISOString().slice(0, 10) }

      res.status(201).json(ITEMS[idNew]) */
      if (!req.body.user_id || !req.body.description || !req.body.keywords || !req.body.lat || !req.body.lon) //check for required fields
      {
        return res.status(405).json({message: 'there is missing fields'})
      }
      else{
      ID=  Math.max( ...Object.keys(ITEMS)) +1; //find the max id 
      if(ID == "-Infinity"){
        ID= 0
      }
      req.body.id=ID;
      req.body.date_from= new Date().toISOString().slice(0, 10) // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
      ITEMS[ID]=req.body; 
      res.status(201).json(ITEMS[ID])
      console.log(ITEMS[ID])
    }
  })
        




app.get('/', (req, res) => {
  return res.status(200).json('<html><body>Welcome</body></html>')
}) 



app.get('/items', (req, res) => {
    var New= []
    for (let [retrieve, objectValues] of Object.entries(ITEMS)) { // Retrieve the items
        New.push(objectValues); //push items into variable
    }
    if(Object.keys(New).length <= 0){ //if no items were retrieved
    res.status(204).send('Error: 204 - No Items found.');
    }
    else{
    res.status(200).json(New)
    }
})

app.get('/item/:id', (req,res) => { 
  if(ITEMS[req.params.id] === undefined){ // If ID does not exist, returns "Item not found"
    res.status(404).json("Item not found")
}
else{ // If Item with matching ID exists, returns the Item
    res.status(200).json(ITEMS[req.params.id])
}
})

app.delete('/item/:id', (req,res) => { 
  var ITEMid = parseInt(req.params.id) 
  if(ITEMS.hasOwnProperty(ITEMid)){ //
    delete(ITEMS[ITEMid]) //
    res.status(204).send("Ok")
  }
  else{
    res.status(404).send("Item not found")
  }  
  })

app.use(cors({
  origin: "http://localhost:8000/",
  methods: ['POST','GET','OPTIONS','DELETE'],
}));

app.use('*', cors())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})

//References
//https://www.youtube.com/watch?v=zoSJ3bNGPp0 "(Handling CORS errors and body parsing)"
//https://stackoverflow.com/questions/52775844/log-request-method-on-routing 