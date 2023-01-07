Technical Report
================

This technical reports contains justification and the description for the chosen framework features and language features that i decided to use to create my Freecycle project. I will be underlining why it is so beneficial to use frameworks to create applications while also critiquing my client and server.

Server Framework Features
-------------------------

### Middleware

Middleware can be used to perform tasks such as handling authentication, parsing request data,  and modifying the response. It has access to the request(req) and response(res) objects, and also the next function that is using middleware in the application's request-response cycle. 
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

Routing refers to the process of how an application would respond to a client creating a HTTP request made to a specific endpoint. 
```java
app.get('/items', (req,res) => {
  // ...
});

```
This line of code defines a route that handles GET requests to the ```/items``` route. Whenever a GET request is made to this route the callback function is executed, and has access to the req and res objects.

It makes it easier to add, remove, or modify routes as needed, without causing errors in the application. Routing helps to modularize the code and keep it organized, it allows you to separate the application into different functions that are only executed if it is requested by the client.

[Express routing guide](https://expressjs.com/en/guide/routing.html)


### Path parameters

Path parameters are used to pass data to the server in the URL path. To access the path parameters you use ``` req.params ```. This object would contain all the path parameters for this specific route. 

They provide you the option to include dynamic values in the URL, which you can use to define particular resources or perform operations on them.

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

### Template literals
---
Template literals are string literals that allow embedded expressions, to construct a string that contains HTML. Its a feature that allows you to define strings using a special syntax that makes it easier to include variables and expressions in the string. 
``` java
app.get('/item/:id', (req,res) => {
  if(ITEMS[req.params.id] === undefined){
    res.status(404).json(`Item with ID ${req.params.id} not found`);
  }
  // ...
});

```
In this code, a route that handles GET requests to the ```/item/:id``` path is defined. The callback function uses a template literal as the argument for the ```res.status().json()``` function, which sends a JSON response to the client with the specified status code. The template literal contains a string with an embedded expression that is the value of the ```req.params.id``` property, which is the value of the ```:id``` route parameter.

Benefits: 
- They are more readable
- They allow you to easily include multi-line strings without having to use escape characters.
- They allow you to include expressions directly inside the string

[W3Schools javascript template literals](https://www.w3schools.com/js/js_string_templates.asp)


### Constants
----
Constants are variables that cannot be reassigned. They are declared using the const keyword, followed by the name of the constant and its value.

``` java
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');

``` 
In these lines of code, constants are created for the imported modules and the port number. 

Constants make the code easier to read and understand, as it clearly indicates that this variable would remain the same through out the whole application. It prevents accidental changes to the variable making it easier to maintain, also risks of bugs are much lower.

[MDN web docs Express introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

### ```for...in``` loop
----
The ```for...in``` loop is used to iterate over the properties of an object. It is frequently used to conduct an action on each property or to get the values of an object's properties.
``` java
app.delete('/items', (req, res) => {
  if (req.query.user_id){
    for (let id in ITEMS){
      if (ITEMS[id].user_id == req.query.user_id){
        delete ITEMS[id]
      }
    }
    res.status(200).json(`All items from user ${req.query.user_id} have been deleted`)
    return;
  }
  // ...
});
```
 In this code it iterates over the items in the ```ITEMS``` object. The loop checks if the ```user_id``` property of the current item matches the value of the ```user_id``` query parameter. If it does, the loop deletes the item from the ```ITEMS``` object. However it can iterate over inherited properties which we dont want to do.

 Benefits: 
 - Easy to use
 - Iterates over objects and also iterates over the properties of an object in the order that they were added to the object

[MDN web docs References for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)


Client Framework Features
-------------------------

### Binding
The process of connecting data in a component to the UI or connecting data in the component's state to the UI is known as data binding. When the data in the component changes, you may update the UI, and vice versa.
```java
<input v-model="item.user_id" class="form-control" name="user_id" placeholder="Enter User ID" /><br>
```
The ```v-model``` directive in the following ```<input>``` element binds the value of the ```input``` to the ```item.user_id``` property in your Vue.js app. Binding can be very difficult to debug if not working properly. This means that when the user types into the input field, the value of item.user_id in your Vue.js app will be updated to reflect the value that the user has entered.

Benefits:
- Makes it easier to keep the UI in sync with the data in the component.
- Allows you to build reusable components that can be easily customized with different data.

[GeekForGeeks V-Bind Directive in Vue.js](https://www.geeksforgeeks.org/v-bind-directive-in-vue-js/)


### Event-handling
The process of choosing what to do in response to a particular event that happens in a user interface is known as event handling. User activities like clicking a button or entering text into a form can start an event, as can system events like a timer running out or data being received over a network connection. You can use event handling to send data to the server or load data from the server when an event occurs.


``` java
<form @submit.prevent="create_item">

```
This line listens for a form submission event and tells Vue.js to call the create_item method when the event occurs. When the user clicks the submit button on the form, the create_item method will be called and the form submission event will be prevented from causing the page to refresh.

[Handling events with Vue.js](https://vuejsdevelopers.com/2020/01/06/handling-events-vue-js/)


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
