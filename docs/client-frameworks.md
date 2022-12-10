Client Frameworks
=================

Objectives
1. Understand the requirements for the client component of the assessment
2. Understand how we can manipulate dynamic webpages with the javascript DOM
3. Understand how we can perform HTTP requests in javascript
4. Understand the basic features of client side frameworks
    * vue.js
    * hyperapp
    * react


Demo Client Example (15min)
-------------------

* cypress tests
    * `make run_example_server_client`
    * `make test_example_client`
    * `make test_client`
    * Safety net (example_server)
        * You don't have to complete a working server before starting the client
        * `run_your_client_with_example_server`
        * `test_your_client_with_example_server`
    * Running on GitHub Actions
* GitHub FETCH UPSTREAM!!!!



Types of Web Applications (10min)
-------------------------

(A simplified and not entirely accurate overview)

* Server Rendered 
    * (majority of sites before 2014)
    * Older model - invented when browsers were less capable and had less features
    * Loads/Requests entire new page every link/click/action
    * Server template rendering
    * Example
        * [Django](https://www.djangoproject.com/) python
        * [Rails](https://rubyonrails.org/) ruby
* Single Page Webapp 
    * (majority of webapps after 2014)
    * Client Application supported with Server API
    * Loads js app once on first visit - uses server api on some click/action
    * Client/Browser template rendering (shadow-dom)
    * Can support realtime bi-direction communication with web-sockets
    * Example
        * [React] javascript
        * [angular] javascript
        * [vue] javascript
* Static Site Generation 
    * (grew significantly in popularity form 2014)
    * Generate entire (static) site (efficiently) on data change
    * Example
        * [jekyll](https://jekyllrb.com/) ruby
        * [hyde](https://hyde.github.io/) python
        * [hugo](https://gohugo.io/) golang


Browser: Document Object Model (DOM) (30min)
--------------------------------------------

```javascript
// Open a blank browser tab and bring up devtools (F12)
// Type the following a line at a time

text = document.createElement("p")
text.textContent = "Hello World"
document.body.appendChild(text)
text.textContent = "Hello World 2"
text.style = "color: red;"
// Notice how updating the `text` object updates the page

// Inspect the DOM in devtools
document.body.children
document.body.children[0]

// Set data attributes and query them
text.dataset['test'] = 3
text2 = document.querySelector(`[data-test='3']`)
text2.remove()
document.body.appendChild(text)  // you still have a variable `text` and can re-add it

// TASK:
// 1.) using the techniques above create the following html structure with javascript code
/*
<ul>
    <li data-id="a">Bread</li>
    <li data-id="b">Milk</li>
    <li data-id="c">Eggs</li>
</ul>
*/
// 2.) use querySelector to find id="b" and remove it
```
Further Reading
* MDN [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

Questions
* How many lines of code do you need to add each `li`. 
    * Do you think this could be reduced?
    * Hint: client frameworks will have a way of reducing this
* Understand
    * DOM functions `createElement`, `appendChild`, `textContent`, `data`, `querySelector`
    * Creating DOM elements in plain javascript is cumbersome and hard to follow
    * `data` attributes and how they can be selected/found with query (IMPORTANT CONCEPT)


<details>

```javascript
const $ul = document.createElement("ul")
document.body.appendChild($ul)

let $li = undefined

$li = document.createElement("li")
$ul.appendChild($li)
$li.textContent = "Bread"
$li.dataset.id = "a"

$li = document.createElement("li")
$ul.appendChild($li)
$li.textContent = "Milk"
$li.dataset.id = "b"

$li = document.createElement("li")
$ul.appendChild($li)
$li.textContent = "Eggs"
$li.dataset.id = "c"

document.querySelector(`[data-id='b']`).remove()
```
</details>


Client Frameworks (5min)
-----------------

Why?

* Separate out:
    * State
        * (You have all of your variables/state in one object - not loose variables in js code)
    * Logic/Actions
        * (You do not change the state - the framework calls your functions to manipulate the state when needed)
    * Template/Visuals/Look
        * (You do not manipulate/manage the DOM, the framework does)
* Every time we change our application’s _state_, with our _actions_ (functions), we need to update the _template_ (UI/DOM) to match.
* Considering
    * Async/multithreading (things happen at different times and take indeterminate time)


Client/Browser communication with ServerAPI (15min)
-------------------------------------------

Interacting with our API from client browser javascript

```javascript
// Open a blank browser tab and bring up devtools (F12)
// Copy and paste the code below
//   These are javascript equivalent of `curl` statesmen's from previous session
// Start example_server api
// Set `urlAPI` to your server address. It MUST not end with a `/`
// TASK: using the devtools console
//   - add 3 items
//   - get the item list (explore in devtools)
//   - delete the middle item

urlAPI = 'http://localhost:8000'
testItem = {
    user_id: "bob",
    lat: 1,
    lon: 1,
    image: "http://placekitten.com/100/100",
    keywords: "a, b, c",
    description: "a test item that is great",
}

let items = []

function getItems() {
    fetch(`${urlAPI}/items`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {
            console.log("getItems", json)
            items = json  // save the json we got back into the variable `items`
        })
    .catch(err => console.error(err))
}

function createItem(data) {
    fetch(`${urlAPI}/item`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(json => console.log('createItems()', json))
    .catch(err => console.error(err));
}

function deleteItem(item_id) {
    fetch(`${urlAPI}/item/${item_id}`, {
        method: 'DELETE',
    })
        .then(json => console.log('deleteItem()', json))
    .catch(err => console.error(err));
}
```


Helpers for Assignment 2: Client (notes)
--------------------------------

### Helper HTML
```html
<h2>Create</h2>
<form>
    <input name="user_id" placeholder="user_id">
    <input name="lat" placeholder="lat">
    <input name="lon" placeholder="lon">
    <input name="image" placeholder="image">
    <input name="keywords" placeholder="keywords">
    <textarea name="description" placeholder="description"></textarea>
    <button data-action="create_item">Create Item</button>
</form>
<!-- Hints
    1.) Prevent default onSubmit behaviour
    2.) Bind all inputs to data model
    3.) Bind POST action to button
-->

<h2>Items</h2>
<ul>
    <li><!-- Somehow templated for each item -->
        <img src="item.image">
        <span data-field="id">??? item.id ???</span>
        <span data-field="lat">??? item.lat ???</span>
        ...
        <button data-action="delete" someKindOfOnClickAction="deleteItem(item.id)">Delete</button>
    </li>
</ul>
```

### Helper QueryString
```javascript
    // http://HOST:PORT/ADDRESS/OF/PAGE.HTML?query_param1=a&query_param2=b&api=http://localhost:8000
    // Get api url (default to `CURRENT_HOST/api/v1`) (and remove trailing slash if present)
    const urlParams = new URLSearchParams(window.location.search);
    const urlAPI = (urlParams.get('api') || '/api/v1').replace(/\/$/, '');
```


HTML Boilerplate (5min)
----------------

Anatomy of basic html page (for upcoming tutorials)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <link id="favicon" rel="shortcut icon" type="image/png" href="data:image/png;base64,....==" />
    <title>Boilerplate</title>
    <style>

    /* styles here */

    </style>
    <script src=""></script>
</head>
<body>
    <h1>HTML Boilerplate</h1>

    <!-- html here -->

<script type="module">

    // javascript here

</script>
</body>
</html>
```


Vue.js (45min)
------

* [vuejs.org](https://vuejs.org/)
    * See _Why Vue.JS_ video (3min)
    * [vuejs.org/guide/quick-start.html#using-vue-from-cdn](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)
    * [vuejs.org/tutorial](https://vuejs.org/tutorial/)
    * [vuejs.org/examples](https://vuejs.org/examples/)
* Example
    * [frameworks_and_languages_module/examples/client/vue_test](https://github.com/calaldees/frameworks_and_languages_module/tree/main/examples/client/vue_test)
    * You could choose to use the `npm init vue` method. See react example for tips on containerising

### Concepts
* State, View and Actions are separate
* Template/View (can be) made in html and mounted/attached to code (`v-if`, `v-for`)
    * Vue components (advanced concept) can be separate/modular

### Further Reading
* [VueMastery - Intro to Vue 3](https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/) 
    * 20min video (1 hour to do?) video course for complete shopping basket with repo example

### Hint for assignment
```html
<!-- https://vuejs.org/guide/essentials/event-handling.html#event-modifiers -->
<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>
```


HyperApp Tutorial (45min)
-----------------

* [Hyperapp](https://github.com/jorgebucaran/hyperapp)
    * Tiny 1k framework
* Try _Todo example_ in CodePen
* [Tutorial](https://github.com/jorgebucaran/hyperapp/blob/main/docs/tutorial.md)
* Example
    * [frameworks_and_languages_module/examples/client/hyperapp](https://github.com/calaldees/frameworks_and_languages_module/tree/main/examples/client/hyperapp)

### Concepts
* html elements are generated with the `h()` function
    * Templates/view built with functions
* State, View and Actions are separate
* Altering the state requires an Action function



React (1hour)
-----

Facebook
200kb

* Beta [beta.reactjs.org/learn](https://beta.reactjs.org/learn)
    * (Beta; Looks like a better tutorial, but incomplete, so I have some more bits below)
* Setup
    * `npx create-react-app my-app` && `cd my-app` && `npm start`
    * `rm src/*`
    * `index.js`
        * ```javascript 
            import React from 'react';
            import ReactDOM from 'react-dom/client';

            import RootComponent from './myapp';

            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<RootComponent />);
            ```
    * `myapp.js` -> copy `MyButton` and `MyApp` example from [beta.reactjs.org/learn](https://beta.reactjs.org/learn)
* Old [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
    * How to
        1. Copy `index.js` from tutorial into `tictactoe.js`. Replacing the `cont root ...; root.render` -> `export default Game`
        2. `import RootComponent from './tictactoe';`
    * Build O's and X's
    * Follow tutorial and stop at _Adding Time Travel_ (The history is very cool though)

<details>
<summary>old instructions</summary>

* Setup
    * `.env`
        * ```
            FAST_REFRESH=false
            ```
    * `src/index.tsx` -> `src/index.backup.tsx`
    * `src/index.tsx`
        * ```
            import './index2'
            ```
    * From [React Tutorial: Setup Option 2: Local Development Environment](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)
        * `index2.js` copy from source (edit line with `index.css` -> `index2.css`)
        * `index2.css` copy from source
</details>

### Concepts
* Compiler transforms _inline html_ into javascript code to dynamically create elements
    * `jsx` files
    * Q: What problem is `jsx` trying to solve
        * [React tutorial; what is react](https://reactjs.org/tutorial/tutorial.html#what-is-react) -> see babel
* State separate from components
* Lifting state up
    * Components do not communicate with each other (except though shared functions/actions)
* Immutability
* Function components (shorthand)

### Further Reading
* [5 Steps to THINK in React](https://www.codestackr.com/blog/5-steps-to-think-in-react/)


Client Further Reading
----------------------

* [Introduction to client-side frameworks](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Introduction)
* [Sizes of JS frameworks, just minified + minified and gzipped, (React, Angular 2, Vue, Ember)](https://gist.github.com/Restuta/cda69e50a853aa64912d)
* MonoCubed [List of 10 Best Front end Frameworks](https://www.monocubed.com/best-front-end-frameworks/)
    * [Ember.js](https://emberjs.com/)
        * build, testing, data layer - the whole set!
    * [Angular.io](https://angular.io/) Google
    * [ractive.js](https://www.ractivejs.org)
    * [knockoutjs](https://knockoutjs.com/) - data binding framework, for any framework (how?)
    * [MeteorJS](https://www.meteor.com/) - a full stack server/client wrapper for frameworks to deploy to any device? a framework frameworks?
* Other Frameworks in other langauges
    * [fritz2](https://www.fritz2.dev/) Kotlin
    * [WebApps with PureScript & RactiveJS](https://blog.brakmic.com/webapps-with-purescript-and-ractivejs/)


Other Client frameworks
-----------------------

These looks cool. I've not investigated them.

* [solid.js](https://www.solidjs.com/)
    * > Solid follows the same philosophy as React with unidirectional data flow, read/write segregation, and immutable interfaces. It however has a completely different implementation that forgoes using a Virtual DOM.
    * Fragments, Portals, Context, Suspense, Error Boundaries, Lazy Components, Async & Concurrent Rendering, Implicit Delegation, SSR & Hydration, Directives
    * See "Intro to Solid is 100 Seconds" video on main page
* [Elm](https://elm-lang.org/)
    * Elm is a functional language that compiles to JavaScript. It helps you make websites and web apps. It has a strong emphasis on simplicity and quality tooling.
* [Fresh](https://fresh.deno.dev/)

Unsorted
========
Linked in [other-frameworks.md](./other-frameworks.md)
* [How to OVER Engineer a Website // What is a Tech Stack?](https://www.youtube.com/watch?v=Sxxw3qtb3_g) YouTube 11min FireShip
    * Talks though all the tech for client, server, ci, containers and then suggests a cutdown concept
    * [stackshare.io/stacks](https://stackshare.io/stacks) - Popular Tech Stacks: The open source tools and SaaS behind popular tech companies