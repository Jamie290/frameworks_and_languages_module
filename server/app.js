const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(express.urlencoded({ extended: false }));// To parse URL encoded data
app.use(bodyParser.json()) //installing body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })) //allows specific access to nested property of req.body
app.use(cors({
  methods: ['GET','POST','DELETE','OPTIONS']
})) //https://expressjs.com/en/resources/middleware/cors.html
app.use(express.json()); // Enable json input from incoming requests. 


function logErrors (err, req, res, next) { //https://expressjs.com/en/guide/error-handling.html
  console.error(err.stack) //catch errors
  next(err)
}
app.use(logErrors)


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

app.get('/', (req, res) => {
  return res.status(200).send('<html><body>Welcome</body></html>')
}) 

app.post('/item', (req,res) => {
      console.log("POST data", req.body)
      if (!req.body.user_id ||  !req.body.lat  || !req.body.lon || !req.body.description || !req.body.keywords ) //check for required fields
      {
        return res.status(405).json({message: 'missing fields required'})
      }
      else{
      ID=  Math.max( ...Object.keys(ITEMS)) +1; // This will find the highest ID so we can go to the nxt number
      if(ID == "-Infinity"){
        ID= 0
      }
      req.body.id=ID; //request id
      req.body.date_from= new Date().toISOString().slice(0, 10) // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
      //slice changes contents of original array
      ITEMS[ID]=req.body; 
      res.status(201).json(ITEMS[ID])
      console.log(ITEMS[ID])
    }
  })



// Filtering username 
app.get('/items', (req,res)=> {
  if (req.query.user_id){
    res.status(200).json(Object.values(ITEMS).filter(obj => obj.user_id == req.query.user_id)) // using object.values as it is filtering through the values from ITEMS
    return;
  }
  res.status(200).json(Object.values(ITEMS))
})
  
app.get('/items', (req, res) => {
    res.send(ITEMS)
})


app.get('/item/:id', (req,res) => { 
  if(ITEMS[req.params.id] === undefined){ // If ID does not exist, returns "Item not found"
    res.status(404).json("Item not found")}
    
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
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
//https://github.com/calaldees/frameworks_and_languages_module
//https://vuejs.org/tutorial