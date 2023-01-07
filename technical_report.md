Technical Report
================

This technical reports contains justification and the description for the chosen framework features and language features that i decided to use to create my Freecycle project. I will be underlining why it is so beneficial to use frameworks to create applications while also critiquing my client and server.

Server Framework Features
-------------------------

### Middleware

Middleware can be used to perform tasks such as handling authentication, parsing request data,  and modifying the response. It has access to the request(req) and response(res) objects, and the also the next function that is using middleware in the application's request-response cycle. 
``` java
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ methods: ['GET','POST','DELETE','OPTIONS'] }));
app.use(express.json());
```
Here we are using 'app.use()' function to register middleware functions that will be executed before the route handler. The cors() and body-parser middleware are used to enable cross-origin resource sharing (CORS) and parse the body of the request. Middleware cuts out alot of repeated code and saves time.

```java
res.status(200).json(Object.values(ITEMS))
```
This line of code is from the route ```/items ``` we can see that it accepts item data in json format, this means that we use ```app.use(express.json())``` to parse JSON data in the request body and makes it available in the req.body property.


[Parsing the Body & Handling CORS](https://academind.com/tutorials/building-a-restful-api-with-nodejs)


### Routing

Routing refers to the process of how an application would respond to a client creating a HTTP request made to a specific endpoint.  - 1 mark
```java
app.get('/items', (req,res) => {
  // ...
});

```
This line of code defines a route that handles GET requests to the /items route. whenever a GET request is made to this route the callback function is executed, and has access to the req and res objects.

It makes it easier to add, remove, or modify routes as needed, without causing errors in the application. Routing helps to modularize the code and keep it organized, it allows you to separate the application into different functions that are only executed if it is requested by the client.

[Express routing guide](https://expressjs.com/en/guide/routing.html)


### (Path parameters)

Path parameters are used to pass data to the server in the URL path. To access the path parameters you use ``` req.params ```. This object would contain all the path parameters for this specific route. 

``` java
app.get('/item/:id', (req,res) => { 
  if(ITEMS[req.params.id] === undefined){
    res.status(404).json("Item not found")}
    
  else{
    res.status(200).json(ITEMS[req.params.id])
  }
})

```
In this route, the ```:id``` path parameter is used to specify that an ```id``` value should be included in the URL path. The value of the ```id``` parameter is then accessed using the ```req.params.id``` property.

[Express route paths guide](https://expressjs.com/en/guide/routing.html)



Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


Critique of Server/Client prototype
---------------------

### (name of Issue 1)

(A code snippet example demonstrating the feature - 1 mark)
(Explain why this pattern is problematic - 40ish words 1 mark)

### (name of Issue 2)

(A code snippet example demonstrating the feature - 1 mark)
(Explain why this pattern is problematic - 40ish words 1 mark)


Future Technology Suggestions
-----------------------------

### (name of technology/feature 1)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)


### (name of technology/feature 2)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)


### (name of technology/feature 3)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)
